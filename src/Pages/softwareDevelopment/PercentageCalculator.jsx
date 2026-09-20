import { useId, useState } from "react";

/* ----------------------------- Helpers ------------------------------ */

const toNumber = (value) => (value.trim() === "" ? NaN : Number(value));

const fmt = (n) => n.toLocaleString("en-US", { maximumFractionDigits: 4 });

const EMPTY = { main: "—", note: "Enter both values to see the result." };

const error = (message) => ({ main: "—", note: message });

/* --------------------------- Small pieces --------------------------- */

function Field({ label, suffix, value, onChange, placeholder = "0" }) {
  const id = useId();

  return (
    <div className="min-w-0 flex-1">
      <label htmlFor={id} className="mb-1.5 block text-sm text-gray-400">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-white/10 bg-[#1A1A1D] px-3 py-2.5 pr-8 text-base tabular-nums text-white placeholder:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function Card({ title, result, children }) {
  const tone =
    result.tone === "up"
      ? "text-emerald-400"
      : result.tone === "down"
      ? "text-rose-400"
      : "text-amber-400";

  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-[#0E0E10] p-4 sm:p-5">
      <h3 className="text-base font-semibold text-white">{title}</h3>

      <div className="mt-4 space-y-3">{children}</div>

      <div
        className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4"
        aria-live="polite"
      >
        <p className={`break-words text-2xl font-bold tabular-nums ${tone}`}>
          {result.main}
        </p>
        <p className="mt-1 text-sm text-gray-400">{result.note}</p>
      </div>
    </div>
  );
}

/* --------------------------- Calculators ---------------------------- */

// What is X% of Y?
function PercentOf() {
  const [percent, setPercent] = useState("");
  const [value, setValue] = useState("");

  const p = toNumber(percent);
  const v = toNumber(value);

  const result =
    isNaN(p) || isNaN(v)
      ? EMPTY
      : { main: fmt((v * p) / 100), note: `${fmt(p)}% of ${fmt(v)}` };

  return (
    <Card title="What is X% of Y?" result={result}>
      <div className="flex gap-3">
        <Field label="Percentage" suffix="%" value={percent} onChange={setPercent} />
        <Field label="Of value" value={value} onChange={setValue} />
      </div>
    </Card>
  );
}

// X is what percent of Y?
function WhatPercent() {
  const [part, setPart] = useState("");
  const [whole, setWhole] = useState("");

  const x = toNumber(part);
  const y = toNumber(whole);

  let result = EMPTY;
  if (!isNaN(x) && !isNaN(y)) {
    result =
      y === 0
        ? error("The total value can't be zero.")
        : {
            main: `${fmt((x / y) * 100)}%`,
            note: `${fmt(x)} is ${fmt((x / y) * 100)}% of ${fmt(y)}`,
          };
  }

  return (
    <Card title="X is what percent of Y?" result={result}>
      <div className="flex gap-3">
        <Field label="Value" value={part} onChange={setPart} />
        <Field label="Total" value={whole} onChange={setWhole} />
      </div>
    </Card>
  );
}

// Percentage change from X to Y
function PercentChange() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const a = toNumber(from);
  const b = toNumber(to);

  let result = EMPTY;
  if (!isNaN(a) && !isNaN(b)) {
    if (a === 0) {
      result = error("The starting value can't be zero.");
    } else {
      const change = ((b - a) / Math.abs(a)) * 100;
      const label = change > 0 ? "Increase" : change < 0 ? "Decrease" : "No change";
      result = {
        main: `${change > 0 ? "+" : ""}${fmt(change)}%`,
        note: `${label} from ${fmt(a)} to ${fmt(b)}`,
        tone: change > 0 ? "up" : change < 0 ? "down" : undefined,
      };
    }
  }

  return (
    <Card title="Percentage change" result={result}>
      <div className="flex gap-3">
        <Field label="From" value={from} onChange={setFrom} />
        <Field label="To" value={to} onChange={setTo} />
      </div>
    </Card>
  );
}

// Add or subtract a percentage (discount, tax, markup…)
function AddSubtract() {
  const [value, setValue] = useState("");
  const [percent, setPercent] = useState("");
  const [mode, setMode] = useState("increase");

  const v = toNumber(value);
  const p = toNumber(percent);

  let result = EMPTY;
  if (!isNaN(v) && !isNaN(p)) {
    const amount = (v * p) / 100;
    const isIncrease = mode === "increase";
    const final = isIncrease ? v + amount : v - amount;
    const sign = isIncrease ? "+" : "-";

    result = {
      main: fmt(final),
      note: `${fmt(v)} ${sign} ${fmt(p)}% (${sign}${fmt(amount)})`,
    };
  }

  return (
    <Card title="Increase or decrease by a percentage" result={result}>
      <div
        role="radiogroup"
        aria-label="Increase or decrease"
        className="grid grid-cols-2 gap-1 rounded-lg bg-[#1A1A1D] p-1"
      >
        {[
          { id: "increase", label: "Increase" },
          { id: "decrease", label: "Decrease" },
        ].map((option) => {
          const active = option.id === mode;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setMode(option.id)}
              className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                active ? "bg-amber-500 text-black" : "text-gray-300 hover:bg-white/5"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Field label="Value" value={value} onChange={setValue} />
        <Field label="Percentage" suffix="%" value={percent} onChange={setPercent} />
      </div>
    </Card>
  );
}

/* ---------------------------- Component ----------------------------- */

export default function PercentageCalculator() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 text-white">
      <div className="rounded-2xl border border-white/10 bg-[#1A1A1D] p-4 sm:p-6 lg:p-8">
        <header className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Percentage Calculator
          </h2>
          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Pick the calculator that matches your question and type in the
            numbers. Results update as you type.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <PercentOf />
          <WhatPercent />
          <PercentChange />
          <AddSubtract />
        </div>
      </div>
    </section>
  );
}
