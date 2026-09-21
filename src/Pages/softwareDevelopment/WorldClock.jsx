import { useEffect, useMemo, useState } from "react";
import {
  FiCalendar,
  FiCheck,
  FiClock,
  FiCopy,
  FiGlobe,
  FiMapPin,
  FiRefreshCw,
  FiSearch,
} from "react-icons/fi";

const DEFAULT_CLOCKS = [
  {
    city: "Dhaka",
    country: "Bangladesh",
    timezone: "Asia/Dhaka",
  },
  {
    city: "London",
    country: "United Kingdom",
    timezone: "Europe/London",
  },
  {
    city: "New York",
    country: "United States",
    timezone: "America/New_York",
  },
  {
    city: "Los Angeles",
    country: "United States",
    timezone: "America/Los_Angeles",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    timezone: "Asia/Dubai",
  },
  {
    city: "Tokyo",
    country: "Japan",
    timezone: "Asia/Tokyo",
  },
];

const FALLBACK_TIMEZONES = [
  "UTC",
  "Asia/Dhaka",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Asia/Seoul",
  "Asia/Shanghai",
  "Asia/Hong_Kong",
  "Asia/Bangkok",
  "Asia/Jakarta",
  "Asia/Kathmandu",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Madrid",
  "Europe/Rome",
  "Europe/Moscow",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "America/Vancouver",
  "America/Sao_Paulo",
  "Australia/Sydney",
  "Australia/Melbourne",
  "Pacific/Auckland",
];

function getBrowserTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Dhaka";
  } catch {
    return "UTC";
  }
}

function getTimezones() {
  try {
    if (typeof Intl.supportedValuesOf === "function") {
      return ["UTC", ...Intl.supportedValuesOf("timeZone")];
    }
  } catch {
    // Ignore browser compatibility errors.
  }

  return FALLBACK_TIMEZONES;
}

function getTimezoneLabel(timezone) {
  if (timezone === "UTC") return "UTC";

  const parts = timezone.split("/");

  return parts.slice(1).join(" / ").replace(/_/g, " ");
}

function getTimezoneRegion(timezone) {
  if (timezone === "UTC") return "UTC";

  return timezone.split("/")[0].replace(/_/g, " ");
}

function getDateParts(date, timezone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(date);

  const result = {};

  for (const part of parts) {
    if (part.type !== "literal") {
      result[part.type] = part.value;
    }
  }

  return {
    year: Number(result.year),
    month: Number(result.month),
    day: Number(result.day),
    hour: Number(result.hour),
    minute: Number(result.minute),
    second: Number(result.second),
  };
}

function getTimezoneOffsetMinutes(timezone, date = new Date()) {
  const utc = getDateParts(date, "UTC");
  const local = getDateParts(date, timezone);

  const utcMs = Date.UTC(
    utc.year,
    utc.month - 1,
    utc.day,
    utc.hour,
    utc.minute,
    utc.second,
  );

  const localMs = Date.UTC(
    local.year,
    local.month - 1,
    local.day,
    local.hour,
    local.minute,
    local.second,
  );

  return Math.round((localMs - utcMs) / 60000);
}

function formatOffset(minutes) {
  if (minutes === 0) return "UTC";

  const sign = minutes >= 0 ? "+" : "-";
  const absolute = Math.abs(minutes);

  const hours = Math.floor(absolute / 60);
  const mins = absolute % 60;

  return `UTC${sign}${String(hours).padStart(2, "0")}${
    mins ? `:${String(mins).padStart(2, "0")}` : ""
  }`;
}

function formatTime(date, timezone, hour12) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12,
  }).format(date);
}

function formatDate(date, timezone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatDateTimeLocal(date, timezone) {
  const parts = getDateParts(date, timezone);

  return [
    `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(
      parts.day,
    ).padStart(2, "0")}`,
    `${String(parts.hour).padStart(2, "0")}:${String(parts.minute).padStart(
      2,
      "0",
    )}`,
  ].join("T");
}

/**
 * Converts a local date/time entered by the user in a specific
 * timezone into an actual UTC Date.
 *
 * Example:
 * "2026-09-21T15:00" in Asia/Dhaka
 * -> corresponding UTC instant.
 */
function zonedDateTimeToUtc(dateTimeLocal, timezone) {
  if (!dateTimeLocal) return null;

  const [datePart, timePart] = dateTimeLocal.split("T");

  if (!datePart || !timePart) return null;

  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  if (!year || !month || !day || Number.isNaN(hour) || Number.isNaN(minute)) {
    return null;
  }

  let utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);

  for (let i = 0; i < 4; i++) {
    const current = new Date(utcGuess);
    const parts = getDateParts(current, timezone);

    const currentWallTime = Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second,
    );

    const desiredWallTime = Date.UTC(year, month - 1, day, hour, minute, 0);

    const difference = desiredWallTime - currentWallTime;

    if (difference === 0) break;

    utcGuess += difference;
  }

  return new Date(utcGuess);
}

function getTimezoneDifference(sourceTimezone, targetTimezone, date) {
  const sourceOffset = getTimezoneOffsetMinutes(sourceTimezone, date);
  const targetOffset = getTimezoneOffsetMinutes(targetTimezone, date);

  const difference = targetOffset - sourceOffset;

  if (difference === 0) return "Same time";

  const sign = difference > 0 ? "+" : "-";
  const absolute = Math.abs(difference);

  const hours = Math.floor(absolute / 60);
  const minutes = absolute % 60;

  return `${sign}${hours}h${minutes ? ` ${minutes}m` : ""}`;
}

export default function WorldClock() {
  const browserTimezone = useMemo(() => getBrowserTimezone(), []);
  const timezones = useMemo(() => getTimezones(), []);

  const [currentTime, setCurrentTime] = useState(() => new Date());

  const [hour12, setHour12] = useState(true);

  const [activeTab, setActiveTab] = useState("clock");

  const [sourceTimezone, setSourceTimezone] = useState(browserTimezone);

  const [targetTimezone, setTargetTimezone] = useState("UTC");

  const [dateTimeLocal, setDateTimeLocal] = useState(() =>
    formatDateTimeLocal(new Date(), browserTimezone),
  );

  const [timezoneSearch, setTimezoneSearch] = useState("");

  const [copied, setCopied] = useState(false);

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredTimezones = useMemo(() => {
    const query = timezoneSearch.trim().toLowerCase();

    if (!query) return timezones;

    return timezones.filter((timezone) =>
      timezone.toLowerCase().includes(query),
    );
  }, [timezones, timezoneSearch]);

  const conversionResult = useMemo(() => {
    const utcDate = zonedDateTimeToUtc(dateTimeLocal, sourceTimezone);

    if (!utcDate || Number.isNaN(utcDate.getTime())) {
      return null;
    }

    return {
      date: utcDate,
      targetTime: formatTime(utcDate, targetTimezone, hour12),
      targetDate: formatDate(utcDate, targetTimezone),
      sourceOffset: formatOffset(
        getTimezoneOffsetMinutes(sourceTimezone, utcDate),
      ),
      targetOffset: formatOffset(
        getTimezoneOffsetMinutes(targetTimezone, utcDate),
      ),
      difference: getTimezoneDifference(
        sourceTimezone,
        targetTimezone,
        utcDate,
      ),
    };
  }, [dateTimeLocal, sourceTimezone, targetTimezone, hour12]);

  const handleSwap = () => {
    const oldSource = sourceTimezone;

    setSourceTimezone(targetTimezone);
    setTargetTimezone(oldSource);

    if (conversionResult?.date) {
      setDateTimeLocal(
        formatDateTimeLocal(conversionResult.date, targetTimezone),
      );
    }
  };

  const handleUseCurrentTime = () => {
    const now = new Date();

    setDateTimeLocal(formatDateTimeLocal(now, sourceTimezone));
  };

  const handleCopy = async () => {
    if (!conversionResult) return;

    const text = [
      `Time: ${conversionResult.targetTime}`,
      `Date: ${conversionResult.targetDate}`,
      `Timezone: ${targetTimezone}`,
      `Offset: ${conversionResult.targetOffset}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // Clipboard API may not be available.
    }
  };

  return (
    <section className="w-full bg-black01 py-8 sm:py-10 md:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-3 py-1.5 text-xs font-medium text-orange sm:text-sm">
            <FiGlobe className="text-sm" />
            Time Tools
          </div>

          <h2 className="font-montserrat text-2xl font-bold leading-tight text-white01 sm:text-3xl md:text-4xl lg:text-5xl">
            World Clock &{" "}
            <span className="text-orange">Time Zone Converter</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white02 sm:text-base sm:leading-7">
            Check the current time around the world and convert any date and
            time between different time zones.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex w-full justify-center sm:mb-8">
          <div className="inline-flex w-full max-w-md rounded-xl border border-white/10 bg-black02 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("clock")}
              className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition sm:px-5 ${
                activeTab === "clock"
                  ? "bg-orange text-white"
                  : "text-white02 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <FiClock />
              <span>World Clock</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("converter")}
              className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition sm:px-5 ${
                activeTab === "converter"
                  ? "bg-orange text-white"
                  : "text-white02 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <FiRefreshCw />
              <span>Converter</span>
            </button>
          </div>
        </div>

        {/* WORLD CLOCK */}
        {activeTab === "clock" && (
          <div>
            {/* Clock controls */}
            <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black02 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <FiClock />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    Live World Clock
                  </p>
                  <p className="truncate text-xs text-white02">
                    Automatically updates every second
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setHour12((value) => !value)}
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-orange/40 px-4 text-sm font-semibold text-orange transition hover:bg-orange hover:text-white"
              >
                <FiClock />
                {hour12 ? "12 Hour" : "24 Hour"}
              </button>
            </div>

            {/* Clock Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DEFAULT_CLOCKS.map((clock) => {
                const offset = getTimezoneOffsetMinutes(
                  clock.timezone,
                  currentTime,
                );

                return (
                  <article
                    key={clock.timezone}
                    className="group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-black02 p-4 transition duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-xl hover:shadow-black/20 sm:p-5"
                  >
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                          <FiMapPin />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate font-montserrat text-base font-semibold text-white sm:text-lg">
                            {clock.city}
                          </h3>

                          <p className="truncate text-xs text-white02">
                            {clock.country}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-white02 sm:text-xs">
                        {formatOffset(offset)}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="break-words font-montserrat text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {formatTime(currentTime, clock.timezone, hour12)}
                      </p>

                      <p className="mt-2 text-xs text-white02 sm:text-sm">
                        {formatDate(currentTime, clock.timezone)}
                      </p>

                      <p className="mt-3 truncate text-xs text-white02/70">
                        {clock.timezone}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Timezone Explorer */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-black02 p-4 sm:p-5">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-montserrat text-base font-semibold text-white sm:text-lg">
                    Explore Time Zones
                  </h3>

                  <p className="mt-1 text-xs text-white02 sm:text-sm">
                    Search any supported IANA timezone.
                  </p>
                </div>

                <div className="relative w-full sm:max-w-xs">
                  <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white02" />

                  <input
                    type="search"
                    value={timezoneSearch}
                    onChange={(event) => setTimezoneSearch(event.target.value)}
                    placeholder="Search timezone..."
                    className="h-11 w-full rounded-xl border border-white/10 bg-black01 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-white02/50 focus:border-orange"
                  />
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto rounded-xl border border-white/10 bg-black01 p-2">
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredTimezones.slice(0, 120).map((timezone) => (
                    <button
                      key={timezone}
                      type="button"
                      onClick={() => {
                        setSourceTimezone(timezone);
                        setActiveTab("converter");
                      }}
                      className="min-w-0 rounded-lg px-3 py-2 text-left text-xs text-white02 transition hover:bg-orange/10 hover:text-orange"
                    >
                      <span className="block truncate">
                        {getTimezoneLabel(timezone)}
                      </span>

                      <span className="mt-0.5 block truncate text-[10px] text-white02/50">
                        {getTimezoneRegion(timezone)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TIMEZONE CONVERTER */}
        {activeTab === "converter" && (
          <div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
              {/* Source */}
              <div className="min-w-0 rounded-2xl border border-white/10 bg-black02 p-4 sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                    <FiMapPin />
                  </div>

                  <div>
                    <h3 className="font-montserrat text-base font-semibold text-white sm:text-lg">
                      From
                    </h3>

                    <p className="text-xs text-white02">Source timezone</p>
                  </div>
                </div>

                <label className="mb-2 block text-xs font-medium text-white02">
                  Time Zone
                </label>

                <select
                  value={sourceTimezone}
                  onChange={(event) => setSourceTimezone(event.target.value)}
                  className="mb-4 h-12 w-full min-w-0 rounded-xl border border-white/10 bg-black01 px-3 text-sm text-white outline-none focus:border-orange"
                >
                  {timezones.map((timezone) => (
                    <option
                      key={timezone}
                      value={timezone}
                      className="bg-black02 text-white"
                    >
                      {timezone}
                    </option>
                  ))}
                </select>

                <label className="mb-2 block text-xs font-medium text-white02">
                  Date & Time
                </label>

                <input
                  type="datetime-local"
                  value={dateTimeLocal}
                  onChange={(event) => setDateTimeLocal(event.target.value)}
                  className="h-12 w-full min-w-0 rounded-xl border border-white/10 bg-black01 px-3 text-sm text-white outline-none focus:border-orange"
                />

                <button
                  type="button"
                  onClick={handleUseCurrentTime}
                  className="mt-3 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-medium text-white02 transition hover:border-orange hover:text-orange"
                >
                  <FiCalendar />
                  Use Current Time
                </button>
              </div>

              {/* Swap */}
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleSwap}
                  aria-label="Swap time zones"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-orange/40 bg-black02 text-orange transition hover:bg-orange hover:text-white lg:h-14 lg:w-14"
                >
                  <FiArrowLeftRight className="text-lg" />
                </button>
              </div>

              {/* Target */}
              <div className="min-w-0 rounded-2xl border border-orange/20 bg-black02 p-4 sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                    <FiGlobe />
                  </div>

                  <div>
                    <h3 className="font-montserrat text-base font-semibold text-white sm:text-lg">
                      To
                    </h3>

                    <p className="text-xs text-white02">Target timezone</p>
                  </div>
                </div>

                <label className="mb-2 block text-xs font-medium text-white02">
                  Time Zone
                </label>

                <select
                  value={targetTimezone}
                  onChange={(event) => setTargetTimezone(event.target.value)}
                  className="h-12 w-full min-w-0 rounded-xl border border-white/10 bg-black01 px-3 text-sm text-white outline-none focus:border-orange"
                >
                  {timezones.map((timezone) => (
                    <option
                      key={timezone}
                      value={timezone}
                      className="bg-black02 text-white"
                    >
                      {timezone}
                    </option>
                  ))}
                </select>

                <div className="mt-4 rounded-xl border border-white/10 bg-black01 p-4">
                  <p className="mb-2 text-xs text-white02">Converted Time</p>

                  <p className="break-words font-montserrat text-2xl font-bold text-orange sm:text-3xl">
                    {conversionResult?.targetTime || "--:--"}
                  </p>

                  <p className="mt-2 text-xs text-white02 sm:text-sm">
                    {conversionResult?.targetDate || "No date"}
                  </p>
                </div>
              </div>
            </div>

            {/* Result */}
            {conversionResult && (
              <div className="mt-5 overflow-hidden rounded-2xl border border-orange/20 bg-black02">
                <div className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-orange">
                      Conversion Result
                    </p>

                    <h3 className="break-words font-montserrat text-lg font-semibold text-white sm:text-xl">
                      {conversionResult.targetTime}
                    </h3>

                    <p className="mt-1 text-sm text-white02">
                      {conversionResult.targetDate}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-orange/40 px-4 text-sm font-semibold text-orange transition hover:bg-orange hover:text-white sm:w-auto"
                  >
                    {copied ? (
                      <>
                        <FiCheck />
                        Copied
                      </>
                    ) : (
                      <>
                        <FiCopy />
                        Copy Result
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-3">
                  <div className="border-b border-white/10 p-4 sm:border-b-0 sm:border-r">
                    <p className="text-xs text-white02">Source Offset</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {conversionResult.sourceOffset}
                    </p>
                  </div>

                  <div className="border-b border-white/10 p-4 sm:border-b-0 sm:border-r">
                    <p className="text-xs text-white02">Target Offset</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {conversionResult.targetOffset}
                    </p>
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-white02">Time Difference</p>
                    <p className="mt-1 text-sm font-semibold text-orange">
                      {conversionResult.difference}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Format */}
            <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black02 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Time Format
                </h3>

                <p className="mt-1 text-xs text-white02">
                  Choose how the clock displays time.
                </p>
              </div>

              <div className="grid grid-cols-2 rounded-xl border border-white/10 bg-black01 p-1 sm:w-48">
                <button
                  type="button"
                  onClick={() => setHour12(true)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    hour12
                      ? "bg-orange text-white"
                      : "text-white02 hover:text-white"
                  }`}
                >
                  12 Hour
                </button>

                <button
                  type="button"
                  onClick={() => setHour12(false)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    !hour12
                      ? "bg-orange text-white"
                      : "text-white02 hover:text-white"
                  }`}
                >
                  24 Hour
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer note */}
        <div className="mt-6 text-center">
          <p className="text-[11px] leading-5 text-white02/50 sm:text-xs">
            Time calculations are performed locally in your browser using the
            built-in JavaScript Intl API. No external time API is required.
          </p>
        </div>
      </div>
    </section>
  );
}
