import { useMemo, useState } from "react";

/* ----------------------------- Helpers ------------------------------ */

// Splits any text into words. It understands spaces, snake_case,
// kebab-case and camelCase / PascalCase input.
// \p{M} keeps combining marks together, so Bengali words are not broken.
function splitWords(str) {
  return str
    .replace(/([\p{Ll}\p{N}])(\p{Lu})/gu, "$1 $2")
    .replace(/(\p{Lu}+)(\p{Lu}\p{Ll})/gu, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function capitalize(word) {
  const [first = "", ...rest] = word;
  return first.toUpperCase() + rest.join("").toLowerCase();
}

// Code-style cases are applied to every line separately,
// so you can convert a whole list of names at once.
const perLine = (fn) => (text) => text.split("\n").map(fn).join("\n");

const CASES = [
  {
    id: "upper",
    label: "UPPER CASE",
    convert: (t) => t.toUpperCase(),
  },
  {
    id: "lower",
    label: "lower case",
    convert: (t) => t.toLowerCase(),
  },
  {
    id: "title",
    label: "Title Case",
    convert: (t) =>
      t
        .toLowerCase()
        .replace(/[\p{L}\p{N}][\p{L}\p{M}\p{N}'’]*/gu, (w) => {
          const [first, ...rest] = w;
          return first.toUpperCase() + rest.join("");
        }),
  },
  {
    id: "sentence",
    label: "Sentence case",
    convert: (t) =>
      t
        .toLowerCase()
        .replace(/(^\s*|[.!?।]\s+)(\p{L})/gu, (_, start, letter) => {
          return start + letter.toUpperCase();
        }),
  },
  {
    id: "camel",
    label: "camelCase",
    convert: perLine((line) =>
      splitWords(line)
        .map((w, i) => (i === 0 ? w.toLowerCase() : capitalize(w)))
        .join("")
    ),
  },
  {
    id: "pascal",
    label: "PascalCase",
    convert: perLine((line) => splitWords(line).map(capitalize).join("")),
  },
  {
    id: "snake",
    label: "snake_case",
    convert: perLine((line) =>
      splitWords(line)
        .map((w) => w.toLowerCase())
        .join("_")
    ),
  },
  {
    id: "kebab",
    label: "kebab-case",
    convert: perLine((line) =>
      splitWords(line)
        .map((w) => w.toLowerCase())
        .join("-")
    ),
  },
];

/* ---------------------------- Component ----------------------------- */

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const results = useMemo(
    () => CASES.map((c) => ({ ...c, output: text ? c.convert(text) : "" })),
    [text]
  );

  const handleCopy = async (id, output) => {
    try {
      await navigator.clipboard.writeText(output);
      setCopiedId(id);
      setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1800);
    } catch {
      setCopiedId(null);
    }
  };

  const secondaryButton =
    "rounded-lg border border-white/10 px-3 py-1.5 text-sm font-medium text-gray-200 transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 text-white">
      <div className="rounded-2xl border border-white/10 bg-[#1A1A1D] p-4 sm:p-6 lg:p-8">
        <header className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Case Converter
          </h2>
          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Type or paste your text once and get every case style at the same
            time. For camelCase, snake_case and the other code styles, each
            line is converted separately.
          </p>
        </header>

        {/* Input */}
        <label htmlFor="case-converter-text" className="sr-only">
          Your text
        </label>
        <textarea
          id="case-converter-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          spellCheck={false}
          placeholder="Type or paste your text here…"
          className="min-h-[140px] w-full resize-y rounded-xl border border-white/10 bg-[#0E0E10] p-4 text-base leading-relaxed text-white placeholder:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        />

        <div className="mt-3">
          <button
            type="button"
            onClick={() => setText("")}
            disabled={!text}
            className={secondaryButton}
          >
            Clear text
          </button>
        </div>

        {/* Results */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {results.map(({ id, label, output }) => (
            <div
              key={id}
              className="flex flex-col rounded-xl border border-white/10 bg-[#0E0E10] p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-amber-400">
                  {label}
                </h3>
                <button
                  type="button"
                  onClick={() => handleCopy(id, output)}
                  disabled={!output}
                  aria-label={`Copy ${label} result`}
                  className={secondaryButton}
                >
                  {copiedId === id ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="max-h-48 min-h-[3rem] overflow-auto whitespace-pre-wrap break-words text-base leading-relaxed text-white">
                {output || (
                  <span className="text-gray-500">Result appears here</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
