import { useMemo, useState } from "react";

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean.split("").map((c) => c + c).join("")
      : clean;
  const num = parseInt(full, 16);
  if (isNaN(num) || full.length !== 6) return null;
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex({ r, g, b }) {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0"))
      .join("")
  );
}

function rgbToHsl({ r, g, b }) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#e0822d");

  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = useMemo(() => (rgb ? rgbToHsl(rgb) : null), [rgb]);
  const valid = !!rgb;

  const handleRgbChange = (key, value) => {
    if (!rgb) return;
    const num = Math.max(0, Math.min(255, Number(value) || 0));
    setHex(rgbToHex({ ...rgb, [key]: num }));
  };

  const copy = async (value) => {
    await navigator.clipboard.writeText(value);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black02 border border-white02/10 rounded-xl p-4 sm:p-6 font-poppins">
      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1">
        Color Converter
      </h2>
      <p className="text-white02 text-sm mb-4">
        Convert between HEX, RGB, and HSL in real time.
      </p>

      <div
        className="w-full h-24 rounded-lg mb-5 border border-white02/20"
        style={{ backgroundColor: valid ? hex : "#000" }}
      />

      <div className="space-y-4">
        <div>
          <label className="text-white02 text-xs uppercase tracking-wide mb-1 block">
            HEX
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className={`flex-1 bg-black01 text-white01 border rounded-lg p-2.5 text-sm font-mono focus:outline-none focus:border-orange ${
                valid ? "border-white02/20" : "border-red-500/50"
              }`}
            />
            <input
              type="color"
              value={valid ? hex : "#000000"}
              onChange={(e) => setHex(e.target.value)}
              className="w-11 h-11 rounded-lg border border-white02/20 bg-black01 cursor-pointer"
            />
          </div>
        </div>

        {valid && (
          <>
            <div>
              <label className="text-white02 text-xs uppercase tracking-wide mb-1 block">
                RGB
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["r", "g", "b"].map((k) => (
                  <input
                    key={k}
                    type="number"
                    min={0}
                    max={255}
                    value={rgb[k]}
                    onChange={(e) => handleRgbChange(k, e.target.value)}
                    className="bg-black01 text-white01 border border-white02/20 rounded-lg p-2.5 text-sm font-mono text-center focus:outline-none focus:border-orange"
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-white02 text-xs uppercase tracking-wide mb-1 block">
                HSL
              </label>
              <button
                onClick={() =>
                  copy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)
                }
                className="w-full text-left bg-black01 text-white01 border border-white02/20 rounded-lg p-2.5 text-sm font-mono hover:border-orange transition-colors"
                title="Click to copy"
              >
                hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
