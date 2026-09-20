import { useState } from "react";

export default function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const exampleJson = {
    name: "John Doe",
    age: 28,
    developer: true,
    skills: ["React", "JavaScript", "Tailwind CSS"],
    address: {
      city: "Dhaka",
      country: "Bangladesh",
    },
  };

  // Calculate line and column from JSON error position
  const getErrorPosition = (message, text) => {
    const match = message.match(/position (\d+)/i);

    if (!match) return null;

    const position = Number(match[1]);

    const beforeError = text.substring(0, position);
    const lines = beforeError.split("\n");

    return {
      line: lines.length,
      column: lines[lines.length - 1].length + 1,
    };
  };

  // Format / Validate JSON
  const handleFormat = () => {
    if (!jsonInput.trim()) {
      setError("Please enter some JSON first.");
      setFormattedJson("");
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);

      const pretty = JSON.stringify(parsed, null, 2);

      setFormattedJson(pretty);
      setError("");
    } catch (err) {
      const position = getErrorPosition(err.message, jsonInput);

      if (position) {
        setError(
          `Invalid JSON: ${err.message} — Line ${position.line}, Column ${position.column}`,
        );
      } else {
        setError(`Invalid JSON: ${err.message}`);
      }

      setFormattedJson("");
    }
  };

  // Minify JSON
  const handleMinify = () => {
    if (!jsonInput.trim()) {
      setError("Please enter some JSON first.");
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);

      const minified = JSON.stringify(parsed);

      setFormattedJson(minified);
      setError("");
    } catch (err) {
      const position = getErrorPosition(err.message, jsonInput);

      if (position) {
        setError(
          `Invalid JSON: ${err.message} — Line ${position.line}, Column ${position.column}`,
        );
      } else {
        setError(`Invalid JSON: ${err.message}`);
      }

      setFormattedJson("");
    }
  };

  // Load example
  const handleExample = () => {
    const example = JSON.stringify(exampleJson, null, 2);

    setJsonInput(example);
    setFormattedJson("");
    setError("");
  };

  // Copy result
  const handleCopy = async () => {
    if (!formattedJson) return;

    try {
      await navigator.clipboard.writeText(formattedJson);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // Download JSON
  const handleDownload = () => {
    if (!formattedJson) return;

    const blob = new Blob([formattedJson], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "formatted.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // Clear everything
  const handleClear = () => {
    setJsonInput("");
    setFormattedJson("");
    setError("");
    setCopied(false);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium">
          <span>⚡</span>
          Developer Tool
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          JSON Formatter & Validator
        </h1>

        <p className="mt-3 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Format, validate, minify and download your JSON instantly.
        </p>
      </div>

      {/* Main Tool */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-xl">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap gap-2">
            {/* Format */}
            <button
              onClick={handleFormat}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
            >
              ✨ Format
            </button>

            {/* Minify */}
            <button
              onClick={handleMinify}
              className="inline-flex items-center gap-2 rounded-xl bg-gray-100 dark:bg-gray-900 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 transition hover:bg-gray-200 dark:hover:bg-gray-800 active:scale-95"
            >
              Minify
            </button>

            {/* Example */}
            <button
              onClick={handleExample}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
            >
              Example
            </button>

            {/* Clear */}
            <button
              onClick={handleClear}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
            >
              Clear
            </button>
          </div>

          {/* Status */}
          <div>
            {error ? (
              <span className="inline-flex items-center gap-2 text-sm font-medium text-red-500">
                <span>●</span>
                Invalid JSON
              </span>
            ) : formattedJson ? (
              <span className="inline-flex items-center gap-2 text-sm font-medium text-green-500">
                <span>●</span>
                Valid JSON
              </span>
            ) : (
              <span className="text-sm text-gray-400">Ready</span>
            )}
          </div>
        </div>

        {/* Editors */}
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-800">
          {/* Input */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  JSON Input
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Paste your JSON below
                </p>
              </div>

              <span className="text-xs text-gray-400">
                {jsonInput.length} characters
              </span>
            </div>

            <textarea
              value={jsonInput}
              onChange={(e) => {
                setJsonInput(e.target.value);
                setError("");
              }}
              spellCheck="false"
              placeholder={`{
  "name": "John",
  "age": 25
}`}
              className="w-full min-h-[420px] resize-y rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5 font-mono text-sm leading-6 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {/* Error */}
            {error && (
              <div className="mt-4 flex gap-3 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-500/10 p-4">
                <span className="text-red-500 text-lg">⚠️</span>

                <div>
                  <p className="font-semibold text-red-600 dark:text-red-400">
                    JSON Error
                  </p>

                  <p className="mt-1 text-sm leading-6 text-red-600/80 dark:text-red-300/80 break-words">
                    {error}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Formatted JSON
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Your formatted result
                </p>
              </div>

              <div className="flex gap-2">
                {/* Copy */}
                <button
                  onClick={handleCopy}
                  disabled={!formattedJson}
                  className="rounded-xl bg-gray-100 dark:bg-gray-900 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>

                {/* Download */}
                <button
                  onClick={handleDownload}
                  disabled={!formattedJson}
                  className="rounded-xl bg-gray-100 dark:bg-gray-900 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  ↓ Download
                </button>
              </div>
            </div>

            <div className="relative min-h-[420px] rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 overflow-hidden">
              {formattedJson ? (
                <pre className="h-[420px] overflow-auto p-5 font-mono text-sm leading-6 text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                  {formattedJson}
                </pre>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-500/10 text-3xl">
                    {"{}"}
                  </div>

                  <h3 className="mt-5 font-semibold text-gray-700 dark:text-gray-300">
                    Your JSON will appear here
                  </h3>

                  <p className="mt-2 max-w-sm text-sm text-gray-500">
                    Paste JSON on the left and click Format to validate and
                    beautify it.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
          <div className="text-2xl mb-3">✨</div>

          <h3 className="font-semibold text-gray-900 dark:text-white">
            Pretty Print
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Make messy JSON clean and readable.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
          <div className="text-2xl mb-3">✓</div>

          <h3 className="font-semibold text-gray-900 dark:text-white">
            JSON Validator
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Quickly detect invalid JSON syntax.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
          <div className="text-2xl mb-3">⚡</div>

          <h3 className="font-semibold text-gray-900 dark:text-white">
            Minify JSON
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Compress JSON by removing unnecessary spaces.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
          <div className="text-2xl mb-3">↓</div>

          <h3 className="font-semibold text-gray-900 dark:text-white">
            Download
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Download your formatted JSON as a file.
          </p>
        </div>
      </div>
    </section>
  );
}
