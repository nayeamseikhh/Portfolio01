import { useEffect, useId, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 *  Stopwatch & Countdown Timer
 *  - Stopwatch with laps (best and worst lap highlighted)
 *  - Countdown timer with presets, a progress ring, and an alarm sound
 *  Both keep running while you switch between the two tabs.
 *
 *  Styled with the portfolio's index.css tokens (Tailwind v4):
 *  bg-black01 / bg-black02 / text-orange / text-white02,
 *  custom breakpoints (sm 576, lg 992) and .btn-primary / .btn-secondary.
 * ------------------------------------------------------------------ */

/* ------------------------------ Helpers ----------------------------- */

const pad = (n, length = 2) => String(n).padStart(length, "0");

function splitTime(ms) {
  const cs = Math.floor(ms / 10);
  return {
    h: Math.floor(cs / 360000),
    m: Math.floor(cs / 6000) % 60,
    s: Math.floor(cs / 100) % 60,
    cs: cs % 100,
  };
}

function formatStopwatch(ms) {
  const { h, m, s, cs } = splitTime(ms);
  return `${h > 0 ? `${pad(h)}:` : ""}${pad(m)}:${pad(s)}.${pad(cs)}`;
}

function formatCountdown(ms, forceHours) {
  const total = Math.ceil(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor(total / 60) % 60;
  const s = total % 60;
  return `${h > 0 || forceHours ? `${pad(h)}:` : ""}${pad(m)}:${pad(s)}`;
}

const PRESETS = [
  { label: "1 min", seconds: 60 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
  { label: "15 min", seconds: 900 },
  { label: "25 min", seconds: 1500 },
  { label: "1 hour", seconds: 3600 },
];

/* --------------------------- Small pieces --------------------------- */

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
    >
      <span className="text-sm text-white02">{label}</span>
      <span
        aria-hidden="true"
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-orange" : "bg-white/15"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${checked ? "left-[22px]" : "left-0.5"}`}
        />
      </span>
    </button>
  );
}

function Stage({ children }) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-xl border border-white/10 bg-black01 p-5 sm:gap-8 sm:p-8">
      {children}
    </div>
  );
}

function Panel({ title, right, children }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-black01 p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white02">{title}</h3>
        {right}
      </div>
      {children}
    </div>
  );
}

const actionDisabled = "disabled:pointer-events-none disabled:opacity-50";

/* ----------------------------- Stopwatch ---------------------------- */

function StopwatchPanel() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState([]); // newest first: { n, split, total }

  const startRef = useRef(0); // performance.now() when the current run began
  const baseRef = useRef(0); // time collected before the current run
  const lastLapRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    const tick = () => {
      setElapsed(baseRef.current + performance.now() - startRef.current);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const now = () =>
    running
      ? baseRef.current + performance.now() - startRef.current
      : baseRef.current;

  function start() {
    startRef.current = performance.now();
    setRunning(true);
  }

  function pause() {
    baseRef.current += performance.now() - startRef.current;
    setElapsed(baseRef.current);
    setRunning(false);
  }

  function reset() {
    baseRef.current = 0;
    lastLapRef.current = 0;
    setElapsed(0);
    setLaps([]);
    setRunning(false);
  }

  function lap() {
    const total = now();
    const split = total - lastLapRef.current;
    lastLapRef.current = total;
    setLaps((prev) => [{ n: prev.length + 1, split, total }, ...prev]);
  }

  const { h, m, s, cs } = splitTime(elapsed);
  const splits = laps.map((l) => l.split);
  const best = laps.length > 1 ? Math.min(...splits) : null;
  const worst = laps.length > 1 ? Math.max(...splits) : null;

  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
      <Stage>
        <p
          role="timer"
          aria-label={`Stopwatch ${formatStopwatch(elapsed)}`}
          className="flex items-baseline justify-center tabular-nums"
        >
          <span className="text-5xl font-semibold sm:text-6xl lg:text-7xl">
            {h > 0 && `${pad(h)}:`}
            {pad(m)}:{pad(s)}
          </span>
          <span className="ml-1 text-2xl font-medium text-orange sm:text-3xl lg:text-4xl">
            .{pad(cs)}
          </span>
        </p>

        <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={running ? pause : start}
            className={`btn-primary col-span-2 sm:col-span-1 ${actionDisabled}`}
          >
            {running ? "Pause" : elapsed > 0 ? "Resume" : "Start"}
          </button>
          <button
            type="button"
            onClick={lap}
            disabled={!running}
            className={`btn-secondary ${actionDisabled}`}
          >
            Lap
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={elapsed === 0 && !running}
            className={`btn-secondary ${actionDisabled}`}
          >
            Reset
          </button>
        </div>
      </Stage>

      <Panel
        title="Laps"
        right={
          <span className="text-xs text-white02">{laps.length} recorded</span>
        }
      >
        {laps.length === 0 ? (
          <p className="py-8 text-center text-sm text-white02">
            Press Lap while the stopwatch is running to record split times.
          </p>
        ) : (
          <div className="max-h-72 overflow-y-auto pr-1">
            <div className="sticky top-0 grid grid-cols-[3rem_1fr_1fr] gap-2 bg-black01 pb-2 text-xs text-white02">
              <span>Lap</span>
              <span className="text-right">Split</span>
              <span className="text-right">Total</span>
            </div>
            <ul className="divide-y divide-white/10">
              {laps.map((l) => {
                const isBest = best !== null && l.split === best;
                const isWorst =
                  worst !== null && l.split === worst && worst !== best;
                return (
                  <li
                    key={l.n}
                    className="grid grid-cols-[3rem_1fr_1fr] gap-2 py-2 text-sm tabular-nums sm:text-base"
                  >
                    <span className="text-white02">{l.n}</span>
                    <span
                      className={`text-right font-semibold ${
                        isBest
                          ? "text-green-400"
                          : isWorst
                            ? "text-red-400"
                            : "text-white"
                      }`}
                    >
                      {formatStopwatch(l.split)}
                      {isBest && <span className="sr-only"> (best lap)</span>}
                      {isWorst && (
                        <span className="sr-only"> (slowest lap)</span>
                      )}
                    </span>
                    <span className="text-right text-white02">
                      {formatStopwatch(l.total)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </Panel>
    </div>
  );
}

/* ------------------------------- Timer ------------------------------ */

const RING_RADIUS = 90;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

function TimerPanel() {
  const hoursId = useId();
  const minutesId = useId();
  const secondsId = useId();

  const [fields, setFields] = useState({ h: "0", m: "5", s: "0" });
  const [status, setStatus] = useState("idle"); // idle | running | paused | finished
  const [remaining, setRemaining] = useState(0);
  const [total, setTotal] = useState(0);
  const [sound, setSound] = useState(true);
  const [hint, setHint] = useState("");

  const endRef = useRef(0);
  const audioRef = useRef(null);
  const beepsRef = useRef([]);

  const inputMs =
    ((Number(fields.h) || 0) * 3600 +
      (Number(fields.m) || 0) * 60 +
      (Number(fields.s) || 0)) *
    1000;

  const idle = status === "idle";
  const locked = status === "running" || status === "paused";
  const shownRemaining = idle ? inputMs : remaining;
  const shownTotal = idle ? inputMs : total;
  const progress =
    shownTotal > 0 ? Math.max(0, Math.min(1, shownRemaining / shownTotal)) : 1;

  /* ---- Alarm ---- */
  function stopAlarm() {
    beepsRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        /* already stopped */
      }
    });
    beepsRef.current = [];
    if (navigator.vibrate) navigator.vibrate(0);
  }

  function playAlarm() {
    if (navigator.vibrate) navigator.vibrate([300, 150, 300, 150, 300]);
    const ctx = audioRef.current;
    if (!ctx) return;

    for (let i = 0; i < 6; i += 1) {
      const t = ctx.currentTime + i * 0.6;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = i % 2 ? 660 : 880;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.35, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.5);
      beepsRef.current.push(osc);
    }
  }

  // Browsers only allow sound after a click or tap, so it is prepared in start()
  function prepareAudio() {
    if (!sound) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!audioRef.current) audioRef.current = new Ctx();
    if (audioRef.current.state === "suspended") audioRef.current.resume();
  }

  useEffect(
    () => () => {
      stopAlarm();
      if (audioRef.current) audioRef.current.close();
    },
    [],
  );

  /* ---- Ticking ---- */
  useEffect(() => {
    if (status !== "running") return;

    const id = setInterval(() => {
      const left = endRef.current - Date.now();
      if (left <= 0) {
        setRemaining(0);
        setStatus("finished");
        if (sound) playAlarm();
      } else {
        setRemaining(left);
      }
    }, 100);

    return () => clearInterval(id);
  }, [status, sound]);

  /* ---- Actions ---- */
  function start() {
    prepareAudio();
    stopAlarm();

    if (status === "paused") {
      endRef.current = Date.now() + remaining;
    } else {
      if (inputMs <= 0) {
        setHint("Set a time first.");
        return;
      }
      setHint("");
      setTotal(inputMs);
      setRemaining(inputMs);
      endRef.current = Date.now() + inputMs;
    }
    setStatus("running");
  }

  function pause() {
    setRemaining(Math.max(0, endRef.current - Date.now()));
    setStatus("paused");
  }

  function reset() {
    stopAlarm();
    setHint("");
    setStatus("idle");
  }

  function changeField(key, raw, max) {
    const digits = raw.replace(/\D/g, "").slice(0, 2);
    const value = digits === "" ? "" : String(Math.min(max, Number(digits)));
    setFields((prev) => ({ ...prev, [key]: value }));
    setHint("");
  }

  function applyPreset(seconds) {
    setFields({
      h: String(Math.floor(seconds / 3600)),
      m: String(Math.floor(seconds / 60) % 60),
      s: String(seconds % 60),
    });
    setHint("");
  }

  const finished = status === "finished";
  const timeText = finished
    ? "00:00"
    : formatCountdown(shownRemaining, shownTotal >= 3600000);
  const statusText = {
    idle: "Ready",
    running: "Running",
    paused: "Paused",
    finished: "Time's up!",
  }[status];

  const fieldClass =
    "w-full rounded-lg border border-white/10 bg-black02 px-2 py-3 text-center text-2xl font-semibold tabular-nums text-white placeholder:text-white02/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange disabled:opacity-50";

  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
      <Stage>
        <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
          <svg
            viewBox="0 0 200 200"
            className="block h-auto w-full -rotate-90"
            aria-hidden="true"
          >
            <circle
              cx="100"
              cy="100"
              r={RING_RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="10"
            />
            <circle
              cx="100"
              cy="100"
              r={RING_RADIUS}
              fill="none"
              stroke="#e0822d"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={RING_LENGTH}
              strokeDashoffset={RING_LENGTH * (1 - progress)}
              className={finished ? "animate-pulse" : ""}
              style={{ transition: "stroke-dashoffset 0.15s linear" }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p
              role="timer"
              aria-label={`Countdown ${timeText}`}
              className={`text-4xl font-semibold tabular-nums sm:text-5xl ${finished ? "animate-pulse text-orange" : ""}`}
            >
              {timeText}
            </p>
            <p
              role="status"
              className={`mt-1 text-sm ${finished ? "font-semibold text-orange" : "text-white02"}`}
            >
              {statusText}
            </p>
          </div>
        </div>

        <div className="grid w-full max-w-md grid-cols-2 gap-3">
          {status === "running" ? (
            <button type="button" onClick={pause} className="btn-primary">
              Pause
            </button>
          ) : (
            <button type="button" onClick={start} className="btn-primary">
              {status === "paused" ? "Resume" : finished ? "Restart" : "Start"}
            </button>
          )}
          <button
            type="button"
            onClick={reset}
            disabled={idle}
            className={`btn-secondary ${actionDisabled}`}
          >
            Reset
          </button>
        </div>
      </Stage>

      <Panel title="Set the timer">
        <div className="grid grid-cols-3 gap-3">
          {[
            { key: "h", id: hoursId, label: "Hours", max: 99 },
            { key: "m", id: minutesId, label: "Minutes", max: 59 },
            { key: "s", id: secondsId, label: "Seconds", max: 59 },
          ].map((f) => (
            <div key={f.key} className="min-w-0">
              <label
                htmlFor={f.id}
                className="mb-1.5 block text-center text-xs text-white02 sm:text-sm"
              >
                {f.label}
              </label>
              <input
                id={f.id}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                placeholder="0"
                value={fields[f.key]}
                disabled={locked}
                onChange={(e) => changeField(f.key, e.target.value, f.max)}
                onFocus={(e) => e.target.select()}
                className={fieldClass}
              />
            </div>
          ))}
        </div>

        {hint && (
          <p role="alert" className="mt-3 text-sm text-orange">
            {hint}
          </p>
        )}

        <p className="mb-2 mt-5 text-xs text-white02">Quick presets</p>
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map((p) => {
            const active = inputMs === p.seconds * 1000;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPreset(p.seconds)}
                disabled={locked}
                aria-pressed={active}
                className={`rounded-lg border px-2 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange disabled:cursor-not-allowed disabled:opacity-50 ${
                  active
                    ? "border-orange bg-orange/15 text-orange"
                    : "border-white/10 text-white02 hover:bg-white/5"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <Switch
            checked={sound}
            onChange={setSound}
            label="Alarm sound and vibration"
          />
        </div>
      </Panel>
    </div>
  );
}

/* ---------------------------- Component ----------------------------- */

export default function TimerTools() {
  const [tab, setTab] = useState("stopwatch");

  const tabs = [
    { id: "stopwatch", label: "Stopwatch" },
    { id: "timer", label: "Timer" },
  ];

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-25 text-white">
      <div className="rounded-2xl border border-white/10 bg-black02 p-4 sm:p-6 lg:p-8">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Stopwatch <span className="text-orange">&amp;</span> Timer
            </h2>
            <p className="mt-1 text-sm text-white02">
              Both keep running while you switch tabs.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Tool"
            className="grid grid-cols-2 gap-1 rounded-lg border border-white/10 bg-black01 p-1 sm:w-64"
          >
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`timer-tools-tab-${t.id}`}
                  aria-selected={active}
                  aria-controls={`timer-tools-panel-${t.id}`}
                  onClick={() => setTab(t.id)}
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange ${
                    active
                      ? "bg-orange text-white"
                      : "text-white02 hover:bg-white/5"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </header>

        {/* Both panels stay mounted, so a running stopwatch or timer is never lost */}
        <div
          role="tabpanel"
          id="timer-tools-panel-stopwatch"
          aria-labelledby="timer-tools-tab-stopwatch"
          hidden={tab !== "stopwatch"}
        >
          <StopwatchPanel />
        </div>
        <div
          role="tabpanel"
          id="timer-tools-panel-timer"
          aria-labelledby="timer-tools-tab-timer"
          hidden={tab !== "timer"}
        >
          <TimerPanel />
        </div>
      </div>
    </section>
  );
}
