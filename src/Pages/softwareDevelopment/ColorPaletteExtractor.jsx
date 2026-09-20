import { useState, useRef, useCallback } from "react";

/**
 * ColorPaletteExtractor
 * A self-contained React + Tailwind CSS component.
 * Upload a logo, photo, or any image — it samples the pixels on a
 * hidden canvas, groups similar colors together, and returns a ranked
 * color palette with hex codes, highlighting the Primary and
 * Secondary colors.
 *
 * Usage: <ColorPaletteExtractor /> — manages its own state internally,
 * so it can be dropped directly into any page. No extra libraries needed.
 */
export default function ColorPaletteExtractor() {
  const [imageSrc, setImageSrc] = useState(null);
  const [palette, setPalette] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedHex, setCopiedHex] = useState(null);
  const [error, setError] = useState("");
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((v) =>
        Math.max(0, Math.min(255, Math.round(v)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
      .toUpperCase();

  const extractPalette = useCallback((img) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Downscale for fast, stable sampling regardless of source size
    const maxDim = 120;
    const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
    const w = Math.max(1, Math.round(img.width * scale));
    const h = Math.max(1, Math.round(img.height * scale));
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    let data;
    try {
      data = ctx.getImageData(0, 0, w, h).data;
    } catch (e) {
      setError(
        "This image couldn't be read (it may be from a restricted source).",
      );
      setIsProcessing(false);
      return;
    }

    const buckets = new Map();
    const bucketSize = 24;

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha < 100) continue; // skip mostly-transparent pixels

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const key =
        Math.round(r / bucketSize) +
        "," +
        Math.round(g / bucketSize) +
        "," +
        Math.round(b / bucketSize);

      const entry = buckets.get(key);
      if (entry) {
        entry.count++;
        entry.r += r;
        entry.g += g;
        entry.b += b;
      } else {
        buckets.set(key, { count: 1, r, g, b });
      }
    }

    const results = Array.from(buckets.values())
      .map((e) => ({
        count: e.count,
        r: e.r / e.count,
        g: e.g / e.count,
        b: e.b / e.count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)
      .map((e) => ({
        hex: rgbToHex(e.r, e.g, e.b),
        rgb: `rgb(${Math.round(e.r)}, ${Math.round(e.g)}, ${Math.round(e.b)})`,
        share: e.count,
      }));

    const totalSamples = results.reduce((sum, c) => sum + c.share, 0) || 1;
    const withPercent = results.map((c) => ({
      ...c,
      percent: Math.round((c.share / totalSamples) * 100),
    }));

    setPalette(withPercent);
    setIsProcessing(false);
  }, []);

  const handleFile = useCallback(
    (file) => {
      if (!file || !file.type.startsWith("image/")) {
        setError("Please upload an image file (PNG, JPG, SVG, WebP, etc).");
        return;
      }
      setError("");
      setIsProcessing(true);
      setPalette([]);

      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target.result;
        setImageSrc(src);
        const img = new Image();
        img.onload = () => extractPalette(img);
        img.onerror = () => {
          setError("This image couldn't be loaded.");
          setIsProcessing(false);
        };
        img.src = src;
      };
      reader.onerror = () => {
        setError("This file couldn't be read.");
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    },
    [extractPalette],
  );

  const onInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const copyToClipboard = (hex) => {
    navigator.clipboard?.writeText(hex).then(() => {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex((cur) => (cur === hex ? null : cur)), 1400);
    });
  };

  const [primary, secondary, ...rest] = palette;

  return (
    <div className="w-full bg-gradient-to-b from-[#0B0D12] to-[#15171E] px-4 py-55 flex items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl shadow-black/40 bg-[#1B1E27] border border-white/5">
        {/* Header */}
        <div className="px-8 py-7 border-b border-white/5">
          <h2 className="text-white text-2xl font-bold m-0 tracking-tight">
            Color Palette Extractor
          </h2>
          <p className="text-[#8A8FA3] text-sm mt-1.5 m-0">
            Upload a logo, photo, or image to pull out its color palette
          </p>
        </div>

        <div className="px-8 pt-7 pb-8">
          {/* Upload zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`rounded-xl border-2 border-dashed px-6 py-8 text-center cursor-pointer transition-colors ${
              isDragging
                ? "border-[#7C5CFC] bg-[#7C5CFC]/10"
                : "border-white/15 hover:border-white/30"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onInputChange}
              className="hidden"
            />
            {imageSrc ? (
              <div className="flex flex-col items-center gap-3">
                <img
                  src={imageSrc}
                  alt="Uploaded preview"
                  className="max-h-32 rounded-lg object-contain"
                />
                <span className="text-[#8A8FA3] text-sm">
                  Click or drop another image to replace it
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7C5CFC"
                  strokeWidth="1.6"
                >
                  <path
                    d="M12 16V4m0 0L7 9m5-5l5 5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-white font-medium">
                  Click to upload or drag an image here
                </span>
                <span className="text-[#8A8FA3] text-xs">
                  PNG, JPG, WebP, or SVG
                </span>
              </div>
            )}
          </div>

          {error && <p className="mt-3 text-sm text-[#F2735C]">{error}</p>}

          {isProcessing && (
            <p className="mt-4 text-sm text-[#8A8FA3]">Analyzing colors…</p>
          )}

          {/* Primary / Secondary highlight */}
          {!isProcessing && (primary || secondary) && (
            <div className="grid grid-cols-2 gap-3.5 mt-6">
              {[
                { label: "Primary color", swatch: primary },
                { label: "Secondary color", swatch: secondary },
              ].map(
                ({ label, swatch }) =>
                  swatch && (
                    <button
                      key={label}
                      onClick={() => copyToClipboard(swatch.hex)}
                      className="text-left rounded-xl overflow-hidden border border-white/10 hover:border-white/25 transition-colors"
                    >
                      <div
                        className="h-16 w-full"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="px-3.5 py-3 bg-[#22252F]">
                        <p className="text-[#8A8FA3] text-xs m-0">{label}</p>
                        <p className="text-white font-mono text-sm font-semibold mt-0.5 m-0">
                          {copiedHex === swatch.hex ? "Copied!" : swatch.hex}
                        </p>
                      </div>
                    </button>
                  ),
              )}
            </div>
          )}

          {/* Full palette */}
          {!isProcessing && rest.length > 0 && (
            <div className="mt-6">
              <p className="text-[#8A8FA3] text-xs font-medium uppercase tracking-wide mb-2.5">
                Full palette
              </p>
              <div className="grid grid-cols-3 gap-3">
                {rest.map((swatch, i) => (
                  <button
                    key={i}
                    onClick={() => copyToClipboard(swatch.hex)}
                    className="rounded-lg overflow-hidden border border-white/10 hover:border-white/25 transition-colors text-left"
                  >
                    <div
                      className="h-12 w-full"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <div className="px-2.5 py-2 bg-[#22252F]">
                      <p className="text-white font-mono text-xs font-semibold m-0">
                        {copiedHex === swatch.hex ? "Copied!" : swatch.hex}
                      </p>
                      <p className="text-[#8A8FA3] text-[10px] mt-0.5 m-0">
                        {swatch.percent}% of image
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 text-[12.5px] text-[#8A8FA3] bg-white/5 rounded-lg px-4 py-3 leading-relaxed">
            Colors are sampled directly in your browser — nothing is uploaded
            anywhere. Click any swatch to copy its hex code.
          </div>
        </div>
      </div>

      {/* Hidden canvas used for pixel sampling */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
