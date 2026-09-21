import { useCallback, useEffect, useId, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 *  Image Resizer & Format Converter (PNG, JPG, WebP)
 *  Everything runs in the browser, images are never uploaded.
 *
 *  Styled with the portfolio's index.css tokens (Tailwind v4):
 *  bg-black01 / bg-black02 / text-orange / text-white02,
 *  custom breakpoints (sm 576, md 768, lg 992) and .btn-primary /
 *  .btn-secondary.
 * ------------------------------------------------------------------ */

/* ------------------------------ Settings ---------------------------- */

const MAX_FILE_MB = 25;
const MAX_DIM = 8000; // px per side

const FORMATS = [
  { id: "png", label: "PNG", mime: "image/png" },
  { id: "jpeg", label: "JPG", mime: "image/jpeg" },
  { id: "webp", label: "WebP", mime: "image/webp" },
];

const TYPE_EXT = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};
const SCALES = [100, 75, 50, 25];

const CHECKER = {
  backgroundColor: "#262626",
  backgroundImage:
    "conic-gradient(#333 25%, transparent 0 50%, #333 0 75%, transparent 0)",
  backgroundSize: "16px 16px",
};

/* ------------------------------ Helpers ----------------------------- */

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black01 px-3 py-2.5 text-base tabular-nums text-white placeholder:text-white02/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

/* --------------------------- Small pieces --------------------------- */

function Section({ title, className = "", children }) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-black01 p-4 ${className}`}
    >
      <h3 className="mb-3 text-sm font-semibold text-white02">{title}</h3>
      {children}
    </div>
  );
}

function Stat({ label, main, sub }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-black01 p-3 sm:p-4">
      <p className="text-xs text-white02">{label}</p>
      <p className="mt-1 truncate text-base font-semibold tabular-nums sm:text-lg">
        {main}
      </p>
      <p className="text-xs text-white02 tabular-nums">{sub}</p>
    </div>
  );
}

/* ---------------------------- Component ----------------------------- */

export default function ImageConverter() {
  const fileInput = useRef(null);
  const sourceUrlRef = useRef(null);
  const resultUrlRef = useRef(null);

  const widthId = useId();
  const heightId = useId();
  const qualityId = useId();
  const bgId = useId();

  const [source, setSource] = useState(null); // { img, url, file, width, height }
  const [result, setResult] = useState(null); // { blob, url, width, height, type, requested }
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [view, setView] = useState("result"); // result | original

  const [format, setFormat] = useState("webp");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lock, setLock] = useState(true);
  const [quality, setQuality] = useState(85);
  const [background, setBackground] = useState("#ffffff");

  /* Free object URLs when the component unmounts */
  useEffect(
    () => () => {
      if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    },
    [],
  );

  /* ---- Load a file ---- */
  const loadFile = useCallback(async (file) => {
    if (!file) return;
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (PNG, JPG or WebP).");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(
        `This file is larger than ${MAX_FILE_MB} MB. Please choose a smaller image.`,
      );
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;

    try {
      await img.decode();
      if (!img.naturalWidth || !img.naturalHeight) throw new Error("empty");
    } catch {
      URL.revokeObjectURL(url);
      setError("This image couldn't be opened. Try a PNG, JPG or WebP file.");
      return;
    }

    if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current);
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = null;
    }
    sourceUrlRef.current = url;

    const w = Math.min(img.naturalWidth, MAX_DIM);
    const h = Math.round((w * img.naturalHeight) / img.naturalWidth);

    setSource({
      img,
      url,
      file,
      width: img.naturalWidth,
      height: img.naturalHeight,
    });
    setResult(null);
    setView("result");
    setWidth(String(w));
    setHeight(String(Math.max(1, h)));
  }, []);

  const openPicker = () => fileInput.current?.click();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    loadFile(e.dataTransfer.files?.[0]);
  };

  /* ---- Size controls ---- */
  function changeSize(axis, raw) {
    if (raw === "") {
      if (axis === "w") setWidth("");
      else setHeight("");
      return;
    }
    const n = Math.min(MAX_DIM, Math.max(0, Math.floor(Number(raw))));
    if (Number.isNaN(n)) return;

    let other = null;
    if (lock && source) {
      const ratio =
        axis === "w"
          ? source.height / source.width
          : source.width / source.height;
      other = Math.min(MAX_DIM, Math.max(1, Math.round(n * ratio)));
    }

    if (axis === "w") {
      setWidth(String(n));
      if (other !== null) setHeight(String(other));
    } else {
      setHeight(String(n));
      if (other !== null) setWidth(String(other));
    }
  }

  function applyScale(percent) {
    if (!source) return;
    setWidth(
      String(
        Math.min(
          MAX_DIM,
          Math.max(1, Math.round((source.width * percent) / 100)),
        ),
      ),
    );
    setHeight(
      String(
        Math.min(
          MAX_DIM,
          Math.max(1, Math.round((source.height * percent) / 100)),
        ),
      ),
    );
  }

  /* ---- Resize + convert (debounced) ---- */
  useEffect(() => {
    if (!source) return;
    const w = Number(width);
    const h = Number(height);
    if (!(w >= 1 && h >= 1)) return;

    let cancelled = false;
    const fmt = FORMATS.find((f) => f.id === format);

    const timer = setTimeout(async () => {
      setProcessing(true);
      setError("");
      try {
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("no canvas");

        // JPG has no transparency, so paint a background first
        if (fmt.id === "jpeg") {
          ctx.fillStyle = background;
          ctx.fillRect(0, 0, w, h);
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(source.img, 0, 0, w, h);

        const blob = await new Promise((resolve) =>
          canvas.toBlob(
            resolve,
            fmt.mime,
            fmt.id === "png" ? undefined : quality / 100,
          ),
        );
        if (cancelled) return;
        if (!blob) throw new Error("encode failed");

        const url = URL.createObjectURL(blob);
        if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
        resultUrlRef.current = url;

        setResult({
          blob,
          url,
          width: w,
          height: h,
          type: blob.type,
          requested: fmt.mime,
        });
      } catch {
        if (!cancelled) {
          setError(
            "Couldn't process this image. Try a smaller size or a different format.",
          );
        }
      } finally {
        if (!cancelled) setProcessing(false);
      }
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [source, width, height, format, quality, background]);

  /* ---- Derived values ---- */
  const ext = result ? (TYPE_EXT[result.type] ?? "png") : "";
  const baseName = source
    ? source.file.name.replace(/\.[^.]+$/, "").replace(/[^\w\-]+/g, "_") ||
      "image"
    : "image";
  const downloadName = result
    ? `${baseName}-${result.width}x${result.height}.${ext}`
    : "";

  const change =
    result && source
      ? ((result.blob.size - source.file.size) / source.file.size) * 100
      : null;
  const formatFallback = result && result.type !== result.requested;
  const showQuality = format !== "png";
  const sizeInvalid = source && !(Number(width) >= 1 && Number(height) >= 1);

  const activeScale = source
    ? SCALES.find(
        (p) =>
          Number(width) === Math.round((source.width * p) / 100) &&
          Number(height) === Math.round((source.height * p) / 100),
      )
    : null;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 text-white mt-20">
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          loadFile(e.target.files?.[0]);
          e.target.value = ""; // allows picking the same file again
        }}
      />

      <div className="rounded-2xl border  border-white/10 bg-black02 p-4 sm:p-6 lg:p-8">
        <header className="mb-6 ">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Image Resizer <span className="text-orange">&amp;</span> Converter
          </h2>
          <p className="mt-2 text-sm text-white02 sm:text-base">
            Resize and convert PNG, JPG and WebP images. Everything happens in
            your browser, so your image is never uploaded.
          </p>
        </header>

        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {error}
          </p>
        )}

        {/* ---------------- Empty state: drop zone ---------------- */}
        {!source && (
          <div
            role="button"
            tabIndex={0}
            aria-label="Choose an image to resize or convert"
            onClick={openPicker}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openPicker();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`flex min-h-[260px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-10 text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange sm:min-h-[320px] ${
              dragging
                ? "border-orange bg-orange/10"
                : "border-white/20 bg-black01 hover:border-orange/60 hover:bg-orange/5"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-12 w-12 text-orange sm:h-14 sm:w-14"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            <p className="text-lg font-semibold sm:text-xl">
              Drag &amp; drop an image here
            </p>
            <p className="text-sm text-white02">or tap to browse your files</p>
            <p className="text-xs text-white02/70">
              PNG, JPG or WebP, up to {MAX_FILE_MB} MB
            </p>
          </div>
        )}

        {/* ---------------- Editor ---------------- */}
        {source && (
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Preview */}
            <div className="min-w-0 lg:col-span-3">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div
                  role="radiogroup"
                  aria-label="Preview"
                  className="flex rounded-lg border border-white/10 bg-black01 p-1"
                >
                  {[
                    { id: "result", label: "Result" },
                    { id: "original", label: "Original" },
                  ].map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      role="radio"
                      aria-checked={view === o.id}
                      onClick={() => setView(o.id)}
                      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange ${
                        view === o.id
                          ? "bg-orange text-white"
                          : "text-white02 hover:bg-white/5"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>

                <p
                  className="min-w-0 truncate text-sm text-white02"
                  title={source.file.name}
                >
                  {source.file.name}
                </p>
              </div>

              <div
                className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-xl border border-white/10 p-2 sm:min-h-[320px]"
                style={CHECKER}
              >
                {(view === "original" ? source.url : result?.url) ? (
                  <img
                    src={view === "original" ? source.url : result.url}
                    alt={
                      view === "original"
                        ? "Original image"
                        : "Resized image preview"
                    }
                    className="max-h-[60vh] w-auto max-w-full object-contain"
                  />
                ) : (
                  <p className="text-sm text-white02">Preparing preview…</p>
                )}

                {processing && (
                  <span
                    role="status"
                    className="absolute right-2 top-2 animate-pulse rounded-full bg-black01/90 px-3 py-1 text-xs text-white02"
                  >
                    Processing…
                  </span>
                )}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <Stat
                  label="Original"
                  main={`${source.width} × ${source.height}`}
                  sub={formatBytes(source.file.size)}
                />
                <Stat
                  label="Result"
                  main={result ? `${result.width} × ${result.height}` : "—"}
                  sub={
                    result
                      ? `${formatBytes(result.blob.size)} ${ext.toUpperCase()}`
                      : "…"
                  }
                />
              </div>

              {change !== null && (
                <p className="mt-3 text-sm text-white02">
                  File size change:{" "}
                  <strong
                    className={change <= 0 ? "text-green-400" : "text-orange"}
                  >
                    {change > 0 ? "+" : ""}
                    {change.toFixed(0)}%
                  </strong>
                </p>
              )}

              {formatFallback && (
                <p className="mt-2 text-sm text-orange">
                  Your browser can't export this format, so the image was saved
                  as {ext.toUpperCase()} instead.
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="min-w-0 space-y-4 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <Section title="Output format">
                  <div
                    role="radiogroup"
                    aria-label="Output format"
                    className="grid grid-cols-3 gap-1 rounded-lg bg-black02 p-1"
                  >
                    {FORMATS.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        role="radio"
                        aria-checked={format === f.id}
                        onClick={() => setFormat(f.id)}
                        className={`rounded-md px-2 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange ${
                          format === f.id
                            ? "bg-orange text-white"
                            : "text-white02 hover:bg-white/5"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </Section>

                <Section title={showQuality ? "Quality" : "Compression"}>
                  {showQuality ? (
                    <>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor={qualityId}
                          className="text-sm text-white02"
                        >
                          Quality
                        </label>
                        <span className="text-sm font-semibold tabular-nums">
                          {quality}%
                        </span>
                      </div>
                      <input
                        id={qualityId}
                        type="range"
                        min="10"
                        max="100"
                        step="1"
                        value={quality}
                        onChange={(e) => setQuality(Number(e.target.value))}
                        className="mt-3 h-2 w-full cursor-pointer accent-orange"
                      />
                      <p className="mt-2 text-xs text-white02">
                        Lower quality gives a smaller file.
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-white02">
                      PNG is lossless, so there is no quality setting.
                    </p>
                  )}
                </Section>
              </div>

              <Section title="Size">
                <div className="grid grid-cols-4 gap-2">
                  {SCALES.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => applyScale(p)}
                      aria-pressed={activeScale === p}
                      className={`rounded-lg border px-2 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange ${
                        activeScale === p
                          ? "border-orange bg-orange/15 text-orange"
                          : "border-white/10 text-white02 hover:bg-white/5"
                      }`}
                    >
                      {p}%
                    </button>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="min-w-0">
                    <label
                      htmlFor={widthId}
                      className="mb-1.5 block text-sm text-white02"
                    >
                      Width (px)
                    </label>
                    <input
                      id={widthId}
                      type="number"
                      inputMode="numeric"
                      min="1"
                      max={MAX_DIM}
                      value={width}
                      onChange={(e) => changeSize("w", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="min-w-0">
                    <label
                      htmlFor={heightId}
                      className="mb-1.5 block text-sm text-white02"
                    >
                      Height (px)
                    </label>
                    <input
                      id={heightId}
                      type="number"
                      inputMode="numeric"
                      min="1"
                      max={MAX_DIM}
                      value={height}
                      onChange={(e) => changeSize("h", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-white02">
                  <input
                    type="checkbox"
                    checked={lock}
                    onChange={(e) => setLock(e.target.checked)}
                    className="h-4 w-4 cursor-pointer accent-orange"
                  />
                  Keep aspect ratio
                </label>

                <p className="mt-2 text-xs text-white02">
                  {sizeInvalid ? (
                    <span className="text-orange">
                      Enter a width and height of at least 1 px.
                    </span>
                  ) : (
                    <>Up to {MAX_DIM} px on each side.</>
                  )}
                </p>
              </Section>

              {format === "jpeg" && (
                <Section title="Background">
                  <div className="flex items-center gap-3">
                    <input
                      id={bgId}
                      type="color"
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="h-10 w-14 cursor-pointer rounded-md border border-white/10 bg-black02 p-1"
                    />
                    <label htmlFor={bgId} className="text-sm text-white02">
                      JPG has no transparency, so see-through areas are filled
                      with this color.
                    </label>
                  </div>
                </Section>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                {result ? (
                  <a
                    href={result.url}
                    download={downloadName}
                    aria-disabled={processing}
                    onClick={(e) => processing && e.preventDefault()}
                    className={`btn-primary w-full sm:flex-1 ${processing ? "pointer-events-none opacity-60" : ""}`}
                  >
                    Download {ext.toUpperCase()}
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="btn-primary pointer-events-none w-full opacity-60 sm:flex-1"
                  >
                    Download
                  </button>
                )}

                <button
                  type="button"
                  onClick={openPicker}
                  className="btn-secondary w-full sm:flex-1"
                >
                  Choose another image
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
