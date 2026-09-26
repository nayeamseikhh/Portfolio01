import { useMemo, useState } from "react";

const CATEGORIES = {
  length: {
    label: "Length",
    units: {
      m: { label: "Meters", factor: 1 },
      km: { label: "Kilometers", factor: 1000 },
      cm: { label: "Centimeters", factor: 0.01 },
      mi: { label: "Miles", factor: 1609.344 },
      ft: { label: "Feet", factor: 0.3048 },
      in: { label: "Inches", factor: 0.0254 },
    },
  },
  weight: {
    label: "Weight",
    units: {
      kg: { label: "Kilograms", factor: 1 },
      g: { label: "Grams", factor: 0.001 },
      lb: { label: "Pounds", factor: 0.45359237 },
      oz: { label: "Ounces", factor: 0.028349523 },
    },
  },
  temperature: {
    label: "Temperature",
    units: {
      c: { label: "Celsius" },
      f: { label: "Fahrenheit" },
      k: { label: "Kelvin" },
    },
  },
};

function convertTemp(value, from, to) {
  let celsius;
  if (from === "c") celsius = value;
  else if (from === "f") celsius = (value - 32) * (5 / 9);
  else celsius = value - 273.15;

  if (to === "c") return celsius;
  if (to === "f") return celsius * (9 / 5) + 32;
  return celsius + 273.15;
}

export default function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("km");
  const [value, setValue] = useState("1");

  const units = CATEGORIES[category].units;

  const result = useMemo(() => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    if (category === "temperature") {
      return convertTemp(num, from, to).toFixed(2);
    }
    const base = num * units[from].factor;
    return (base / units[to].factor).toFixed(6).replace(/\.?0+$/, "");
  }, [value, from, to, category, units]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    const keys = Object.keys(CATEGORIES[cat].units);
    setFrom(keys[0]);
    setTo(keys[1]);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="w-full mt-25 max-w-lg mx-auto bg-black02 border border-white02/10 rounded-xl p-4 sm:p-6 font-poppins">
      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1">
        Unit Converter
      </h2>
      <p className="text-white02 text-sm mb-4">
        Convert length, weight, and temperature units instantly.
      </p>

      <div className="flex gap-2 mb-5 flex-wrap">
        {Object.entries(CATEGORIES).map(([key, c]) => (
          <button
            key={key}
            onClick={() => handleCategoryChange(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              category === key
                ? "bg-orange text-black01 border-orange"
                : "text-white02 border-white02/20 hover:border-orange"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
        <div>
          <label className="text-white02 text-xs uppercase tracking-wide mb-1 block">
            From
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full bg-black01 text-white01 border border-white02/20 rounded-lg p-2.5 text-sm mb-2 focus:outline-none focus:border-orange"
          >
            {Object.entries(units).map(([k, u]) => (
              <option key={k} value={k}>
                {u.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-black01 text-white01 border border-white02/20 rounded-lg p-2.5 text-sm focus:outline-none focus:border-orange"
          />
        </div>

        <button
          onClick={swap}
          className="btn-secondary px-3 py-2 mb-0.5 justify-self-center rotate-90 sm:rotate-0"
          title="Swap units"
        >
          ⇄
        </button>

        <div>
          <label className="text-white02 text-xs uppercase tracking-wide mb-1 block">
            To
          </label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full bg-black01 text-white01 border border-white02/20 rounded-lg p-2.5 text-sm mb-2 focus:outline-none focus:border-orange"
          >
            {Object.entries(units).map(([k, u]) => (
              <option key={k} value={k}>
                {u.label}
              </option>
            ))}
          </select>
          <div className="w-full bg-black01 text-orange border border-orange/40 rounded-lg p-2.5 text-sm font-semibold">
            {result || "0"}
          </div>
        </div>
      </div>
    </div>
  );
}
