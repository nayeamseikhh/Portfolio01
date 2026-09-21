import { useEffect, useId, useMemo, useState } from "react";

/* ------------------------------------------------------------------ *
 *  Weather Dashboard
 *  Live data from Open-Meteo (free, no API key): https://open-meteo.com
 *  Needs only React + Tailwind CSS.
 * ------------------------------------------------------------------ */

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const STORAGE_KEY = "weather-dashboard:place";

/* ------------------------------ Themes ------------------------------ */

const THEMES = {
  day: {
    bg: "bg-gradient-to-b from-sky-400 via-blue-600 to-blue-900 pt-25",
    bgRain: "bg-gradient-to-b from-blue-600 via-blue-800 to-slate-900",
    text: "text-white",
    muted: "text-sky-100/80",
    accent: "text-amber-300",
    card: "border-white/20 bg-white/10",
    field: "border-white/25 bg-white/10 placeholder:text-sky-100/60",
    active: "bg-white text-blue-800",
    idle: "text-sky-50 hover:bg-white/15",
    ring: "focus-visible:ring-white",
    shadow: "shadow-2xl shadow-blue-950/50",
    menu: "border-white/20 bg-blue-950/95",
    tile: "bg-black/15",
    drop: "rgba(219,234,254,0.9)",
    glow: "0 2px 14px rgba(15,23,42,0.35)",
    bar: "linear-gradient(90deg,#7dd3fc,#fcd34d)",
  },
  night: {
    bg: "bg-gradient-to-b from-[#020604] via-[#03120a] to-[#010402] pt-25",
    bgRain: "bg-gradient-to-b from-[#020604] via-[#03120a] to-[#010402]",
    text: "text-emerald-200",
    muted: "text-emerald-300/70",
    accent: "text-emerald-300",
    card: "border-emerald-400/25 bg-emerald-400/5",
    field:
      "border-emerald-400/30 bg-emerald-400/5 placeholder:text-emerald-300/50",
    active: "bg-emerald-400 text-black",
    idle: "text-emerald-200 hover:bg-emerald-400/10",
    ring: "focus-visible:ring-emerald-400",
    shadow: "shadow-2xl shadow-emerald-950/60",
    menu: "border-emerald-400/30 bg-[#03120a]",
    tile: "bg-emerald-400/5 ",
    drop: "rgba(110,231,183,0.85)",
    glow: "0 0 16px rgba(52,211,153,0.55)",
    bar: "linear-gradient(90deg,#059669,#6ee7b7)",
  },
};

/* --------------------------- Weather codes -------------------------- */

const CODES = {
  0: ["Clear sky", "clear"],
  1: ["Mainly clear", "clear"],
  2: ["Partly cloudy", "partly"],
  3: ["Overcast", "cloudy"],
  45: ["Fog", "fog"],
  48: ["Freezing fog", "fog"],
  51: ["Light drizzle", "rain"],
  53: ["Drizzle", "rain"],
  55: ["Heavy drizzle", "rain"],
  56: ["Freezing drizzle", "rain"],
  57: ["Freezing drizzle", "rain"],
  61: ["Light rain", "rain"],
  63: ["Rain", "rain"],
  65: ["Heavy rain", "rain"],
  66: ["Freezing rain", "rain"],
  67: ["Freezing rain", "rain"],
  71: ["Light snow", "snow"],
  73: ["Snow", "snow"],
  75: ["Heavy snow", "snow"],
  77: ["Snow grains", "snow"],
  80: ["Light showers", "rain"],
  81: ["Showers", "rain"],
  82: ["Heavy showers", "rain"],
  85: ["Snow showers", "snow"],
  86: ["Heavy snow showers", "snow"],
  95: ["Thunderstorm", "storm"],
  96: ["Thunderstorm with hail", "storm"],
  99: ["Thunderstorm with hail", "storm"],
};

function describe(code) {
  const [label, kind] = CODES[code] ?? ["Unknown", "cloudy"];
  return { label, kind };
}

function rainDropCount(code) {
  if ([51, 53, 56, 61, 80].includes(code)) return 45; // light
  if ([65, 67, 82, 95, 96, 99].includes(code)) return 120; // heavy
  return 80;
}

/* ------------------------------ Helpers ----------------------------- */

const isAbort = (e) => e?.name === "AbortError";

// Times from Open-Meteo look like "2026-09-20T14:15" (already in the city's local time)
function to12h(iso) {
  const h = Number(iso.slice(11, 13));
  return `${h % 12 || 12}:${iso.slice(14, 16)} ${h >= 12 ? "PM" : "AM"}`;
}

function hourLabel(iso) {
  const h = Number(iso.slice(11, 13));
  return `${h % 12 || 12} ${h >= 12 ? "PM" : "AM"}`;
}

function dateFrom(iso) {
  return new Date(`${iso.slice(0, 10)}T12:00:00`);
}

const COMPASS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
const compass = (deg) => COMPASS[Math.round(deg / 45) % 8];

function uvLabel(uv) {
  if (uv < 3) return "Low";
  if (uv < 6) return "Moderate";
  if (uv < 8) return "High";
  if (uv < 11) return "Very high";
  return "Extreme";
}

// Small deterministic "random" so the raindrops stay stable between renders
function rnd(i, k) {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

async function geocode(name, signal) {
  const url = `${GEO_URL}?name=${encodeURIComponent(name)}&count=5&language=en&format=json`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error("Search failed");
  const json = await res.json();
  return (json.results ?? []).map((r) => ({
    name: r.name,
    region: [r.admin1, r.country].filter(Boolean).join(", "),
    latitude: r.latitude,
    longitude: r.longitude,
  }));
}

async function fetchForecast(place, signal) {
  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m",
    hourly: "temperature_2m,precipitation_probability,weather_code,is_day",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max",
    timezone: "auto",
    forecast_days: 7,
    wind_speed_unit: "kmh",
  });
  const res = await fetch(`${FORECAST_URL}?${params}`, { signal });
  if (!res.ok) throw new Error("Forecast failed");
  return res.json();
}

/* ------------------------------- Icons ------------------------------ */

const CLOUD = "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z";
const CLOUD_TOP = "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242";

function WeatherIcon({
  kind,
  isDay = true,
  className = "h-8 w-8",
  accent = "",
}) {
  const svg = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  switch (kind) {
    case "clear":
      return isDay ? (
        <svg {...svg} className={`${className} ${accent}`}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg {...svg} className={`${className} ${accent}`}>
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      );
    case "partly":
      return isDay ? (
        <svg {...svg} className={className}>
          <path
            className={accent}
            d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41M15.947 12.65a4 4 0 0 0-5.925-4.128"
          />
          <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
        </svg>
      ) : (
        <svg {...svg} className={className}>
          <path
            className={accent}
            d="M10.1 9A6 6 0 0 1 16 4a4.24 4.24 0 0 0 6 6 6 6 0 0 1-3 5.197"
          />
          <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
        </svg>
      );
    case "rain":
      return (
        <svg {...svg} className={className}>
          <path d={CLOUD_TOP} />
          <path d="M16 14v6M8 14v6M12 16v6" />
        </svg>
      );
    case "snow":
      return (
        <svg {...svg} className={className}>
          <path d={CLOUD_TOP} />
          <path
            strokeWidth="2.4"
            d="M8 15h.01M8 19h.01M12 17h.01M12 21h.01M16 15h.01M16 19h.01"
          />
        </svg>
      );
    case "storm":
      return (
        <svg {...svg} className={className}>
          <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
          <path d="m13 12-3 5h4l-3 5" />
        </svg>
      );
    case "fog":
      return (
        <svg {...svg} className={className}>
          <path d={CLOUD_TOP} />
          <path d="M16 17H7M17 21H9" />
        </svg>
      );
    default:
      return (
        <svg {...svg} className={className}>
          <path d={CLOUD} />
        </svg>
      );
  }
}

function SmallIcon({ d, extra, className = "h-4 w-4" }) {
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
      {extra}
    </svg>
  );
}

/* ----------------------------- Rain layer --------------------------- */

function RainLayer({ count, color }) {
  const drops = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: rnd(i, 1) * 100,
        height: 14 + rnd(i, 2) * 24,
        duration: 0.6 + rnd(i, 3) * 0.7,
        delay: -rnd(i, 4) * 2,
        opacity: 0.25 + rnd(i, 5) * 0.55,
      })),
    [count],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {drops.map((d, i) => (
        <span
          key={i}
          className="wd-drop absolute block rounded-full"
          style={{
            left: `${d.left}%`,
            top: "-10%",
            width: 2,
            height: d.height,
            opacity: d.opacity,
            background: `linear-gradient(to bottom, transparent, ${color})`,
            transform: "rotate(10deg)",
            animation: `wd-fall ${d.duration}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* --------------------------- Small components ----------------------- */

function Segmented({ label, options, value, onChange, theme }) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`flex rounded-lg border p-0.5 ${theme.card}`}
    >
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 ${theme.ring} ${
              active ? theme.active : theme.idle
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Panel({ title, theme, className = "", children }) {
  return (
    <section
      className={`rounded-2xl border p-4 backdrop-blur-md sm:p-5 shadow-xl shadow-black/20 ${theme.card} ${className}`}
    >
      {title && (
        <h3 className={`mb-3 text-sm font-semibold ${theme.muted}`}>{title}</h3>
      )}
      {children}
    </section>
  );
}

function Stat({ label, value, sub, theme }) {
  return (
    <div className={`rounded-xl p-3 ${theme.tile}`}>
      <p className={`text-xs ${theme.muted}`}>{label}</p>
      <p className="mt-1 text-lg font-semibold tabular-nums">{value}</p>
      {sub && <p className={`text-xs ${theme.muted}`}>{sub}</p>}
    </div>
  );
}

/* ------------------------------ Component --------------------------- */

export default function WeatherDashboard({
  defaultCity = "Dhaka",
  defaultUnit = "C",
}) {
  const searchId = useId();

  const [place, setPlace] = useState(null);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchMsg, setSearchMsg] = useState("");

  const [unit, setUnit] = useState(defaultUnit);
  const [rainMode, setRainMode] = useState("auto"); // auto | on | off
  const [nightOverride, setNightOverride] = useState(null); // null = follow the city's day/night

  /* ---- 1. Pick the first place (saved one, otherwise the default city) ---- */
  useEffect(() => {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      /* storage unavailable */
    }
    if (saved && typeof saved.latitude === "number") {
      setPlace(saved);
      return;
    }

    const ctrl = new AbortController();
    geocode(defaultCity, ctrl.signal)
      .then((list) => {
        if (list[0]) setPlace(list[0]);
        else {
          setError(`Couldn't find "${defaultCity}". Search for a city above.`);
          setStatus("error");
        }
      })
      .catch((e) => {
        if (isAbort(e)) return;
        setError(
          "Couldn't reach the weather service. Check your connection and try again.",
        );
        setStatus("error");
      });
    return () => ctrl.abort();
  }, [defaultCity]);

  /* ---- 2. Load the forecast whenever the place changes or on refresh ---- */
  useEffect(() => {
    if (!place) return;
    const ctrl = new AbortController();
    setStatus("loading");
    setError("");

    fetchForecast(place, ctrl.signal)
      .then((json) => {
        setData({ ...json, place });
        setStatus("ready");
      })
      .catch((e) => {
        if (isAbort(e)) return;
        setError(
          "Couldn't load the forecast. Check your connection and try again.",
        );
        setStatus("error");
      });

    return () => ctrl.abort();
  }, [place, refreshKey]);

  /* ---- Actions ---- */
  function selectPlace(p) {
    setPlace(p);
    setSuggestions([]);
    setSearchMsg("");
    setQuery("");
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch {
      /* storage unavailable */
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    setSearching(true);
    setSearchMsg("");
    setSuggestions([]);
    try {
      const list = await geocode(q);
      if (list.length === 0) setSearchMsg(`No city found for "${q}".`);
      else if (list.length === 1) selectPlace(list[0]);
      else setSuggestions(list);
    } catch {
      setSearchMsg("Search failed. Check your connection and try again.");
    } finally {
      setSearching(false);
    }
  }

  function handleLocate() {
    if (!navigator.geolocation) {
      setSearchMsg("Location isn't supported in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        selectPlace({
          name: "My location",
          region: "",
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      () => setSearchMsg("Location permission was denied."),
      { timeout: 10000 },
    );
  }

  /* ---- Derived values ---- */
  const cur = data?.current;
  const night = nightOverride ?? (cur ? cur.is_day === 0 : false);
  const theme = night ? THEMES.night : THEMES.day;

  const now = cur ? describe(cur.weather_code) : null;
  const raining = !!now && (now.kind === "rain" || now.kind === "storm");
  const showRain = rainMode === "on" || (rainMode === "auto" && raining);
  const dropCount = raining ? rainDropCount(cur.weather_code) : 70;

  const bgClass = !night && raining ? theme.bgRain : theme.bg;

  const temp = (c) => Math.round(unit === "C" ? c : (c * 9) / 5 + 32);
  const wind = (kmh) =>
    unit === "C"
      ? `${Math.round(kmh)} km/h`
      : `${Math.round(kmh * 0.621371)} mph`;

  const hours = useMemo(() => {
    if (!data) return [];
    const { hourly, current } = data;
    const from = `${current.time.slice(0, 13)}:00`;
    const start = Math.max(
      0,
      hourly.time.findIndex((t) => t >= from),
    );
    return hourly.time.slice(start, start + 24).map((t, i) => ({
      time: t,
      temp: hourly.temperature_2m[start + i],
      code: hourly.weather_code[start + i],
      rain: hourly.precipitation_probability[start + i],
      isDay: hourly.is_day[start + i] === 1,
    }));
  }, [data]);

  const week = useMemo(() => {
    if (!data) return null;
    const d = data.daily;
    const min = Math.min(...d.temperature_2m_min);
    const max = Math.max(...d.temperature_2m_max);
    return { min, span: max - min || 1 };
  }, [data]);

  const controlButton = `flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 ${theme.ring} ${theme.card} ${theme.idle}`;
  const nightButton = `flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 ${theme.ring} ${
    night
      ? "border-emerald-400 bg-emerald-400 text-black"
      : `${theme.card} ${theme.idle}`
  }`;

  return (
    <div
      className={`relative isolate mx-auto w-full max-w-6xl overflow-hidden rounded-3xl transition-colors duration-500 ${bgClass} ${theme.text} ${theme.shadow}`}
    >
      <style>{`
        @keyframes wd-fall { from { top: -10%; } to { top: 105%; } }
        @media (prefers-reduced-motion: reduce) { .wd-drop { animation: none !important; display: none; } }
      `}</style>

      {showRain && <RainLayer count={dropCount} color={theme.drop} />}

      {night && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(52,211,153,0.05) 0, rgba(52,211,153,0.05) 1px, transparent 1px, transparent 3px), radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      )}

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        {/* Top bar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <form onSubmit={handleSearch} className="flex gap-2">
              <label htmlFor={searchId} className="sr-only">
                Search for a city
              </label>
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a city…"
                className={`min-w-0 flex-1 rounded-lg border px-3 py-2 text-base backdrop-blur-md focus:outline-none focus-visible:ring-2 ${theme.field} ${theme.ring}`}
              />
              <button
                type="submit"
                disabled={searching || !query.trim()}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${theme.active} ${theme.ring}`}
              >
                {searching ? "Searching…" : "Search"}
              </button>
              <button
                type="button"
                onClick={handleLocate}
                aria-label="Use my location"
                title="Use my location"
                className={`rounded-lg border px-3 transition-colors focus:outline-none focus-visible:ring-2 ${theme.card} ${theme.idle} ${theme.ring}`}
              >
                <SmallIcon
                  d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
                  extra={<circle cx="12" cy="10" r="3" />}
                  className="h-5 w-5"
                />
              </button>
            </form>

            {searchMsg && (
              <p role="alert" className={`mt-2 text-sm ${theme.muted}`}>
                {searchMsg}
              </p>
            )}

            {suggestions.length > 0 && (
              <ul
                className={`absolute z-30 mt-2 w-full overflow-hidden rounded-xl border shadow-2xl backdrop-blur-md ${theme.menu}`}
              >
                {suggestions.map((s) => (
                  <li key={`${s.latitude}-${s.longitude}`}>
                    <button
                      type="button"
                      onClick={() => selectPlace(s)}
                      className={`block w-full px-4 py-2.5 text-left transition-colors focus:outline-none focus-visible:bg-white/10 ${theme.idle}`}
                    >
                      <span className="font-medium">{s.name}</span>
                      {s.region && (
                        <span className={`ml-2 text-sm ${theme.muted}`}>
                          {s.region}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Segmented
              label="Temperature unit"
              theme={theme}
              value={unit}
              onChange={setUnit}
              options={[
                { value: "C", label: "°C" },
                { value: "F", label: "°F" },
              ]}
            />

            <div className="flex items-center gap-2">
              <span className={`text-sm ${theme.muted}`}>Rain</span>
              <Segmented
                label="Rain effect"
                theme={theme}
                value={rainMode}
                onChange={setRainMode}
                options={[
                  { value: "auto", label: "Auto" },
                  { value: "on", label: "On" },
                  { value: "off", label: "Off" },
                ]}
              />
            </div>

            <button
              type="button"
              aria-pressed={night}
              onClick={() => setNightOverride(!night)}
              className={nightButton}
            >
              <SmallIcon
                d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                extra={<circle cx="12" cy="12" r="3" />}
              />
              Night vision
            </button>

            <button
              type="button"
              onClick={() => setRefreshKey((k) => k + 1)}
              aria-label="Refresh weather"
              title="Refresh"
              className={`${controlButton} px-2.5`}
            >
              <SmallIcon
                className={`h-4 w-4 ${status === "loading" ? "animate-spin" : ""}`}
                d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M8 16H3v5"
              />
            </button>
          </div>
        </div>

        {/* Loading skeleton (first load only) */}
        {!data && status === "loading" && (
          <div
            className="mt-6 grid animate-pulse gap-4 lg:grid-cols-3"
            role="status"
            aria-label="Loading weather"
          >
            <div className={`h-56 rounded-2xl lg:col-span-2 ${theme.tile}`} />
            <div className={`h-56 rounded-2xl ${theme.tile}`} />
            <div className={`h-40 rounded-2xl lg:col-span-3 ${theme.tile}`} />
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <Panel theme={theme} className="mt-6">
            <p role="alert" className="text-base">
              {error}
            </p>
            {place && (
              <button
                type="button"
                onClick={() => setRefreshKey((k) => k + 1)}
                className={`mt-3 rounded-lg px-4 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2 ${theme.active} ${theme.ring}`}
              >
                Try again
              </button>
            )}
          </Panel>
        )}

        {/* Dashboard */}
        {data && (
          <div
            className={`mt-6 grid gap-4 transition-opacity lg:grid-cols-3 ${status === "loading" ? "opacity-70" : ""}`}
          >
            {/* Current conditions */}
            <Panel theme={theme} className="lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <h2
                    className="text-2xl font-semibold sm:text-3xl"
                    style={{ textShadow: theme.glow }}
                  >
                    {data.place.name}
                  </h2>
                  {data.place.region && (
                    <p className={theme.muted}>{data.place.region}</p>
                  )}
                  <p className={`mt-1 text-sm ${theme.muted}`}>
                    {dateFrom(cur.time).toLocaleDateString("en-US", {
                      weekday: "long",
                      day: "numeric",
                      month: "short",
                    })}
                    , {to12h(cur.time)} local time
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <WeatherIcon
                    kind={now.kind}
                    isDay={cur.is_day === 1}
                    accent={theme.accent}
                    className="h-20 w-20 drop-shadow-lg sm:h-24 sm:w-24"
                  />
                  <p
                    className="text-7xl font-light tabular-nums sm:text-8xl"
                    style={{ textShadow: theme.glow }}
                    aria-label={`${temp(cur.temperature_2m)} degrees`}
                  >
                    {temp(cur.temperature_2m)}°
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1">
                <span className="text-lg font-medium">{now.label}</span>
                <span className={theme.muted}>
                  Feels like {temp(cur.apparent_temperature)}°
                </span>
                <span className={theme.muted}>
                  High {temp(data.daily.temperature_2m_max[0])}° / Low{" "}
                  {temp(data.daily.temperature_2m_min[0])}°
                </span>
              </div>
            </Panel>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3">
              <Stat
                theme={theme}
                label="Humidity"
                value={`${Math.round(cur.relative_humidity_2m)}%`}
              />
              <Stat
                theme={theme}
                label="Wind"
                value={wind(cur.wind_speed_10m)}
                sub={`from ${compass(cur.wind_direction_10m)}`}
              />
              <Stat
                theme={theme}
                label="Pressure"
                value={`${Math.round(cur.surface_pressure)} hPa`}
              />
              <Stat
                theme={theme}
                label="UV index"
                value={Math.round(data.daily.uv_index_max[0])}
                sub={uvLabel(data.daily.uv_index_max[0])}
              />
              <Stat
                theme={theme}
                label="Sunrise"
                value={to12h(data.daily.sunrise[0])}
              />
              <Stat
                theme={theme}
                label="Sunset"
                value={to12h(data.daily.sunset[0])}
              />
            </div>

            {/* Hourly */}
            <Panel
              theme={theme}
              title="Next 24 hours"
              className="lg:col-span-3"
            >
              <ul className="flex gap-2 overflow-x-auto pb-2">
                {hours.map((h, i) => (
                  <li
                    key={h.time}
                    className={`flex min-w-[4.5rem] flex-col items-center gap-1.5 rounded-xl px-2 py-3 ${
                      i === 0 ? theme.tile : ""
                    }`}
                  >
                    <span className={`text-sm ${theme.muted}`}>
                      {i === 0 ? "Now" : hourLabel(h.time)}
                    </span>
                    <WeatherIcon
                      kind={describe(h.code).kind}
                      isDay={h.isDay}
                      accent={theme.accent}
                      className="h-7 w-7"
                    />
                    <span className="text-base font-semibold tabular-nums">
                      {temp(h.temp)}°
                    </span>
                    <span className={`text-xs tabular-nums ${theme.muted}`}>
                      {h.rain ?? 0}%
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>

            {/* 7-day */}
            <Panel
              theme={theme}
              title="7-day forecast"
              className="lg:col-span-3"
            >
              <ul className="divide-y divide-white/10">
                {data.daily.time.map((day, i) => {
                  const min = data.daily.temperature_2m_min[i];
                  const max = data.daily.temperature_2m_max[i];
                  const left = ((min - week.min) / week.span) * 100;
                  const width = Math.max(6, ((max - min) / week.span) * 100);

                  return (
                    <li
                      key={day}
                      className="grid grid-cols-[3.5rem_2rem_2.5rem_1fr] items-center gap-3 py-2.5 sm:grid-cols-[5rem_2rem_3rem_1fr]"
                    >
                      <span className="font-medium">
                        {i === 0
                          ? "Today"
                          : dateFrom(day).toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                      </span>
                      <WeatherIcon
                        kind={describe(data.daily.weather_code[i]).kind}
                        accent={theme.accent}
                        className="h-6 w-6"
                      />
                      <span className={`text-sm tabular-nums ${theme.muted}`}>
                        {data.daily.precipitation_probability_max[i] ?? 0}%
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="w-9 text-right tabular-nums">
                          {temp(min)}°
                        </span>
                        <div className="relative h-1.5 flex-1 rounded-full bg-black/25">
                          <span
                            className="absolute h-full rounded-full"
                            style={{
                              left: `${left}%`,
                              width: `${Math.min(width, 100 - left)}%`,
                              background: theme.bar,
                            }}
                          />
                        </div>
                        <span className="w-9 tabular-nums">{temp(max)}°</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Panel>
          </div>
        )}

        <p className={`mt-6 text-center text-xs ${theme.muted}`}>
          Weather data by{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Open-Meteo.com
          </a>
        </p>
      </div>
    </div>
  );
}
