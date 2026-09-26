import { useState, useEffect, useCallback } from "react";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({
    lower: true,
    upper: true,
    numbers: true,
    symbols: false,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const active = Object.keys(opts).filter((k) => opts[k]);
    if (active.length === 0) {
      setPassword("");
      return;
    }
    const pool = active.map((k) => SETS[k]).join("");
    let result = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += pool[array[i] % pool.length];
    }
    setPassword(result);
  }, [length, opts]);

  useEffect(() => {
    generate();
  }, [generate]);

  const toggle = (key) => setOpts((p) => ({ ...p, [key]: !p[key] }));

  const strength = () => {
    const active = Object.values(opts).filter(Boolean).length;
    const score = active * length;
    if (score > 60) return { label: "Strong", color: "bg-orange", width: "100%" };
    if (score > 35) return { label: "Good", color: "bg-yellow-500", width: "66%" };
    return { label: "Weak", color: "bg-red-500", width: "33%" };
  };
  const s = strength();

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-black02 border border-white02/10 rounded-xl p-4 sm:p-6 font-poppins">
      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1">
        Password Generator
      </h2>
      <p className="text-white02 text-sm mb-4">
        Create strong, random passwords on the fly.
      </p>

      <div className="flex items-center justify-between gap-3 bg-black01 border border-white02/20 rounded-lg p-3 mb-4">
        <span className="font-mono text-base sm:text-lg text-white01 break-all">
          {password || "Select an option below"}
        </span>
        <button
          onClick={handleCopy}
          className="shrink-0 text-orange text-sm hover:underline"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="h-1.5 w-full bg-white02/10 rounded-full mb-1 overflow-hidden">
        <div
          className={`h-full ${s.color} transition-all duration-300`}
          style={{ width: s.width }}
        />
      </div>
      <p className="text-xs text-white02 mb-4">{s.label}</p>

      <div className="mb-4">
        <div className="flex items-center justify-between text-white02 text-sm mb-1">
          <span>Length</span>
          <span className="text-white01">{length}</span>
        </div>
        <input
          type="range"
          min={6}
          max={32}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-orange"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-5">
        {[
          ["lower", "Lowercase (a-z)"],
          ["upper", "Uppercase (A-Z)"],
          ["numbers", "Numbers (0-9)"],
          ["symbols", "Symbols (!@#)"],
        ].map(([key, label]) => (
          <label
            key={key}
            className="flex items-center gap-2 text-sm text-white02 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={opts[key]}
              onChange={() => toggle(key)}
              className="accent-orange w-4 h-4"
            />
            {label}
          </label>
        ))}
      </div>

      <button onClick={generate} className="btn-primary w-full">
        Generate New Password
      </button>
    </div>
  );
}
