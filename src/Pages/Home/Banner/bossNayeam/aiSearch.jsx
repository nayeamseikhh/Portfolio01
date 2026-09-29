import React, { useState } from "react";
import {
  FiSearch,
  FiSend,
  FiX,
  FiMaximize2,
  FiMinimize2,
} from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL;

const AiSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // =========================================================
  // SEARCH AI
  // =========================================================
  const handleSearch = async () => {
    if (!query.trim() || loading) return;

    try {
      setLoading(true);
      setAnswer("");

      const response = await fetch(`${API_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query.trim(),
        }),
      });

      // =====================================================
      // RATE LIMIT
      // =====================================================
      if (response.status === 429) {
        setAnswer(
          "⚠️ Nayeam's AI is busy right now due to too many requests. Please wait a few seconds and try again!",
        );
        return;
      }

      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const data = await response.json();

      console.log("Search response:", data);

      // =====================================================
      // BACKEND ERROR
      // =====================================================
      if (data.error && String(data.error).includes("429")) {
        setAnswer(
          "⚠️ Server limit reached. Please wait a moment before searching again.",
        );
      } else {
        setAnswer(data.answer || "No answer received.");
      }
    } catch (error) {
      console.error("Search error:", error);

      setAnswer(
        "Something went wrong. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // CLOSE ANSWER
  // =========================================================
  const handleCloseAnswer = () => {
    setAnswer("");
    setQuery("");
    setIsExpanded(false);
  };

  // =========================================================
  // KEYBOARD
  // =========================================================
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950 p-4 font-poppins">
      <div className="relative w-full min-w-0">
        {/* ===================================================
            SEARCH INPUT
        ==================================================== */}
        <div className="relative flex min-w-0 items-center">
          <input
            type="text"
            placeholder="Ask AI for myself"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-zinc-900/50
              py-3
              pl-12
              pr-14
              text-white
              placeholder:text-zinc-500
              outline-none
              transition-all
              duration-300
              focus:border-orange-500
              focus:ring-2
              focus:ring-orange-500/20
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          />

          {/* Search Icon */}
          <FiSearch
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-xl
              text-zinc-500
            "
          />

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            aria-label="Ask AI"
            title="Ask AI"
            className="
              absolute
              right-2
              top-1/2
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-lg
              bg-orange-500
              text-xl
              text-zinc-950
              transition-all
              duration-300
              hover:bg-orange-600
              active:scale-95
              disabled:cursor-not-allowed
              disabled:bg-orange-500/10
              disabled:text-orange-500/40
            "
          >
            <FiSend />
          </button>
        </div>

        {/* ===================================================
            LOADING STATE
        ==================================================== */}
        {loading && (
          <p className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
            Please wait, Nayeam's AI is searching...
          </p>
        )}

        {/* ===================================================
            INLINE AI ANSWER
            This area has its OWN scrollbar.
        ==================================================== */}
        {answer && !loading && !isExpanded && (
          <div
            className="
              relative
              mt-3
              flex
              max-h-[300px]
              min-h-0
              flex-col
              overflow-hidden
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              shadow-lg
            "
          >
            {/* -----------------------------------------------
                ANSWER HEADER
            ------------------------------------------------ */}
            <div
              className="
                flex
                shrink-0
                items-center
                justify-between
                border-b
                border-zinc-800
                bg-zinc-900
                px-4
                py-3
              "
            >
              {/* Title */}
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-orange-500" />

                <span className="truncate text-xs font-medium text-zinc-400">
                  Nayeam's AI Response
                </span>
              </div>

              {/* Controls */}
              <div className="ml-3 flex shrink-0 items-center gap-1">
                {/* Expand */}
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  aria-label="Expand response"
                  title="Expand"
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    text-zinc-400
                    transition-all
                    duration-200
                    hover:bg-zinc-800
                    hover:text-white
                    active:scale-95
                  "
                >
                  <FiMaximize2 className="text-sm" />
                </button>

                {/* Close */}
                <button
                  type="button"
                  onClick={handleCloseAnswer}
                  aria-label="Close answer"
                  title="Close"
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    text-zinc-400
                    transition-all
                    duration-200
                    hover:bg-zinc-800
                    hover:text-white
                    active:scale-95
                  "
                >
                  <FiX className="text-base" />
                </button>
              </div>
            </div>

            {/* -----------------------------------------------
                SCROLLABLE ANSWER
            ------------------------------------------------ */}
            <div
              className="
                min-h-0
                flex-1
                overflow-y-auto
                overflow-x-hidden
                overscroll-contain
                px-4
                py-4
                text-sm
                leading-6
                text-zinc-200
                whitespace-pre-wrap

                [scrollbar-width:thin]
                [scrollbar-color:rgba(249,115,22,0.55)_transparent]

                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-orange-500/50
                hover:[&::-webkit-scrollbar-thumb]:bg-orange-500/70
              "
            >
              {answer}
            </div>
          </div>
        )}

        {/* ===================================================
            FULLSCREEN AI RESPONSE
        ==================================================== */}
        {answer && isExpanded && (
          <div
            className="
              fixed
              inset-0
              z-[99999]
              flex
              h-[100dvh]
              min-h-0
              flex-col
              overflow-hidden
              bg-zinc-950/95
              p-4
              font-poppins
              backdrop-blur-md
              animate-in
              fade-in
              zoom-in-95
              duration-200

              sm:p-6
              md:p-10
            "
          >
            {/* -----------------------------------------------
                FULLSCREEN HEADER
            ------------------------------------------------ */}
            <div
              className="
                mb-4
                flex
                shrink-0
                items-center
                justify-between
                border-b
                border-zinc-800
                pb-4
              "
            >
              {/* Title */}
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-orange-500" />

                <h3 className="truncate text-sm font-medium text-zinc-100 sm:text-base">
                  Nayeam's AI Assistant Response
                </h3>
              </div>

              {/* Controls */}
              <div className="ml-3 flex shrink-0 items-center gap-2">
                {/* Minimize */}
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  aria-label="Minimize response"
                  title="Minimize"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-zinc-800
                    bg-zinc-900
                    text-zinc-400
                    transition-all
                    duration-200
                    hover:bg-zinc-800
                    hover:text-white
                    active:scale-95
                  "
                >
                  <FiMinimize2 className="text-lg" />
                </button>

                {/* Close */}
                <button
                  type="button"
                  onClick={handleCloseAnswer}
                  aria-label="Close response"
                  title="Close"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-orange-500
                    text-zinc-950
                    transition-all
                    duration-200
                    hover:bg-orange-600
                    active:scale-95
                  "
                >
                  <FiX className="text-xl" />
                </button>
              </div>
            </div>

            {/* -----------------------------------------------
                FULLSCREEN SCROLLABLE RESPONSE
            ------------------------------------------------ */}
            <div
              className="
                min-h-0
                flex-1
                overflow-y-auto
                overflow-x-hidden
                overscroll-contain
                rounded-xl
                border
                border-zinc-800
                bg-zinc-900/40
                p-4
                text-base
                leading-7
                text-zinc-200
                whitespace-pre-wrap

                [scrollbar-width:thin]
                [scrollbar-color:rgba(249,115,22,0.6)_transparent]

                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-zinc-900
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-orange-500/50
                hover:[&::-webkit-scrollbar-thumb]:bg-orange-500/70

                sm:p-5
                md:p-6
                md:text-lg
                md:leading-8
              "
            >
              {answer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiSearch;
