import { useMemo, useState } from "react";

/* ----------------------------- Settings ----------------------------- */

const READING_SPEEDS = [
  { id: "slow", label: "Slow", wpm: 150 },
  { id: "average", label: "Average", wpm: 200 },
  { id: "fast", label: "Fast", wpm: 250 },
];

const SPEAKING_WPM = 130;

/* ----------------------------- Helpers ------------------------------ */

// Intl.Segmenter counts what a person sees as one character.
// This matters for Bengali, where a single conjunct (যুক্তাক্ষর) or a
// vowel sign is made of several Unicode code points.
const graphemeSegmenter =
  typeof Intl !== "undefined" && typeof Intl.Segmenter === "function"
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null;

function countCharacters(str) {
  if (!str) return 0;
  if (graphemeSegmenter) return [...graphemeSegmenter.segment(str)].length;
  return Array.from(str).length;
}

function analyzeText(text) {
  const trimmed = text.trim();

  return {
    words: trimmed ? trimmed.split(/\s+/).length : 0,
    characters: countCharacters(text),
    charactersNoSpaces: countCharacters(text.replace(/\s/g, "")),
    // "।" is the Bengali/Hindi full stop
    sentences: trimmed
      ? trimmed.split(/[.!?।]+/).filter((s) => s.trim()).length
      : 0,
    paragraphs: trimmed
      ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length
      : 0,
  };
}

function formatTime(totalSeconds, words) {
  if (!words) return "0 sec";

  const seconds = Math.max(1, Math.round(totalSeconds));
  if (seconds < 60) return `${seconds} sec`;

  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return rest ? `${minutes} min ${rest} sec` : `${minutes} min`;
}

const number = (n) => n.toLocaleString("en-US");

/* --------------------------- Small pieces --------------------------- */

function BigStat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0E0E10] p-4">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-1 text-3xl font-bold tabular-nums text-white">
        {number(value)}
      </p>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3">
      <dt className="text-sm text-gray-400">{label}</dt>
      <dd className="text-sm font-semibold tabular-nums text-white">{value}</dd>
    </div>
  );
}

/* ---------------------------- Component ----------------------------- */

export default function WordCounter() {
  const [text, setText] = useState("");
  const [speedId, setSpeedId] = useState("average");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => analyzeText(text), [text]);

  const wpm = READING_SPEEDS.find((s) => s.id === speedId).wpm;
  const readingTime = formatTime((stats.words / wpm) * 60, stats.words);
  const speakingTime = formatTime(
    (stats.words / SPEAKING_WPM) * 60,
    stats.words,
  );

  const handleCopy = async () => {
    const summary = [
      `Words: ${stats.words}`,
      `Characters: ${stats.characters}`,
      `Characters (no spaces): ${stats.charactersNoSpaces}`,
      `Sentences: ${stats.sentences}`,
      `Paragraphs: ${stats.paragraphs}`,
      `Reading time: ${readingTime}`,
      `Speaking time: ${speakingTime}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const secondaryButton =
    "rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-25 text-white">
      <div className="rounded-2xl border border-white/10 bg-[#1A1A1D] p-4 sm:p-6 lg:p-8">
        <header className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Word & Character Counter
          </h2>
          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Type or paste your text to see the word count, character count, and
            how long it takes to read.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Text input */}
          <div className="flex flex-col lg:col-span-3">
            <label htmlFor="word-counter-text" className="sr-only">
              Your text
            </label>
            <textarea
              id="word-counter-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here…"
              spellCheck={false}
              className="min-h-[280px] w-full flex-1 resize-y rounded-xl border border-white/10 bg-[#0E0E10] p-4 text-base leading-relaxed text-white placeholder:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setText("")}
                disabled={!text}
                className={secondaryButton}
              >
                Clear text
              </button>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!text}
                className={secondaryButton}
              >
                {copied ? "Copied" : "Copy results"}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4 lg:col-span-2">
            <div className="grid grid-cols-2 gap-3">
              <BigStat label="Words" value={stats.words} />
              <BigStat label="Characters" value={stats.characters} />
            </div>

            <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
              <p className="text-sm text-gray-300">Reading time</p>
              <p
                className="mt-1 text-3xl font-bold tabular-nums text-amber-400"
                aria-live="polite"
              >
                {readingTime}
              </p>

              <div
                role="radiogroup"
                aria-label="Reading speed"
                className="mt-4 grid grid-cols-3 gap-1 rounded-lg bg-[#0E0E10] p-1"
              >
                {READING_SPEEDS.map((s) => {
                  const active = s.id === speedId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSpeedId(s.id)}
                      className={`rounded-md px-2 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                        active
                          ? "bg-amber-500 text-black"
                          : "text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      {s.label}
                      <span className="block text-[11px] font-normal opacity-70">
                        {s.wpm} wpm
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <dl className="divide-y divide-white/10 rounded-xl border border-white/10 bg-[#0E0E10] px-4">
              <Row
                label="Characters (no spaces)"
                value={number(stats.charactersNoSpaces)}
              />
              <Row label="Sentences" value={number(stats.sentences)} />
              <Row label="Paragraphs" value={number(stats.paragraphs)} />
              <Row label="Speaking time" value={speakingTime} />
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
