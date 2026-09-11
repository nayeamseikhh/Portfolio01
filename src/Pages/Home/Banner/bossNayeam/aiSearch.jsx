const API_URL = import.meta.env.VITE_API_URL;
import React, { useState } from "react";

import {
  FiSearch,
  FiSend,
  FiX,
  FiMaximize2,
  FiMinimize2,
} from "react-icons/fi";

const AiSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isExpanded, setIsExpanded] = useState(false); // এক্সপ্যান্ড স্ক্রিনের স্টেট ম্যানেজমেন্ট

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

      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const data = await response.json();
      console.log("Search response:", data);
      setAnswer(data.answer || "No answer received.");
    } catch (error) {
      console.error("Search error:", error);
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAnswer = () => {
    setAnswer("");
    setQuery(""); // 👈 This will clear the search input field text
    setIsExpanded(false); // উত্তর ক্লোজ করলে ফুল-স্ক্রিন মোডও বন্ধ হবে
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950 p-4 font-poppins">
      <div className="relative">
        {/* Search Input Container */}
        <div className="relative flex items-center">
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

          {/* Fixed Send Button */}
          <button
            type="button"
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            style={{ padding: "10px" }}
            className="
              absolute
              right-2
              top-1/2
              -translate-y-1/2
              rounded-lg
              text-xl
              transition-all
              duration-300
              border-0
              shadow-none
              hover:shadow-none
              disabled:cursor-not-allowed
              disabled:bg-orange-500/10
              disabled:text-orange-500/40
              bg-orange-500
              text-zinc-950
              hover:bg-orange-600
              active:scale-95
            "
          >
            <FiSend />
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="mt-2 text-sm text-zinc-400 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500"></span>
            Please wait, Nayeam's AI is searching...
          </p>
        )}

        {/* Normal AI Answer Box (Inline view) */}
        {answer && !loading && !isExpanded && (
          <div
            className="
              relative
              mt-3
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              p-4
              pr-20
              text-sm
              leading-6
              text-zinc-200
            "
          >
            {/* Control Buttons Group (Top Right) */}
            <div className="absolute right-3 top-3 flex items-center gap-2">
              {/* Expand Button */}
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                aria-label="Expand view"
                title="Expand"
                style={{
                  padding: 0,
                  border: "none",
                  background: "transparent",
                }}
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  text-zinc-400
                  shadow-none
                  hover:shadow-none
                  transition-all
                  duration-200
                  hover:bg-zinc-800
                  hover:text-white
                  active:scale-95
                "
              >
                <FiMaximize2 className="text-base" />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseAnswer}
                aria-label="Close answer"
                title="Close"
                style={{
                  padding: 0,
                  border: "none",
                  background: "transparent",
                }}
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  text-zinc-400
                  shadow-none
                  hover:shadow-none
                  transition-all
                  duration-200
                  hover:bg-zinc-800
                  hover:text-white
                  active:scale-95
                "
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* AI Answer Text */}
            <div className="whitespace-pre-wrap">{answer}</div>
          </div>
        )}

        {/* Premium Expanded Full Screen Modal View */}
        {answer && isExpanded && (
          <div className="fixed inset-0 z-50 flex flex-col bg-zinc-950/95 p-6 md:p-10 font-poppins backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                <h3 className="text-base font-medium text-zinc-100">
                  Nayeam's AI Assistant Response
                </h3>
              </div>

              {/* Modal Controls */}
              <div className="flex items-center gap-3">
                {/* Minimize Button */}
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  title="Minimize"
                  style={{
                    padding: 0,
                    border: "none",
                    background: "transparent",
                  }}
                  className="
                    flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 
                    shadow-none hover:shadow-none transition-all duration-200 hover:text-white hover:bg-zinc-800 active:scale-95
                  "
                >
                  <FiMinimize2 className="text-lg" />
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleCloseAnswer}
                  title="Close"
                  style={{
                    padding: 0,
                    border: "none",
                    background: "transparent",
                  }}
                  className="
                    flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-zinc-950
                    shadow-none hover:shadow-none transition-all duration-200 hover:bg-orange-600 active:scale-95
                  "
                >
                  <FiX className="text-xl" />
                </button>
              </div>
            </div>

            {/* Expanded Screen Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 md:p-6 text-base md:text-lg leading-8 text-zinc-200 whitespace-pre-wrap custom-scrollbar">
              {answer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiSearch;
