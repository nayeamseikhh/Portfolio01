import { useState } from "react";

export default function AITextSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [length, setLength] = useState("medium");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const wordCount = (value) => {
    if (!value.trim()) return 0;
    return value.trim().split(/\s+/).length;
  };

  const handleSummarize = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setSummary("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSummary(
        `This is a demo AI summary. Your original text contains ${wordCount(
          text,
        )} words. Connect this component to an AI API such as OpenAI or Gemini to generate real summaries in ${language} with a ${length} format.`,
      );
    } catch (error) {
      console.error(error);
      setSummary("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!summary) return;

    await navigator.clipboard.writeText(summary);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleClear = () => {
    setText("");
    setSummary("");
    setCopied(false);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-600 dark:text-purple-300 mb-4">
          ✨ AI Powered Tool
        </div>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          AI Text Summarizer
        </h2>

        <p className="mt-3 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Turn long articles, notes, documents and paragraphs into clear,
          concise summaries in seconds.
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-xl overflow-hidden">
        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap gap-3">
            {/* Length */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Summary Length
              </label>

              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="detailed">Detailed</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Language
              </label>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option>English</option>
                <option>বাংলা</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Arabic</option>
              </select>
            </div>
          </div>

          {/* Word Count */}
          <div className="text-sm text-gray-500">{wordCount(text)} words</div>
        </div>

        {/* Editor */}
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800">
          {/* Input */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Your Text
              </h3>

              {text && (
                <button
                  onClick={handleClear}
                  className="text-sm text-gray-500 hover:text-red-500 transition"
                >
                  Clear
                </button>
              )}
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your article, notes, document or any long text here..."
              className="w-full min-h-[320px] resize-none rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-purple-500 transition"
            />

            <button
              onClick={handleSummarize}
              disabled={!text.trim() || loading}
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Summarizing...
                </span>
              ) : (
                "✨ Summarize Text"
              )}
            </button>
          </div>

          {/* Output */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                AI Summary
              </h3>

              {summary && (
                <button
                  onClick={handleCopy}
                  className="rounded-lg px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              )}
            </div>

            <div className="min-h-[320px] rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5">
              {summary ? (
                <p className="whitespace-pre-wrap leading-7 text-gray-700 dark:text-gray-300">
                  {summary}
                </p>
              ) : (
                <div className="h-full min-h-[280px] flex flex-col items-center justify-center text-center">
                  <div className="text-4xl mb-4">🧠</div>

                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    Your summary will appear here
                  </h4>

                  <p className="mt-2 max-w-sm text-sm text-gray-500">
                    Paste your text and click the summarize button to generate a
                    concise summary.
                  </p>
                </div>
              )}
            </div>

            {summary && (
              <div className="mt-3 flex justify-between text-xs text-gray-500">
                <span>AI Generated Summary</span>
                <span>{wordCount(summary)} words</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="text-xl mb-2">⚡</div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Fast</h4>
          <p className="text-sm text-gray-500 mt-1">
            Summarize long content in seconds.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="text-xl mb-2">🌍</div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            Multilingual
          </h4>
          <p className="text-sm text-gray-500 mt-1">
            Generate summaries in multiple languages.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="text-xl mb-2">🔒</div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            Simple & Private
          </h4>
          <p className="text-sm text-gray-500 mt-1">
            Clean interface designed for everyday use.
          </p>
        </div>
      </div>
    </section>
  );
}
