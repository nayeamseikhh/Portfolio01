import React, { useEffect, useRef, useState } from "react";
import { removeBackground } from "@imgly/background-removal";

export default function BackgroundRemover() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (image?.preview) {
        URL.revokeObjectURL(image.preview);
      }

      if (result?.url) {
        URL.revokeObjectURL(result.url);
      }
    };
  }, [image, result]);

  // -----------------------------
  // Select image
  // -----------------------------
  const selectImage = (file) => {
    if (!file) return;

    setError("");
    setResult(null);
    setProgress(0);
    setStatus("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // Optional safety limit: 15 MB
    if (file.size > 15 * 1024 * 1024) {
      setError("Image size must be less than 15 MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setImage({
      file,
      preview: previewUrl,
      name: file.name,
      size: file.size,
    });
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      selectImage(file);
    }
  };

  // -----------------------------
  // Drag & Drop
  // -----------------------------
  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    if (file) {
      selectImage(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // -----------------------------
  // Remove Background
  // -----------------------------
  const handleRemoveBackground = async () => {
    if (!image?.file || processing) return;

    try {
      setProcessing(true);
      setError("");
      setResult(null);
      setProgress(0);
      setStatus("Preparing image...");

      const blob = await removeBackground(image.file, {
        progress: (key, current, total) => {
          if (total > 0) {
            const percentage = Math.round((current / total) * 100);

            setProgress(percentage);
          }

          if (key) {
            setStatus("Removing background...");
          }
        },
      });

      // Force PNG format
      const pngBlob = new Blob([blob], {
        type: "image/png",
      });

      const resultUrl = URL.createObjectURL(pngBlob);

      setResult({
        blob: pngBlob,
        url: resultUrl,
      });

      setProgress(100);
      setStatus("Background removed successfully!");
    } catch (err) {
      console.error("Background removal error:", err);

      setError(
        "Background removal failed. Please check your connection and try again.",
      );

      setStatus("");
    } finally {
      setProcessing(false);
    }
  };

  // -----------------------------
  // Reliable PNG Download
  // -----------------------------
  const handleDownload = async () => {
    if (!result?.blob) {
      setError("No processed image available.");
      return;
    }

    try {
      setError("");

      // Make sure browser sees it as PNG
      const pngBlob = new Blob([result.blob], {
        type: "image/png",
      });

      // Use FileReader instead of direct Blob URL.
      // This avoids some Chrome download issues.
      const reader = new FileReader();

      reader.onload = () => {
        const dataUrl = reader.result;

        const link = document.createElement("a");

        link.href = dataUrl;
        link.download = "background-removed.png";

        link.style.display = "none";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      reader.onerror = () => {
        setError("Failed to prepare the PNG for download.");
      };

      reader.readAsDataURL(pngBlob);
    } catch (err) {
      console.error("Download error:", err);

      setError("Download failed. Please try again.");
    }
  };

  // -----------------------------
  // Clear
  // -----------------------------
  const handleClear = () => {
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }

    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }

    setImage(null);
    setResult(null);
    setProcessing(false);
    setProgress(0);
    setStatus("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // -----------------------------
  // Choose another image
  // -----------------------------
  const handleChooseAnother = () => {
    if (processing) return;

    fileInputRef.current?.click();
  };

  return (
    <section className="min-h-screen w-full bg-transparent py-25">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
            AI Image Tool
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Background Remover
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Remove image backgrounds directly in your browser. Your image stays
            on your device.
          </p>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* =========================
              UPLOAD SCREEN
          ========================== */}
          {!image && (
            <div className="p-5 sm:p-8">
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className="group flex min-h-[360px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-3xl transition group-hover:scale-105">
                  🖼️
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  Upload an image
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Drag and drop your image here, or click to browse from your
                  device.
                </p>

                <span className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition group-hover:bg-indigo-700">
                  Choose Image
                </span>

                <p className="mt-4 text-xs text-slate-400">
                  PNG, JPG, JPEG, WEBP • Maximum 15 MB
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />

              {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* =========================
              IMAGE WORKSPACE
          ========================== */}
          {image && (
            <div className="p-5 sm:p-8">
              {/* File information */}
              <div className="mb-6 flex flex-col gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    Selected Image
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {image.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClear}
                  disabled={processing}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Remove
                </button>
              </div>

              {/* Preview */}
              <div className="grid gap-5 md:grid-cols-2">
                {/* Original */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-200 px-4 py-3">
                    <h3 className="text-sm font-semibold text-slate-900">
                      Original
                    </h3>
                  </div>

                  <div className="flex min-h-[320px] items-center justify-center bg-slate-100 p-4">
                    <img
                      src={image.preview}
                      alt="Original"
                      className="max-h-[420px] max-w-full rounded-xl object-contain shadow-sm"
                    />
                  </div>
                </div>

                {/* Result */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-200 px-4 py-3">
                    <h3 className="text-sm font-semibold text-slate-900">
                      Background Removed
                    </h3>
                  </div>

                  <div className="flex min-h-[320px] items-center justify-center bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%),linear-gradient(-45deg,#e2e8f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e2e8f0_75%),linear-gradient(-45deg,transparent_75%,#e2e8f0_75%)] bg-[length:24px_24px] bg-[position:0_0,0_12px,12px_-12px,-12px_0px] bg-white p-4">
                    {result ? (
                      <img
                        src={result.url}
                        alt="Background removed"
                        className="max-h-[420px] max-w-full rounded-xl object-contain shadow-sm"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                          ✨
                        </div>

                        <p className="font-semibold text-slate-700">
                          Result will appear here
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Remove the background to see the result
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress */}
              {processing && (
                <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-indigo-900">
                      {status || "Processing..."}
                    </span>

                    <span className="text-sm font-bold text-indigo-700">
                      {progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-indigo-100">
                    <div
                      className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-3 text-xs leading-5 text-indigo-700">
                    AI processing is running directly in your browser. Please
                    keep this tab open.
                  </p>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Success */}
              {result && !processing && (
                <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <p className="text-sm font-semibold text-emerald-800">
                    ✓ Background removed successfully
                  </p>

                  <p className="mt-1 text-xs text-emerald-700">
                    Your transparent PNG is ready.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                {!result && (
                  <button
                    type="button"
                    onClick={handleRemoveBackground}
                    disabled={processing}
                    className="rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {processing
                      ? "Removing Background..."
                      : "Remove Background"}
                  </button>
                )}

                {result && !processing && (
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
                  >
                    Download PNG
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleChooseAnother}
                  disabled={processing}
                  className="rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Choose Another
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </div>

        {/* Feature Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">
              🔒
            </div>

            <h3 className="font-semibold text-slate-900">Private</h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Your image is processed directly in your browser.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">
              ⚡
            </div>

            <h3 className="font-semibold text-slate-900">AI Powered</h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              AI automatically detects and removes the background.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">
              🖼️
            </div>

            <h3 className="font-semibold text-slate-900">Transparent PNG</h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Download your final image with transparency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
