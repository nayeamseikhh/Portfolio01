import React from "react";
import { FiSearch, FiSend } from "react-icons/fi";

const AiSearch = () => {
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 border-t  p-4">
        <div className="relative">
          {/* <input
                  placeholder="Ask me anything..."
                  className="w-full rounded-xl border py-3 pl-4 pr-12 outline-none focus:border-violet-500"
                /> */}
          <div className="relative">
            <input
              type="text"
              placeholder="Ask AI for myself"
              className="
            w-full
            rounded-xl
            border
            border-zinc-500
            bg-transparent
            py-3
            pl-12
            pr-4
            text-white
            placeholder:text-gray-400
            outline-none
            transition-all
            duration-300
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
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
            text-gray-400
          "
            />
          </div>

          <button className="absolute right-2 top-1 rounded-lg bg-violet-500  text-white hover:bg-violet-600">
            <FiSend />
          </button>
        </div>
      </div>
      {/* Search Box */}
    </>
  );
};

export default AiSearch;
