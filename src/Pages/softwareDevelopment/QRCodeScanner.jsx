import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QRCodeScanner() {
  const scannerRef = useRef(null);
  const fileInputRef = useRef(null);

  const [scanner, setScanner] = useState(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [copied, setCopied] = useState(false);

  // Start Camera
  const startScanner = async () => {
    setError("");

    try {
      const qrScanner = new Html5Qrcode("qr-reader");

      await qrScanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
          aspectRatio: 1,
        },
        (decodedText) => {
          setResult(decodedText);
          setError("");

          // Stop automatically after successful scan
          qrScanner
            .stop()
            .then(() => {
              setIsScanning(false);
            })
            .catch(() => {});
        },
        () => {
          // Ignore continuous scan errors
        },
      );

      scannerRef.current = qrScanner;
      setScanner(qrScanner);
      setIsScanning(true);
    } catch (err) {
      console.error(err);

      setError(
        "Camera access failed. Please allow camera permission and try again.",
      );
      setIsScanning(false);
    }
  };

  // Stop Camera
  const stopScanner = async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        scannerRef.current.clear();

        scannerRef.current = null;
        setScanner(null);
        setIsScanning(false);
      }
    } catch (err) {
      console.error(err);
      setIsScanning(false);
    }
  };

  // Scan QR from image
  const handleImageScan = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    try {
      // Stop camera first if running
      if (scannerRef.current) {
        await scannerRef.current.stop().catch(() => {});
        scannerRef.current.clear().catch(() => {});

        scannerRef.current = null;
        setScanner(null);
        setIsScanning(false);
      }

      const imageScanner = new Html5Qrcode("qr-reader");

      const decodedText = await imageScanner.scanFile(file, true);

      setResult(decodedText);
      setError("");

      imageScanner.clear();
    } catch (err) {
      console.error(err);

      setError("No QR code found in this image. Please try another image.");
    }

    // Reset file input
    event.target.value = "";
  };

  // Copy result
  const handleCopy = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // Clear result
  const handleClear = () => {
    setResult("");
    setError("");
    setCopied(false);
  };

  // Check if result is URL
  const isUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  // Cleanup scanner when component unmounts
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .catch(() => {})
          .finally(() => {
            scannerRef.current?.clear();
          });
      }
    };
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
          <span>▣</span>
          Free Developer Tool
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          QR Code Scanner
        </h1>

        <p className="mt-3 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Scan QR codes instantly using your camera or upload a QR code image.
        </p>
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-xl">
        <div className="grid lg:grid-cols-2">
          {/* Scanner */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Scan QR Code
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Point your camera at a QR code
                </p>
              </div>

              {isScanning && (
                <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Scanning
                </span>
              )}
            </div>

            {/* Camera */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-black">
              <div id="qr-reader" className="w-full min-h-[350px]" />

              {!isScanning && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gray-950">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 text-4xl">
                    📷
                  </div>

                  <h3 className="mt-5 font-semibold text-white">
                    Camera is not active
                  </h3>

                  <p className="mt-2 max-w-sm text-sm text-gray-400">
                    Start the camera and point it toward a QR code.
                  </p>
                </div>
              )}
            </div>

            {/* Camera Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-5">
              {!isScanning ? (
                <button
                  onClick={startScanner}
                  className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3.5 font-semibold text-white shadow-lg transition hover:scale-[1.01] active:scale-95"
                >
                  📷 Start Camera
                </button>
              ) : (
                <button
                  onClick={stopScanner}
                  className="rounded-2xl bg-red-500 px-5 py-3.5 font-semibold text-white shadow-lg transition hover:bg-red-600 active:scale-95"
                >
                  ■ Stop Camera
                </button>
              )}

              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-2xl bg-gray-100 dark:bg-gray-900 px-5 py-3.5 font-semibold text-gray-700 dark:text-gray-300 transition hover:bg-gray-200 dark:hover:bg-gray-800 active:scale-95"
              >
                🖼️ Upload Image
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageScan}
                className="hidden"
              />
            </div>

            {/* Camera Note */}
            <div className="mt-5 rounded-2xl border border-blue-100 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/5 p-4">
              <div className="flex gap-3">
                <span className="text-lg">🔒</span>

                <div>
                  <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                    Camera Privacy
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-blue-600/80 dark:text-blue-300/70">
                    Camera access is used directly in your browser to scan QR
                    codes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Scan Result
                </h2>

                <p className="text-sm text-gray-500 mt-1">Your QR code data</p>
              </div>

              {result && (
                <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Found
                </span>
              )}
            </div>

            {/* Result Box */}
            <div className="min-h-[350px] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
              {result ? (
                <div className="h-full flex flex-col">
                  <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 p-5 break-words">
                    <p className="text-sm leading-7 text-gray-800 dark:text-gray-200">
                      {result}
                    </p>
                  </div>

                  {/* URL */}
                  {isUrl(result) && (
                    <a
                      href={result}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-700 transition"
                    >
                      🔗 Open Link
                    </a>
                  )}

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button
                      onClick={handleCopy}
                      className="rounded-xl bg-gray-100 dark:bg-gray-900 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                    >
                      {copied ? "✓ Copied" : "📋 Copy"}
                    </button>

                    <button
                      onClick={handleClear}
                      className="rounded-xl bg-red-50 dark:bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-4xl">
                    ▣
                  </div>

                  <h3 className="mt-5 font-semibold text-gray-700 dark:text-gray-300">
                    No QR code scanned
                  </h3>

                  <p className="mt-2 max-w-sm text-sm text-gray-500">
                    Scan a QR code with your camera or upload an image to see
                    the result here.
                  </p>
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 flex gap-3 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-500/10 p-4">
                <span className="text-lg">⚠️</span>

                <div>
                  <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">
                    Scan Error
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-red-600/80 dark:text-red-300/80">
                    {error}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
          <div className="text-2xl mb-3">📷</div>

          <h3 className="font-semibold text-gray-900 dark:text-white">
            Camera Scanner
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Scan QR codes directly using your device camera.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
          <div className="text-2xl mb-3">🖼️</div>

          <h3 className="font-semibold text-gray-900 dark:text-white">
            Image Scanner
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Upload an existing QR code image to scan it.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
          <div className="text-2xl mb-3">🔗</div>

          <h3 className="font-semibold text-gray-900 dark:text-white">
            Open Links
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Website URLs can be opened directly from the result.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
          <div className="text-2xl mb-3">📋</div>

          <h3 className="font-semibold text-gray-900 dark:text-white">
            Copy Result
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Copy scanned QR data with one click.
          </p>
        </div>
      </div>
    </section>
  );
}
