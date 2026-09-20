import React, { useMemo, useState } from "react";

const INITIAL_COLORS = [
  { id: 1, color: "#6366F1", position: 0 },
  { id: 2, color: "#EC4899", position: 100 },
];

function createId() {
  return Date.now() + Math.random();
}

export default function GradientGenerator() {
  const [type, setType] = useState("linear");
  const [angle, setAngle] = useState(135);
  const [colors, setColors] = useState(INITIAL_COLORS);

  const gradient = useMemo(() => {
    const stops = [...colors]
      .sort((a, b) => a.position - b.position)
      .map((item) => `${item.color} ${item.position}%`)
      .join(", ");

    if (type === "radial") {
      return `radial-gradient(circle, ${stops})`;
    }

    return `linear-gradient(${angle}deg, ${stops})`;
  }, [type, angle, colors]);

  const tailwindGradient = `bg-[${gradient.replaceAll(" ", "_")}]`;

  const updateColor = (id, field, value) => {
    setColors((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === "position" ? Number(value) : value,
            }
          : item,
      ),
    );
  };

  const addColor = () => {
    const newPosition =
      colors.length > 0
        ? Math.round((colors[colors.length - 1].position + 100) / 2)
        : 50;

    setColors((current) => [
      ...current,
      {
        id: createId(),
        color: "#8B5CF6",
        position: Math.min(newPosition, 100),
      },
    ]);
  };

  const removeColor = (id) => {
    if (colors.length <= 2) return;

    setColors((current) => current.filter((item) => item.id !== id));
  };

  const randomColor = () => {
    const random = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");

    return `#${random}`;
  };

  const randomGradient = () => {
    const first = randomColor();
    const second = randomColor();

    setType("linear");
    setAngle(Math.floor(Math.random() * 361));

    setColors([
      {
        id: createId(),
        color: first,
        position: 0,
      },
      {
        id: createId(),
        color: second,
        position: 100,
      },
    ]);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const resetGradient = () => {
    setType("linear");
    setAngle(135);
    setColors(INITIAL_COLORS);
  };

  return (
    <section className="min-h-screen w-full bg-transparent py-25">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
            CSS & Tailwind Tool
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Gradient Generator
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Create beautiful CSS and Tailwind CSS gradients with live preview
            and copy-ready code.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Controls */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              {/* Gradient Type */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-900">
                  Gradient Type
                </label>

                <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setType("linear")}
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                      type === "linear"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Linear
                  </button>

                  <button
                    type="button"
                    onClick={() => setType("radial")}
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                      type === "radial"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Radial
                  </button>
                </div>
              </div>

              {/* Angle */}
              {type === "linear" && (
                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-900">
                      Angle
                    </label>

                    <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                      {angle}°
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              )}

              {/* Color Stops */}
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      Color Stops
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Customize your gradient colors
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addColor}
                    className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100"
                  >
                    + Add Color
                  </button>
                </div>

                <div className="space-y-3">
                  {colors.map((item, index) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-200 p-3"
                    >
                      <div className="flex items-center gap-3">
                        {/* Color Picker */}
                        <input
                          type="color"
                          value={item.color}
                          onChange={(e) =>
                            updateColor(item.id, "color", e.target.value)
                          }
                          className="h-11 w-11 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                        />

                        {/* Hex */}
                        <input
                          type="text"
                          value={item.color}
                          onChange={(e) =>
                            updateColor(item.id, "color", e.target.value)
                          }
                          className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium uppercase text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeColor(item.id)}
                          disabled={colors.length <= 2}
                          className="rounded-lg px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          ×
                        </button>
                      </div>

                      {/* Position */}
                      <div className="mt-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-medium text-slate-500">
                            Position
                          </span>

                          <span className="text-xs font-semibold text-slate-700">
                            {item.position}%
                          </span>
                        </div>

                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={item.position}
                          onChange={(e) =>
                            updateColor(item.id, "position", e.target.value)
                          }
                          className="w-full accent-indigo-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={randomGradient}
                  className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Random Gradient
                </button>

                <button
                  type="button"
                  onClick={resetGradient}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Right Preview */}
          <div className="space-y-6 lg:col-span-7">
            {/* Preview */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-4">
                <h2 className="font-semibold text-slate-900">Live Preview</h2>

                <p className="mt-1 text-xs text-slate-500">
                  Your gradient updates automatically
                </p>
              </div>

              <div className="p-4 sm:p-6">
                <div
                  className="flex min-h-[320px] items-center justify-center rounded-xl"
                  style={{ background: gradient }}
                >
                  <div className="rounded-2xl bg-black/20 px-6 py-4 text-center backdrop-blur-sm">
                    <p className="text-2xl font-bold text-white drop-shadow">
                      Beautiful Gradient
                    </p>

                    <p className="mt-1 text-sm text-white/80">Live Preview</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CSS Code */}
            <CodeBox
              title="CSS"
              code={`background: ${gradient};`}
              onCopy={() => copyToClipboard(`background: ${gradient};`)}
            />

            {/* Tailwind */}
            <CodeBox
              title="Tailwind CSS"
              code={tailwindGradient}
              onCopy={() => copyToClipboard(tailwindGradient)}
            />

            {/* Full CSS */}
            <CodeBox
              title="Inline Style"
              code={`style={{
  background: "${gradient}"
}}`}
              onCopy={() =>
                copyToClipboard(
                  `style={{
  background: "${gradient}"
}}`,
                )
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeBox({ title, code, onCopy }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <h2 className="font-semibold text-slate-900">{title}</h2>

        <button
          type="button"
          onClick={onCopy}
          className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
        >
          Copy
        </button>
      </div>

      <pre className="overflow-x-auto bg-slate-950 p-5 text-sm leading-6 text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}
