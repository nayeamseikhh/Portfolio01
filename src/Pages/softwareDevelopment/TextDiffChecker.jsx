import React, { useMemo, useState } from "react";

function tokenize(text) {
  return text.match(/\s+|[^\s]+/g) || [];
}

function buildDiff(oldText, newText) {
  const oldTokens = tokenize(oldText);
  const newTokens = tokenize(newText);

  const rows = Array.from({ length: oldTokens.length + 1 }, () =>
    Array(newTokens.length + 1).fill(0),
  );

  for (let i = oldTokens.length - 1; i >= 0; i--) {
    for (let j = newTokens.length - 1; j >= 0; j--) {
      if (oldTokens[i] === newTokens[j]) {
        rows[i][j] = rows[i + 1][j + 1] + 1;
      } else {
        rows[i][j] = Math.max(rows[i + 1][j], rows[i][j + 1]);
      }
    }
  }

  const result = [];
  let i = 0;
  let j = 0;

  while (i < oldTokens.length && j < newTokens.length) {
    if (oldTokens[i] === newTokens[j]) {
      result.push({
        type: "same",
        text: oldTokens[i],
      });

      i++;
      j++;
    } else if (rows[i + 1][j] >= rows[i][j + 1]) {
      result.push({
        type: "removed",
        text: oldTokens[i],
      });

      i++;
    } else {
      result.push({
        type: "added",
        text: newTokens[j],
      });

      j++;
    }
  }

  while (i < oldTokens.length) {
    result.push({
      type: "removed",
      text: oldTokens[i],
    });

    i++;
  }

  while (j < newTokens.length) {
    result.push({
      type: "added",
      text: newTokens[j],
    });

    j++;
  }

  return result;
}

function countWords(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export default function TextDiffChecker() {
  const [originalText, setOriginalText] = useState("");
  const [modifiedText, setModifiedText] = useState("");
  const [hasCompared, setHasCompared] = useState(false);

  const diff = useMemo(() => {
    if (!hasCompared) return [];

    return buildDiff(originalText, modifiedText);
  }, [originalText, modifiedText, hasCompared]);

  const stats = useMemo(() => {
    const added = diff
      .filter((item) => item.type === "added")
      .reduce((total, item) => total + item.text.length, 0);

    const removed = diff
      .filter((item) => item.type === "removed")
      .reduce((total, item) => total + item.text.length, 0);

    return {
      originalCharacters: originalText.length,
      modifiedCharacters: modifiedText.length,
      originalWords: countWords(originalText),
      modifiedWords: countWords(modifiedText),
      added,
      removed,
    };
  }, [diff, originalText, modifiedText]);

  const handleCompare = () => {
    setHasCompared(true);
  };

  const handleClear = () => {
    setOriginalText("");
    setModifiedText("");
    setHasCompared(false);
  };

  const handleSwap = () => {
    setOriginalText(modifiedText);
    setModifiedText(originalText);
    setHasCompared(false);
  };

  return (
    <section className="w-full  py-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            Text Comparison Tool
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Text Diff Checker
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Compare two texts and instantly see what has been added, removed, or
            kept unchanged.
          </p>
        </div>

        {/* Input Cards */}
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Original */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="font-semibold text-slate-900">Original Text</h2>

                <p className="mt-1 text-xs text-slate-500">
                  Paste the original version
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {originalText.length} chars
              </span>
            </div>

            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Paste your original text here..."
              className="min-h-[260px] w-full resize-y border-0 bg-white p-5 text-sm leading-7 text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0"
            />
          </div>

          {/* Modified */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="font-semibold text-slate-900">Modified Text</h2>

                <p className="mt-1 text-xs text-slate-500">
                  Paste the changed version
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {modifiedText.length} chars
              </span>
            </div>

            <textarea
              value={modifiedText}
              onChange={(e) => setModifiedText(e.target.value)}
              placeholder="Paste your modified text here..."
              className="min-h-[260px] w-full resize-y border-0 bg-white p-5 text-sm leading-7 text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleCompare}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Compare Text
          </button>

          <button
            type="button"
            onClick={handleSwap}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Swap
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Clear
          </button>
        </div>

        {/* Stats */}
        {hasCompared && (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <StatCard label="Original Words" value={stats.originalWords} />

            <StatCard label="New Words" value={stats.modifiedWords} />

            <StatCard label="Original Chars" value={stats.originalCharacters} />

            <StatCard label="New Chars" value={stats.modifiedCharacters} />

            <StatCard label="Added" value={stats.added} type="added" />

            <StatCard label="Removed" value={stats.removed} type="removed" />
          </div>
        )}

        {/* Result */}
        {hasCompared && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Comparison Result
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Green text was added and red text was removed.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-2 text-emerald-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Added
                </span>

                <span className="flex items-center gap-2 text-red-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  Removed
                </span>
              </div>
            </div>

            <div className="max-h-[500px] overflow-auto p-5">
              {diff.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="font-medium text-slate-700">
                    No differences found
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Both texts are identical.
                  </p>
                </div>
              ) : (
                <div className="whitespace-pre-wrap break-words font-mono text-sm leading-7 text-slate-700">
                  {diff.map((item, index) => {
                    if (item.type === "same") {
                      return <span key={index}>{item.text}</span>;
                    }

                    if (item.type === "added") {
                      return (
                        <span
                          key={index}
                          className="rounded bg-emerald-100 px-1 py-0.5 text-emerald-800"
                        >
                          {item.text}
                        </span>
                      );
                    }

                    return (
                      <span
                        key={index}
                        className="rounded bg-red-100 px-1 py-0.5 text-red-800 line-through"
                      >
                        {item.text}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function StatCard({ label, value, type }) {
  const valueClass =
    type === "added"
      ? "text-emerald-600"
      : type === "removed"
        ? "text-red-600"
        : "text-slate-900";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{label}</p>

      <p className={`mt-2 text-xl font-bold ${valueClass}`}>
        {value.toLocaleString()}
      </p>
    </div>
  );
}
