import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text.trim()) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleDownload = () => {
    const canvas = document.getElementById("qr-code");

    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");

    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleClear = () => {
    setText("");
    setCopied(false);
  };

  const handleExample = () => {
    setText("https://example.com");
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
          <span>▦</span>
          Free Developer Tool
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          QR Code Generator
        </h1>

        <p className="mt-3 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Generate a QR code for any URL, text, contact information or message
          instantly.
        </p>
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-xl">
        <div className="grid lg:grid-cols-2">
          {/* LEFT - INPUT */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Enter your content
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Add a URL or any text
                </p>
              </div>

              <span className="text-xs text-gray-400">
                {text.length} characters
              </span>
            </div>

            {/* Textarea */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com"
              spellCheck="false"
              className="w-full min-h-[220px] resize-none rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5 text-sm leading-6 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={handleExample}
                className="rounded-xl bg-gray-100 dark:bg-gray-900 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              >
                Example
              </button>

              <button
                onClick={handleCopy}
                disabled={!text.trim()}
                className="rounded-xl bg-gray-100 dark:bg-gray-900 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                {copied ? "✓ Copied" : "Copy Text"}
              </button>

              <button
                onClick={handleClear}
                disabled={!text}
                className="rounded-xl bg-red-50 dark:bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Clear
              </button>
            </div>

            {/* Size */}
            <div className="mt-7">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-900 dark:text-white">
                  QR Code Size
                </label>

                <span className="text-sm text-gray-500">
                  {size} × {size}px
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[192, 256, 384].map((value) => (
                  <button
                    key={value}
                    onClick={() => setSize(value)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                      size === value
                        ? "border-indigo-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                        : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                    }`}
                  >
                    {value}px
                  </button>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="mt-7 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/5 p-4">
              <div className="flex gap-3">
                <span className="text-lg">💡</span>

                <div>
                  <h3 className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">
                    Quick Tip
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-indigo-600/80 dark:text-indigo-300/70">
                    You can use URLs, plain text, phone numbers, email addresses
                    and other information.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - QR PREVIEW */}
          <div className="border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  QR Code Preview
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Scan with your phone
                </p>
              </div>

              {text.trim() && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-500">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Ready
                </span>
              )}
            </div>

            {/* QR Area */}
            <div className="min-h-[350px] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center justify-center p-6">
              {text.trim() ? (
                <div className="flex flex-col items-center">
                  <div className="rounded-2xl bg-white p-4 shadow-lg border border-gray-100">
                    <QRCodeCanvas
                      id="qr-code"
                      value={text}
                      size={size}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="H"
                      includeMargin={true}
                    />
                  </div>

                  <p className="mt-5 max-w-sm text-center text-xs text-gray-500 break-all">
                    {text}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-4xl">
                    ▦
                  </div>

                  <h3 className="mt-5 font-semibold text-gray-700 dark:text-gray-300">
                    Your QR code will appear here
                  </h3>

                  <p className="mt-2 max-w-sm text-sm text-gray-500">
                    Enter a URL or text on the left to generate your QR code.
                  </p>
                </div>
              )}
            </div>

            {/* Download */}
            <button
              onClick={handleDownload}
              disabled={!text.trim()}
              className="mt-5 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3.5 font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ↓ Download QR Code
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
          <div className="text-2xl mb-3">⚡</div>

          <h3 className="font-semibold text-gray-900 dark:text-white">
            Instant
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Generate QR codes instantly as you type.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
          <div className="text-2xl mb-3">🔗</div>

          <h3 className="font-semibold text-gray-900 dark:text-white">
            Any URL
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Convert websites and links into QR codes.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
          <div className="text-2xl mb-3">📱</div>

          <h3 className="font-semibold text-gray-900 dark:text-white">
            Mobile Ready
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Scan generated QR codes with any phone.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
          <div className="text-2xl mb-3">⬇️</div>

          <h3 className="font-semibold text-gray-900 dark:text-white">
            Download
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Download your QR code as a PNG image.
          </p>
        </div>
      </div>
    </section>
  );
}
