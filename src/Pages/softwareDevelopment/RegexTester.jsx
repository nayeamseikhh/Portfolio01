import { useMemo, useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("[A-Z][a-z]+");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState(
    "Nayeam Seikh builds React and Node apps."
  );

  const { regex, error } = useMemo(() => {
    try {
      return { regex: new RegExp(pattern, flags), error: "" };
    } catch (e) {
      return { regex: null, error: e.message };
    }
  }, [pattern, flags]);

  const matches = useMemo(() => {
    if (!regex) return [];
    const found = [];
    if (flags.includes("g")) {
      let m;
      const re = new RegExp(pattern, flags);
      while ((m = re.exec(testStr)) !== null) {
        found.push(m);
        if (m.index === re.lastIndex) re.lastIndex++;
      }
    } else {
      const m = testStr.match(regex);
      if (m) found.push(m);
    }
    return found;
  }, [regex, testStr, flags, pattern]);

  const highlighted = useMemo(() => {
    if (!regex || matches.length === 0) return escapeHtml(testStr);
    let result = "";
    let lastIndex = 0;
    matches.forEach((m) => {
      result += escapeHtml(testStr.slice(lastIndex, m.index));
      result += `<mark class="bg-orange/30 text-orange rounded px-0.5">${escapeHtml(
        m[0]
      )}</mark>`;
      lastIndex = m.index + m[0].length;
    });
    result += escapeHtml(testStr.slice(lastIndex));
    return result;
  }, [regex, matches, testStr]);

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  const toggleFlag = (f) => {
    setFlags((prev) => (prev.includes(f) ? prev.replace(f, "") : prev + f));
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-black02 border border-white02/10 rounded-xl p-4 sm:p-6 font-poppins">
      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1">
        Regex Tester
      </h2>
      <p className="text-white02 text-sm mb-4">
        Test regular expressions with live match highlighting.
      </p>

      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <div className="flex-1 flex items-center bg-black01 border border-white02/20 rounded-lg overflow-hidden focus-within:border-orange">
          <span className="px-2 text-white02 text-sm select-none">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="flex-1 bg-transparent text-white01 p-2.5 text-sm font-mono focus:outline-none"
            placeholder="pattern"
          />
          <span className="px-2 text-white02 text-sm select-none">/{flags}</span>
        </div>
        <div className="flex gap-1">
          {["g", "i", "m", "s"].map((f) => (
            <button
              key={f}
              onClick={() => toggleFlag(f)}
              className={`w-9 h-9 rounded-lg text-xs font-mono border transition-colors ${
                flags.includes(f)
                  ? "bg-orange text-black01 border-orange"
                  : "text-white02 border-white02/20 hover:border-orange"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm mb-3">Invalid regex: {error}</p>
      )}

      <label className="text-white02 text-xs uppercase tracking-wide mb-1 block">
        Test string
      </label>
      <textarea
        value={testStr}
        onChange={(e) => setTestStr(e.target.value)}
        className="w-full h-28 resize-y bg-black01 text-white01 border border-white02/20 rounded-lg p-3 text-sm font-mono mb-4 focus:outline-none focus:border-orange"
      />

      <label className="text-white02 text-xs uppercase tracking-wide mb-1 block">
        Highlighted matches ({matches.length})
      </label>
      <div
        className="w-full min-h-[7rem] bg-black01 border border-white02/20 rounded-lg p-3 text-sm font-mono text-white01 whitespace-pre-wrap mb-4"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />

      {matches.length > 0 && matches.some((m) => m.length > 1) && (
        <div>
          <label className="text-white02 text-xs uppercase tracking-wide mb-1 block">
            Capture groups
          </label>
          <div className="space-y-1 text-sm font-mono">
            {matches.map((m, i) =>
              m.length > 1 ? (
                <div key={i} className="text-white02">
                  Match {i + 1}: {m.slice(1).map((g, gi) => (
                    <span key={gi} className="text-orange">
                      {" "}
                      ${gi + 1}="{g ?? ""}"
                    </span>
                  ))}
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}
