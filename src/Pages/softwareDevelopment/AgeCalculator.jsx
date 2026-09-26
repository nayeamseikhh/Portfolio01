import { useState } from "react";

function diffYMD(from, to) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!birthDate) return;
    const from = new Date(birthDate);
    const now = new Date();
    if (from > now) {
      setResult({ error: "Birth date can't be in the future." });
      return;
    }

    const { years, months, days } = diffYMD(from, now);
    const totalDays = Math.floor((now - from) / (1000 * 60 * 60 * 24));

    let next = new Date(now.getFullYear(), from.getMonth(), from.getDate());
    if (next < now)
      next = new Date(now.getFullYear() + 1, from.getMonth(), from.getDate());
    const daysToNext = Math.ceil((next - now) / (1000 * 60 * 60 * 24));

    setResult({ years, months, days, totalDays, daysToNext });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black02 border border-white02/10 rounded-xl p-4  mt-20 sm:p-6 font-poppins">
      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1">
        Age Calculator
      </h2>
      <p className="text-white02 text-sm mb-4">
        Find your exact age and days until your next birthday.
      </p>

      <label className="text-white02 text-xs uppercase tracking-wide mb-1 block">
        Date of birth
      </label>
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        max={new Date().toISOString().split("T")[0]}
        className="w-full bg-black01 text-white01 border border-white02/20 rounded-lg p-3 text-sm mb-4 focus:outline-none focus:border-orange"
      />

      <button onClick={calculate} className="btn-primary w-full mb-5">
        Calculate Age
      </button>

      {result?.error && (
        <p className="text-red-400 text-sm text-center">{result.error}</p>
      )}

      {result && !result.error && (
        <div className="grid grid-cols-3 gap-3 text-center mb-4">
          {[
            ["Years", result.years],
            ["Months", result.months],
            ["Days", result.days],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-black01 border border-white02/20 rounded-lg py-3"
            >
              <p className="text-2xl font-semibold text-orange">{value}</p>
              <p className="text-white02 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      )}

      {result && !result.error && (
        <div className="text-center text-white02 text-sm space-y-1">
          <p>
            Total days lived:{" "}
            <span className="text-white01">
              {result.totalDays.toLocaleString()}
            </span>
          </p>
          <p>
            Next birthday in:{" "}
            <span className="text-white01">{result.daysToNext} days</span>
          </p>
        </div>
      )}
    </div>
  );
}
