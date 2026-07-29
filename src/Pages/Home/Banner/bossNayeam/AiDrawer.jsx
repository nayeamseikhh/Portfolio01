import { FiX, FiSend } from "react-icons/fi";

import React from "react";
import AiSearch from "./aiSearch";

const AiDrawer = ({ open, setOpen }) => {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Drawer */}

      <div
        className={`fixed right-0 top-0 z-50 h-screen w-[420px] bg-black02  shadow-2xl transition-all duration-500
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-semibold">🤖 Ask AI</h2>

          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Body */}

        <div className="space-y-5 p-6">
          <h3 className="text-3xl font-bold">
            What are you looking to create?
          </h3>

          <p className="text-gray-500">
            I'm your AI assistant. Ask anything about my portfolio.
          </p>

          <button className="w-full rounded-2xl bg-violet-500 p-5 text-left text-white transition hover:bg-violet-600">
            <h4 className="font-semibold">🚀 Build my website</h4>

            <p className="mt-1 text-sm text-violet-100">Most popular</p>
          </button>

          <div className="grid grid-cols-3 gap-4">
            <button className="rounded-xl border p-5 transition hover:border-violet-500">
              💼
              <p className="mt-3 text-sm">Projects</p>
            </button>

            <button className="rounded-xl border p-5 transition hover:border-violet-500">
              👨‍💻
              <p className="mt-3 text-sm">Skills</p>
            </button>

            <button className="rounded-xl border p-5 transition hover:border-violet-500">
              📄
              <p className="mt-3 text-sm">Resume</p>
            </button>
          </div>
        </div>

        {/* Footer */}

        <div className="absolute bottom-0 left-0 right-0  bg-black02 p-4">
          <AiSearch />
        </div>
      </div>
    </>
  );
};

export default AiDrawer;
