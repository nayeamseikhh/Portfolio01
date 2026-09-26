import { useEffect, useRef, useState } from "react";

const MODES = {
  focus: { label: "Focus", minutes: 25 },
  short: { label: "Short Break", minutes: 5 },
  long: { label: "Long Break", minutes: 15 },
};

export default function PomodoroTimer() {
  const [mode, setMode] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(MODES.focus.minutes * 60);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef(null);

  const totalSeconds = MODES[mode].minutes * 60;

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          if (mode === "focus") {
            const nextCycles = cycles + 1;
            setCycles(nextCycles);
            const nextMode = nextCycles % 4 === 0 ? "long" : "short";
            setMode(nextMode);
            return MODES[nextMode].minutes * 60;
          }
          setMode("focus");
          return MODES.focus.minutes * 60;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, mode, cycles]);

  const switchMode = (key) => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setMode(key);
    setSecondsLeft(MODES[key].minutes * 60);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setSecondsLeft(MODES[mode].minutes * 60);
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const progress = 1 - secondsLeft / totalSeconds;
  const circumference = 2 * Math.PI * 90;

  return (
    <div className="w-full max-w-sm mx-auto bg-black02 border border-white02/10 rounded-xl p-4 sm:p-6 font-poppins text-center">
      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1">
        Pomodoro Timer
      </h2>
      <p className="text-white02 text-sm mb-5">
        Stay focused with timed work and break sessions.
      </p>

      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {Object.entries(MODES).map(([key, m]) => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              mode === key
                ? "bg-orange text-black01 border-orange"
                : "text-white02 border-white02/20 hover:border-orange"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="relative w-56 h-56 mx-auto mb-6">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            className="text-white02/10"
            strokeWidth="10"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#e0822d"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-semibold text-white01 tabular-nums">
            {mm}:{ss}
          </span>
          <span className="text-white02 text-xs mt-1">
            Cycle {cycles + 1}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          className="btn-primary px-6"
        >
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={reset} className="btn-secondary px-6">
          Reset
        </button>
      </div>
    </div>
  );
}
