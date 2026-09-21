import { useEffect, useId, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 *  Image Compressor (JPG, PNG, WebP)
 *  Compress one or many images in the browser. Nothing is uploaded.
 *  No library needed, the ZIP download is built by the small helper below.
 *
 *  Styled with the portfolio's index.css tokens (Tailwind v4):
 *  bg-black01 / bg-black02 / text-orange / text-white02,
 *  custom breakpoints (sm 576, lg 992) and .btn-primary / .btn-secondary.
 * ------------------------------------------------------------------ */

/* ------------------------------ Settings ---------------------------- */

const MAX_FILES = 30;
const MAX_FILE_MB = 25;

const EXT = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
const KEEPABLE = ["image/jpeg", "image/png", "image/webp"];

const MAX_SIDES = [
  { value: 0, label: "Original size" },
  { value: 3840, label: "3840 px (4K)" },
  { value: 2560, label: "2560 px" },
  { value: 1920, label: "1920 px (Full HD)" },
  { value: 1280, label: "1280 px (HD)" },
  { value: 800, label: "800 px" },
];

const TARGET_PRESETS = [100, 200, 500, 1000];

const CHECKER = {
  backgroundColor: "#262626",
  backgroundImage: "conic-gradient(#333 25%, transparent 0 50%, #333 0 75%, transparent 0)",
  backgroundSize: "16px 16px",
};

/* ------------------------------ ZIP builder ------------------------- */

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// Stores files without extra compression (images are already compressed)
// files: [{ name, bytes }]
function buildZip(files) {
  const enc = new TextEncoder();
  const now = new Date();
  const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2);
  const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();

  const body = [];
  const central = [];
  let offset = 0;

  for (const file of files) {
    const name = enc.encode(file.name);
    const crc = crc32(file.bytes);
    const size = file.bytes.length;

    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true);
    local.setUint16(6, 0x0800, true); // UTF-8 file names
    local.setUint16(8, 0, true); // stored
    local.setUint16(10, dosTime, true);
    local.setUint16(12, dosDate, true);
    local.setUint32(14, crc, true);
    local.setUint32(18, size, true);
    local.setUint32(22, size, true);
    local.setUint16(26, name.length, true);
    local.setUint16(28, 0, true);
    body.push(new Uint8Array(local.buffer), name, file.bytes);

    const entry = new DataView(new ArrayBuffer(46));
    entry.setUint32(0, 0x02014b50, true);
    entry.setUint16(4, 20, true);
    entry.setUint16(6, 20, true);
    entry.setUint16(8, 0x0800, true);
    entry.setUint16(10, 0, true);
    entry.setUint16(12, dosTime, true);
    entry.setUint16(14, dosDate, true);
    entry.setUint32(16, crc, true);
    entry.setUint32(20, size, true);
    entry.setUint32(24, size, true);
    entry.setUint16(28, name.length, true);
    entry.setUint16(30, 0, true);
    entry.setUint16(32, 0, true);
    entry.setUint16(34, 0, true);
    entry.setUint16(36, 0, true);
    entry.setUint32(38, 0, true);
    entry.setUint32(42, offset, true);
    central.push(new Uint8Array(entry.buffer), name);

    offset += 30 + name.length + size;
  }

  const centralSize = central.reduce((sum, part) => sum + part.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(4, 0, true);
  end.setUint16(6, 0, true);
  end.setUint16(8, files.length, true);
  end.setUint16(10, files.length, true);
  end.setUint32(12, centralSize, true);
  end.setUint32(16, offset, true);
  end.setUint16(20, 0, true);

  return new Blob([...body, ...central, new Uint8Array(end.buffer)], { type: "application/zip" });
}

/* ------------------------------ Compression ------------------------- */

const toBlob = (canvas, mime, quality) => new Promise((resolve) => canvas.toBlob(resolve, mime, quality));

// Finds the highest quality that still fits under the target size
async function encodeToTarget(canvas, mime, targetBytes) {
  let best = await toBlob(canvas, mime, 0.95);
  if (best && best.size <= targetBytes) return best;

  const lowest = await toBlob(canvas, mime, 0.1);
  if (!lowest || lowest.size > targetBytes) return lowest; // can't reach the target

  best = lowest;
  let lo = 0.1;
  let hi = 0.95;
  for (let i = 0; i < 6; i += 1) {
    const mid = (lo + hi) / 2;
    const blob = await toBlob(canvas, mime, mid);
    if (blob && blob.size <= targetBytes) {
      best = blob;
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return best;
}

async function compressOne(item, { mode, quality, targetKb, format, maxSide, background }) {
  const srcType = item.file.type;
  const sameType = KEEPABLE.includes(srcType) ? srcType : "image/jpeg";
  const mime = format === "same" ? sameType : format === "jpeg" ? "image/jpeg" : "image/webp";

  const longest = Math.max(item.width, item.height);
  const scale = maxSide > 0 && longest > maxSide ? maxSide / longest : 1;
  const w = Math.max(1, Math.round(item.width * scale));
  const h = Math.max(1, Math.round(item.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas unavailable");

  if (mime === "image/jpeg") {
    ctx.fillStyle = background; // JPG has no transparency
    ctx.fillRect(0, 0, w, h);
  }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(item.img, 0, 0, w, h);

  let blob;
  if (mime === "image/png") blob = await toBlob(canvas, mime);
  else if (mode === "target") blob = await encodeToTarget(canvas, mime, targetKb * 1024);
  else blob = await toBlob(canvas, mime, quality / 100);
  if (!blob) throw new Error("encode failed");

  // Re-encoding must never make a file bigger, so keep the original in that case
  if (blob.size >= item.file.size && format === "same" && scale === 1) {
    return {
      blob: item.file,
      width: item.width,
      height: item.height,
      type: srcType,
      kept: true,
      fallback: false,
      reached: mode !== "target" || item.file.size <= targetKb * 1024,
    };
  }

  return {
    blob,
    width: w,
    height: h,
    type: blob.type,
    kept: false,
    fallback: blob.type !== mime,
    reached: mode !== "target" || mime === "image/png" || blob.size <= targetKb * 1024,
  };
}

/* ------------------------------ Helpers ----------------------------- */

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function outputName(item, result) {
  const original = item.name;
  if (result.kept) return original;
  const base = original.replace(/\.[^.]+$/, "") || "image";
  return `${base}-compressed.${EXT[result.type] ?? "jpg"}`;
}

function triggerDownload(url, name) {
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const fieldClass =
  "w-full rounded-lg border border-white/10 bg-black02 px-3 py-2.5 text-base text-white [color-scheme:dark] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange";

/* --------------------------- Small pieces --------------------------- */

function Section({ title, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black01 p-4">
      <h3 className="mb-3 text-sm font-semibold text-white02">{title}</h3>
      {children}
    </div>
  );
}

function Segmented({ label, options, value, onChange }) {
  return (
    <div role="radiogroup" aria-label={label} className="grid auto-cols-fr grid-flow-col gap-1 rounded-lg bg-black02 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-md px-2 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange ${
            value === o.value ? "bg-orange text-white" : "text-white02 hover:bg-white/5"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Icon({ d, className = "h-4 w-4" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  remove: "M18 6 6 18M6 6l12 12",
  plus: "M12 5v14M5 12h14",
};

const smallButton =
  "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange";

/* ---------------------------- Component ----------------------------- */

export default function ImageCompressor() {
  const fileInput = useRef(null);
  const idCounter = useRef(0);
  const itemsRef = useRef([]);
  const urlMap = useRef({});

  const qualityId = useId();
  const targetId = useId();
  const maxSideId = useId();
  const bgId = useId();

  const [items, setItems] = useState([]); // { id, file, url, img, name, width, height }
  const [results, setResults] = useState({}); // id -> { status, url, blob, width, height, type, kept, fallback, reached }
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [dragging, setDragging] = useState(false);
  const [zipping, setZipping] = useState(false);

  const [mode, setMode] = useState("quality"); // quality | target
  const [quality, setQuality] = useState(80);
  const [targetKb, setTargetKb] = useState(200);
  const [format, setFormat] = useState("same"); // same | jpeg | webp
  const [maxSide, setMaxSide] = useState(0);
  const [background, setBackground] = useState("#ffffff");

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  // Free object URLs when the component unmounts
  useEffect(
    () => () => {
      itemsRef.current.forEach((it) => URL.revokeObjectURL(it.url));
      Object.values(urlMap.current).forEach((url) => URL.revokeObjectURL(url));
    },
    []
  );

  /* ---- Adding images ---- */
  async function addFiles(fileList) {
    const files = Array.from(fileList ?? []);
    if (!files.length) return;

    setError("");
    const room = MAX_FILES - items.length;
    const accepted = [];
    const skipped = [];

    for (const file of files) {
      if (accepted.length >= room) {
        skipped.push(`${file.name} (limit of ${MAX_FILES} images)`);
        continue;
      }
      if (!file.type.startsWith("image/")) {
        skipped.push(`${file.name} (not an image)`);
        continue;
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        skipped.push(`${file.name} (over ${MAX_FILE_MB} MB)`);
        continue;
      }

      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      try {
        await img.decode();
        if (!img.naturalWidth || !img.naturalHeight) throw new Error("empty");
      } catch {
        URL.revokeObjectURL(url);
        skipped.push(`${file.name} (can't be opened)`);
        continue;
      }

      idCounter.current += 1;
      accepted.push({
        id: idCounter.current,
        file,
        url,
        img,
        name: file.name,
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    }

    if (accepted.length) setItems((prev) => [...prev, ...accepted]);
    setNotice(skipped.length ? `Skipped: ${skipped.join(", ")}` : "");
  }

  const openPicker = () => fileInput.current?.click();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removeItem = (id) => {
    const target = items.find((it) => it.id === id);
    if (target) URL.revokeObjectURL(target.url);
    if (urlMap.current[id]) {
      URL.revokeObjectURL(urlMap.current[id]);
      delete urlMap.current[id];
    }
    setItems((prev) => prev.filter((it) => it.id !== id));
    setResults((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const clearAll = () => {
    items.forEach((it) => URL.revokeObjectURL(it.url));
    Object.values(urlMap.current).forEach((url) => URL.revokeObjectURL(url));
    urlMap.current = {};
    setItems([]);
    setResults({});
    setError("");
    setNotice("");
  };

  /* ---- Compress whenever images or settings change (debounced) ---- */
  useEffect(() => {
    if (!items.length) return;
    let cancelled = false;
    const settings = { mode, quality, targetKb: Math.max(1, Number(targetKb) || 1), format, maxSide, background };

    const timer = setTimeout(async () => {
      setResults((prev) => {
        const next = { ...prev };
        items.forEach((it) => {
          next[it.id] = { ...(next[it.id] ?? {}), status: "processing" };
        });
        return next;
      });

      for (const it of items) {
        if (cancelled) return;
        try {
          const out = await compressOne(it, settings);
          if (cancelled) return;

          const url = URL.createObjectURL(out.blob);
          if (urlMap.current[it.id]) URL.revokeObjectURL(urlMap.current[it.id]);
          urlMap.current[it.id] = url;
          setResults((prev) => ({ ...prev, [it.id]: { status: "done", url, ...out } }));
        } catch {
          if (!cancelled) setResults((prev) => ({ ...prev, [it.id]: { status: "error" } }));
        }
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [items, mode, quality, targetKb, format, maxSide, background]);

  /* ---- Downloads ---- */
  async function downloadAll() {
    const ready = items.filter((it) => results[it.id]?.status === "done");
    if (!ready.length) return;

    if (ready.length === 1) {
      const it = ready[0];
      triggerDownload(results[it.id].url, outputName(it, results[it.id]));
      return;
    }

    setZipping(true);
    setError("");
    try {
      const used = new Set();
      const files = [];
      for (const it of ready) {
        const r = results[it.id];
        let name = outputName(it, r);
        if (used.has(name)) {
          const dot = name.lastIndexOf(".");
          const base = dot > 0 ? name.slice(0, dot) : name;
          const ext = dot > 0 ? name.slice(dot) : "";
          let n = 2;
          while (used.has(`${base} (${n})${ext}`)) n += 1;
          name = `${base} (${n})${ext}`;
        }
        used.add(name);
        files.push({ name, bytes: new Uint8Array(await r.blob.arrayBuffer()) });
      }

      const zipUrl = URL.createObjectURL(buildZip(files));
      triggerDownload(zipUrl, "compressed-images.zip");
      setTimeout(() => URL.revokeObjectURL(zipUrl), 15000);
    } catch {
      setError("Couldn't create the ZIP file. Try downloading the images one by one.");
    } finally {
      setZipping(false);
    }
  }

  /* ---- Derived values ---- */
  const doneItems = items.filter((it) => results[it.id]?.status === "done");
  const busy = items.some((it) => results[it.id]?.status === "processing") || items.some((it) => !results[it.id]);
  const originalTotal = doneItems.reduce((sum, it) => sum + it.file.size, 0);
  const newTotal = doneItems.reduce((sum, it) => sum + results[it.id].blob.size, 0);
  const savedPct = originalTotal ? (1 - newTotal / originalTotal) * 100 : 0;
  const barWidth = originalTotal ? Math.min(100, (newTotal / originalTotal) * 100) : 100;
  const anyFallback = doneItems.some((it) => results[it.id].fallback);
  const lossless = format === "same" && items.length > 0 && items.every((it) => it.file.type === "image/png");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 text-white">
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = ""; // lets the same file be picked again
        }}
      />

      <div className="rounded-2xl border border-white/10 bg-black02 p-4 sm:p-6 lg:p-8">
        <header className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Image <span className="text-orange">Compressor</span>
          </h2>
          <p className="mt-2 text-sm text-white02 sm:text-base">
            Make JPG, PNG and WebP images smaller without leaving your browser. Your images are never uploaded,
            and hidden data such as camera and location info is removed.
          </p>
        </header>

        {error && (
          <p role="alert" className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="mb-4 rounded-lg border border-orange/40 bg-orange/10 px-4 py-3 text-sm text-orange">
            {notice}
          </p>
        )}

        {/* ---------------- Empty state ---------------- */}
        {items.length === 0 && (
          <div
            role="button"
            tabIndex={0}
            aria-label="Choose images to compress"
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
              dragging ? "border-orange bg-orange/10" : "border-white/20 bg-black01 hover:border-orange/60 hover:bg-orange/5"
            }`}
          >
            <Icon d={ICONS.upload} className="h-12 w-12 text-orange sm:h-14 sm:w-14" />
            <p className="text-lg font-semibold sm:text-xl">Drag &amp; drop your images here</p>
            <p className="text-sm text-white02">or tap to browse. You can pick several at once.</p>
            <p className="text-xs text-white02/70">
              JPG, PNG, WebP and more. Up to {MAX_FILES} images, {MAX_FILE_MB} MB each
            </p>
          </div>
        )}

        {/* ---------------- Editor ---------------- */}
        {items.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Image list */}
            <div
              className={`min-w-0 rounded-xl transition-shadow lg:col-span-3 ${dragging ? "ring-2 ring-orange" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-white02">
                  <strong className="text-white">{items.length}</strong> {items.length === 1 ? "image" : "images"}
                </p>
                {items.length < MAX_FILES && (
                  <button
                    type="button"
                    onClick={openPicker}
                    className={`${smallButton} border-white/10 text-white02 hover:border-orange/60 hover:text-orange`}
                  >
                    <Icon d={ICONS.plus} />
                    Add more
                  </button>
                )}
              </div>

              <ul className="space-y-3">
                {items.map((it) => {
                  const r = results[it.id];
                  const done = r?.status === "done";
                  const working = !r || r.status === "processing";
                  const change = done ? (1 - r.blob.size / it.file.size) * 100 : 0;

                  return (
                    <li
                      key={it.id}
                      className="grid grid-cols-[88px_1fr] gap-3 rounded-xl border border-white/10 bg-black01 p-3 sm:grid-cols-[120px_1fr] sm:gap-4"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg" style={CHECKER}>
                        <img
                          src={r?.url ?? it.url}
                          alt={`Preview of ${it.name}`}
                          className={`h-full w-full object-contain transition-opacity ${working ? "opacity-50" : ""}`}
                        />
                        {working && (
                          <span
                            role="status"
                            aria-label="Compressing"
                            className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-white/30 border-t-orange"
                          />
                        )}
                      </div>

                      <div className="flex min-w-0 flex-col justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold sm:text-base" title={it.name}>
                            {it.name}
                          </p>

                          {r?.status === "error" ? (
                            <p className="mt-1 text-sm text-red-300">Couldn't compress this image.</p>
                          ) : done ? (
                            <>
                              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm tabular-nums text-white02">
                                <span>
                                  {formatBytes(it.file.size)} <span aria-hidden="true">→</span>
                                  <span className="sr-only">to</span> {formatBytes(r.blob.size)}
                                </span>
                                <span
                                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                    change > 0.5 ? "bg-green-500/15 text-green-400" : "bg-orange/15 text-orange"
                                  }`}
                                >
                                  {change > 0.5 ? `−${change.toFixed(0)}%` : change < -0.5 ? `+${Math.abs(change).toFixed(0)}%` : "0%"}
                                </span>
                              </p>
                              <p className="mt-0.5 text-xs tabular-nums text-white02/70">
                                {r.width} × {r.height}, {(EXT[r.type] ?? "image").toUpperCase()}
                              </p>
                              {r.kept && (
                                <p className="mt-1 text-xs text-white02">Already well optimized, so the original is kept.</p>
                              )}
                              {!r.reached && (
                                <p className="mt-1 text-xs text-orange">
                                  Couldn't reach {targetKb} KB. Try a smaller max size.
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="mt-1 text-sm text-white02">Compressing…</p>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {done && (
                            <a
                              href={r.url}
                              download={outputName(it, r)}
                              className={`${smallButton} border-orange text-orange hover:bg-orange hover:text-white`}
                            >
                              <Icon d={ICONS.download} />
                              Download
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={() => removeItem(it.id)}
                            aria-label={`Remove ${it.name}`}
                            className={`${smallButton} border-white/10 text-white02 hover:bg-red-500/10 hover:text-red-300`}
                          >
                            <Icon d={ICONS.remove} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Settings and summary */}
            <div className="order-first min-w-0 space-y-4 lg:order-none lg:col-span-2">
              <Section title="Compression">
                <Segmented
                  label="Compression mode"
                  value={mode}
                  onChange={setMode}
                  options={[
                    { value: "quality", label: "By quality" },
                    { value: "target", label: "Target size" },
                  ]}
                />

                {mode === "quality" ? (
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor={qualityId} className="text-sm text-white02">
                        Quality
                      </label>
                      <span className="text-sm font-semibold tabular-nums">{quality}%</span>
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
                    <p className="mt-2 text-xs text-white02">Around 75 to 85% keeps images looking sharp.</p>
                  </div>
                ) : (
                  <div className="mt-4">
                    <label htmlFor={targetId} className="mb-1.5 block text-sm text-white02">
                      Make each image smaller than
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id={targetId}
                        type="number"
                        inputMode="numeric"
                        min="10"
                        max="20000"
                        value={targetKb}
                        onChange={(e) => setTargetKb(e.target.value)}
                        className={`${fieldClass} tabular-nums`}
                      />
                      <span className="text-sm text-white02">KB</span>
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {TARGET_PRESETS.map((kb) => (
                        <button
                          key={kb}
                          type="button"
                          onClick={() => setTargetKb(kb)}
                          aria-pressed={Number(targetKb) === kb}
                          className={`rounded-lg border px-1 py-2 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange sm:text-sm ${
                            Number(targetKb) === kb
                              ? "border-orange bg-orange/15 text-orange"
                              : "border-white/10 text-white02 hover:bg-white/5"
                          }`}
                        >
                          {kb >= 1000 ? `${kb / 1000} MB` : `${kb} KB`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {lossless && (
                  <p className="mt-3 text-xs text-orange">
                    PNG is lossless, so quality doesn't apply. Choose WebP or JPG, or reduce the max size, to shrink it.
                  </p>
                )}
              </Section>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <Section title="Output format">
                  <Segmented
                    label="Output format"
                    value={format}
                    onChange={setFormat}
                    options={[
                      { value: "same", label: "Original" },
                      { value: "jpeg", label: "JPG" },
                      { value: "webp", label: "WebP" },
                    ]}
                  />
                  {format === "webp" && <p className="mt-2 text-xs text-white02">WebP is usually the smallest.</p>}
                </Section>

                <Section title="Max width or height">
                  <label htmlFor={maxSideId} className="sr-only">
                    Max width or height
                  </label>
                  <select
                    id={maxSideId}
                    value={maxSide}
                    onChange={(e) => setMaxSide(Number(e.target.value))}
                    className={fieldClass}
                  >
                    {MAX_SIDES.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-xs text-white02">Smaller images are never enlarged.</p>
                </Section>
              </div>

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
                      JPG has no transparency, so see-through areas are filled with this color.
                    </label>
                  </div>
                </Section>
              )}

              {/* Summary */}
              <div className="rounded-xl border border-white/10 bg-black01 p-4">
                <h3 className="mb-3 text-sm font-semibold text-white02">Summary</h3>

                {doneItems.length > 0 ? (
                  <>
                    <p className="text-2xl font-bold tabular-nums">
                      {savedPct > 0.5 ? (
                        <span className="text-green-400">−{savedPct.toFixed(0)}%</span>
                      ) : (
                        <span className="text-orange">{savedPct < -0.5 ? `+${Math.abs(savedPct).toFixed(0)}%` : "0%"}</span>
                      )}
                    </p>
                    <p className="mt-1 text-sm tabular-nums text-white02">
                      {formatBytes(originalTotal)} <span aria-hidden="true">→</span>
                      <span className="sr-only">to</span> {formatBytes(newTotal)}
                    </p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                      <div
                        className="h-full rounded-full bg-orange transition-all duration-500"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-white02">Compressing…</p>
                )}

                {busy && doneItems.length > 0 && <p className="mt-2 text-xs text-white02/70">Updating…</p>}
                {anyFallback && (
                  <p className="mt-2 text-xs text-orange">
                    Your browser can't export WebP, so those images were saved as PNG instead.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={downloadAll}
                  disabled={!doneItems.length || busy || zipping}
                  className="btn-primary w-full disabled:pointer-events-none disabled:opacity-60 sm:flex-1"
                >
                  {zipping ? "Creating ZIP…" : items.length > 1 ? "Download all (ZIP)" : "Download"}
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  disabled={zipping}
                  className="btn-secondary w-full disabled:pointer-events-none disabled:opacity-60 sm:flex-1"
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
