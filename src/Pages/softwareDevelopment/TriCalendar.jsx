import { useMemo, useState } from "react";

/* ------------------------------------------------------------------ *
 *  English (Gregorian) + Arabic (Hijri) + Bengali (Bangla) calendar
 * ------------------------------------------------------------------ */

/* ------------------------------ Names ------------------------------- */

const EN_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const EN_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const EN_DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const AR_HIJRI = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];

const EN_HIJRI = [
  "Muharram",
  "Safar",
  "Rabi' al-awwal",
  "Rabi' al-thani",
  "Jumada al-awwal",
  "Jumada al-thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
];

const AR_DAYS = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

const AR_DAYS_SHORT = [
  "أحد",
  "اثنين",
  "ثلاثاء",
  "أربعاء",
  "خميس",
  "جمعة",
  "سبت",
];

const BN_MONTHS = [
  "বৈশাখ",
  "জ্যৈষ্ঠ",
  "আষাঢ়",
  "শ্রাবণ",
  "ভাদ্র",
  "আশ্বিন",
  "কার্তিক",
  "অগ্রহায়ণ",
  "পৌষ",
  "মাঘ",
  "ফাল্গুন",
  "চৈত্র",
];

const BN_MONTHS_EN = [
  "Boishakh",
  "Joishtho",
  "Ashar",
  "Srabon",
  "Bhadro",
  "Ashwin",
  "Kartik",
  "Ogrohayon",
  "Poush",
  "Magh",
  "Falgun",
  "Choitro",
];

const BN_DAYS = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

const BN_DAYS_SHORT = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"];

const BN_SEASONS = ["গ্রীষ্ম", "বর্ষা", "শরৎ", "হেমন্ত", "শীত", "বসন্ত"];

const toDigits = (n, zeroCode) =>
  String(n).replace(/\d/g, (c) => String.fromCharCode(zeroCode + Number(c)));

const bnDigits = (n) => toDigits(n, 0x09e6);
const arDigits = (n) => toDigits(n, 0x0660);

/* ------------------------------ Settings ---------------------------- */

const SYSTEMS = {
  gregorian: {
    label: "English",
    lang: "en",
    dir: "ltr",
    weekStart: 0,
  },

  hijri: {
    label: "العربية",
    lang: "ar",
    dir: "rtl",
    weekStart: 6,
  },

  bangla: {
    label: "বাংলা",
    lang: "bn",
    dir: "ltr",
    weekStart: 6,
  },
};

const WEEKDAY_LABELS = {
  gregorian: EN_DAYS_SHORT,
  hijri: AR_DAYS_SHORT,
  bangla: BN_DAYS_SHORT,
};

const SYSTEM_NAMES = {
  gregorian: "English",
  hijri: "Hijri",
  bangla: "Bangla",
};

const FONTS = {
  ar: '"Noto Naskh Arabic","Amiri","Traditional Arabic",serif',
  bn: '"Noto Sans Bengali","Hind Siliguri","Kalpurush",sans-serif',
};

/* --------------------------- Date helpers --------------------------- */

const atNoon = (y, m, d) => new Date(y, m, d, 12);

const startOfDay = (date) =>
  atNoon(date.getFullYear(), date.getMonth(), date.getDate());

const addDays = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
};

const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const ymd = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;

/* ------------------------------ Hijri ------------------------------- */

function makeHijriFormatter() {
  for (const cal of ["islamic-umalqura", "islamic-civil", "islamic"]) {
    try {
      const f = new Intl.DateTimeFormat(`en-u-ca-${cal}-nu-latn`, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      if (f.resolvedOptions().calendar === cal) {
        return f;
      }
    } catch {
      // Try next calendar.
    }
  }

  return null;
}

const hijriFormatter = makeHijriFormatter();

function toHijri(date, offset = 0) {
  if (!hijriFormatter) return null;

  const parts = hijriFormatter.formatToParts(addDays(date, offset));

  const get = (type) => Number(parts.find((p) => p.type === type)?.value);

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
  };
}

/* ------------------------------ Bangla ------------------------------ */

const BN_START = {
  1: 14,
  2: 13,
  3: 15,
  4: 14,
  5: 15,
  6: 15,
  7: 16,
  8: 16,
  9: 16,
  10: 16,
  11: 15,
  12: 15,
};

const BN_INDEX_OF = {
  1: 9,
  2: 10,
  3: 11,
  4: 0,
  5: 1,
  6: 2,
  7: 3,
  8: 4,
  9: 5,
  10: 6,
  11: 7,
  12: 8,
};

const G_MONTH_OF = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];

function toBangla(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  const year = m > 4 || (m === 4 && d >= 14) ? y - 593 : y - 594;

  if (d >= BN_START[m]) {
    return {
      year,
      month: BN_INDEX_OF[m],
      day: d - BN_START[m] + 1,
    };
  }

  const pm = m === 1 ? 12 : m - 1;
  const py = m === 1 ? y - 1 : y;

  const daysInPrev = new Date(py, pm, 0).getDate();

  return {
    year,
    month: BN_INDEX_OF[pm],
    day: d + (daysInPrev - BN_START[pm]) + 1,
  };
}

/* --------------------------- Month layouts -------------------------- */

function getMonth(system, cursor, offset) {
  if (system === "hijri" && hijriFormatter) {
    const h = toHijri(cursor, offset);

    const first = addDays(cursor, -(h.day - 1));

    const length =
      toHijri(addDays(first, 29), offset).month === h.month ? 30 : 29;

    return {
      first,
      length,
      year: h.year,
      monthIdx: h.month - 1,
    };
  }

  if (system === "bangla") {
    const b = toBangla(cursor);

    const gMonth = G_MONTH_OF[b.month];

    const gYear = b.month >= 9 ? b.year + 594 : b.year + 593;

    const first = atNoon(gYear, gMonth - 1, BN_START[gMonth]);

    const isLeap = new Date(gYear, 1, 29).getMonth() === 1;

    const length = b.month <= 4 ? 31 : b.month === 10 && isLeap ? 31 : 30;

    return {
      first,
      length,
      year: b.year,
      monthIdx: b.month,
    };
  }

  const y = cursor.getFullYear();
  const m = cursor.getMonth();

  return {
    first: atNoon(y, m, 1),
    length: new Date(y, m + 1, 0).getDate(),
    year: y,
    monthIdx: m,
  };
}

function describeDate(date, offset) {
  return {
    wd: date.getDay(),

    g: {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    },

    h: toHijri(date, offset),

    b: toBangla(date),
  };
}

function numbersFor(system, info) {
  const g = {
    text: String(info.g.day),
    lang: "en",
  };

  const h = info.h
    ? {
        text: arDigits(info.h.day),
        lang: "ar",
      }
    : null;

  const b = {
    text: bnDigits(info.b.day),
    lang: "bn",
  };

  if (system === "hijri" && h) {
    return {
      main: h,
      side: [g, b],
    };
  }

  if (system === "bangla") {
    return {
      main: b,
      side: [g, h].filter(Boolean),
    };
  }

  return {
    main: g,
    side: [h, b].filter(Boolean),
  };
}

function monthsSpan(system, first, last, offset) {
  const a = describeDate(first, offset);
  const b = describeDate(last, offset);

  const pick = (info) => {
    if (system === "gregorian") {
      return {
        name: EN_MONTHS[info.g.month],
        year: String(info.g.year),
      };
    }

    if (system === "hijri") {
      return info.h
        ? {
            name: AR_HIJRI[info.h.month - 1],
            year: arDigits(info.h.year),
          }
        : null;
    }

    return {
      name: BN_MONTHS[info.b.month],
      year: bnDigits(info.b.year),
    };
  };

  const s = pick(a);
  const e = pick(b);

  if (!s || !e) return null;

  if (s.name === e.name && s.year === e.year) {
    return `${s.name} ${s.year}`;
  }

  if (s.year === e.year) {
    return `${s.name} – ${e.name} ${s.year}`;
  }

  return `${s.name} ${s.year} – ${e.name} ${e.year}`;
}

/* --------------------------- Small pieces --------------------------- */

function T({ lang, className = "", children }) {
  return (
    <span
      lang={lang}
      className={className}
      style={
        FONTS[lang]
          ? {
              fontFamily: FONTS[lang],
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}

function Chevron({ dir }) {
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
      className="h-4 w-4 sm:h-5 sm:w-5"
    >
      <path d={dir === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

function InfoRow({ label, children }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-[#0E0E10] p-3.5 sm:p-4">
      <p className="mb-1.5 text-xs font-medium text-amber-400">{label}</p>

      <div className="min-w-0 break-words">{children}</div>
    </div>
  );
}

/* ---------------------------- Component ----------------------------- */

export default function TriCalendar({
  defaultSystem = "gregorian",
  hijriOffset = 0,
}) {
  const today = useMemo(() => startOfDay(new Date()), []);

  const [system, setSystem] = useState(defaultSystem);

  const [cursor, setCursor] = useState(today);

  const [selected, setSelected] = useState(today);

  const [offset, setOffset] = useState(hijriOffset);

  const tabs = hijriFormatter
    ? ["gregorian", "hijri", "bangla"]
    : ["gregorian", "bangla"];

  const activeSystem = tabs.includes(system) ? system : "gregorian";

  const cfg = SYSTEMS[activeSystem];

  const month = useMemo(
    () => getMonth(activeSystem, cursor, offset),
    [activeSystem, cursor, offset],
  );

  const lastDay = addDays(month.first, month.length - 1);

  const blanks = (month.first.getDay() - cfg.weekStart + 7) % 7;

  const cells = useMemo(
    () =>
      Array.from(
        {
          length: month.length,
        },
        (_, i) => {
          const date = addDays(month.first, i);

          return {
            date,
            info: describeDate(date, offset),
          };
        },
      ),
    [month, offset],
  );

  const sel = describeDate(selected, offset);

  const others = tabs.filter((k) => k !== activeSystem);

  const weekdayOrder = Array.from(
    { length: 7 },
    (_, i) => (cfg.weekStart + i) % 7,
  );

  const shiftMonth = (dir) => {
    setCursor(
      dir > 0 ? addDays(month.first, month.length) : addDays(month.first, -1),
    );
  };

  const goToday = () => {
    setCursor(today);
    setSelected(today);
  };

  const jumpTo = (value) => {
    if (!value) return;

    const [y, m, d] = value.split("-").map(Number);

    const date = atNoon(y, m - 1, d);

    setCursor(date);
    setSelected(date);
  };

  const title = {
    gregorian: {
      text: `${EN_MONTHS[month.monthIdx]} ${month.year}`,
      sub: null,
    },

    hijri: {
      text: `${AR_HIJRI[month.monthIdx]} ${arDigits(month.year)}`,
      sub: `${EN_HIJRI[month.monthIdx]} ${month.year} AH`,
    },

    bangla: {
      text: `${BN_MONTHS[month.monthIdx]} ${bnDigits(month.year)}`,
      sub: `${BN_MONTHS_EN[month.monthIdx]} ${month.year}`,
    },
  }[activeSystem];

  const legendNames = others.map((k) => SYSTEM_NAMES[k]).join(" and ");

  const iconButton =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-gray-200 transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 sm:h-10 sm:w-10";

  return (
    <section className="w-full px-2 py-4 text-white xs:px-3 sm:px-4 sm:py-8 lg:px-6 lg:py-10">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1D] p-3 shadow-xl sm:p-5 md:p-6 lg:p-8">
        {/* =========================================================
            HEADER
        ========================================================== */}

        <header className="mb-5 flex flex-col gap-4 sm:mb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
              Calendar
            </h2>

            <p className="mt-1 max-w-xl text-xs leading-relaxed text-gray-400 sm:text-sm">
              English, Hijri and Bangla dates side by side.
            </p>
          </div>

          {/* Calendar system tabs */}

          <div
            role="tablist"
            aria-label="Calendar type"
            className="grid w-full grid-cols-3 gap-1 rounded-xl border border-white/10 bg-[#0E0E10] p-1 sm:flex sm:w-auto"
          >
            {tabs.map((key) => {
              const active = key === activeSystem;

              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSystem(key)}
                  className={`
                    min-w-0 rounded-lg px-2 py-2 text-xs font-semibold
                    transition-colors
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-amber-500
                    sm:px-4 sm:text-sm
                    ${
                      active
                        ? "bg-amber-500 text-black"
                        : "text-gray-300 hover:bg-white/5"
                    }
                  `}
                >
                  <T lang={SYSTEMS[key].lang}>{SYSTEMS[key].label}</T>
                </button>
              );
            })}
          </div>
        </header>

        {/* =========================================================
            MAIN LAYOUT
        ========================================================== */}

        <div className="grid min-w-0 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* =======================================================
              CALENDAR
          ======================================================== */}

          <div className="min-w-0 lg:col-span-2">
            {/* Month navigation */}

            <div className="mb-3 flex min-w-0 items-center justify-between gap-2 sm:mb-4">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                aria-label="Previous month"
                className={iconButton}
              >
                <Chevron dir="left" />
              </button>

              <div className="min-w-0 flex-1 px-1 text-center">
                <h3
                  className="truncate text-base font-semibold sm:text-xl md:text-2xl"
                  aria-live="polite"
                >
                  <T lang={cfg.lang}>{title.text}</T>
                </h3>

                {title.sub && (
                  <p className="mt-0.5 truncate text-[10px] text-gray-400 sm:text-sm">
                    {title.sub}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => shiftMonth(1)}
                aria-label="Next month"
                className={iconButton}
              >
                <Chevron dir="right" />
              </button>
            </div>

            {/* Other calendar month information */}

            <div className="mb-4 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-center sm:gap-x-5">
              {others.map((k) => {
                const span = monthsSpan(k, month.first, lastDay, offset);

                return span ? (
                  <span
                    key={k}
                    className="text-[10px] leading-relaxed text-gray-400 sm:text-xs md:text-sm"
                  >
                    {SYSTEM_NAMES[k]}:{" "}
                    <T lang={SYSTEMS[k].lang} className="text-gray-200">
                      {span}
                    </T>
                  </span>
                ) : null;
              })}
            </div>

            {/* =====================================================
                CALENDAR GRID
            ====================================================== */}

            <div dir={cfg.dir}>
              {/* Weekdays */}

              <div className="mb-1 grid grid-cols-7 gap-1 sm:mb-1.5 sm:gap-1.5">
                {weekdayOrder.map((wd) => (
                  <T
                    key={wd}
                    lang={cfg.lang}
                    className={`
                        min-w-0 overflow-hidden
                        py-1 text-center
                        text-[9px] font-medium
                        sm:text-xs
                        md:text-sm
                        ${wd === 5 ? "text-rose-300" : "text-gray-400"}
                      `}
                  >
                    <span className="sm:hidden">
                      {WEEKDAY_LABELS[activeSystem][wd].slice(0, 2)}
                    </span>

                    <span className="hidden sm:inline">
                      {WEEKDAY_LABELS[activeSystem][wd]}
                    </span>
                  </T>
                ))}
              </div>

              {/* Days */}

              <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                {/* Blank cells */}

                {Array.from(
                  {
                    length: blanks,
                  },
                  (_, i) => (
                    <div key={`blank-${i}`} className="aspect-square min-w-0" />
                  ),
                )}

                {/* Calendar cells */}

                {cells.map(({ date, info }) => {
                  const { main, side } = numbersFor(activeSystem, info);

                  const isSelected = sameDay(date, selected);

                  const isToday = sameDay(date, today);

                  const isFriday = info.wd === 5;

                  return (
                    <button
                      key={date.getTime()}
                      type="button"
                      onClick={() => setSelected(date)}
                      aria-pressed={isSelected}
                      aria-current={isToday ? "date" : undefined}
                      aria-label={`${EN_DAYS[info.wd]}, ${info.g.day} ${EN_MONTHS[info.g.month]} ${info.g.year}`}
                      className={`
                          group
                          relative
                          flex
                          aspect-square
                          min-w-0
                          flex-col
                          items-start
                          justify-between
                          overflow-hidden
                          rounded-md
                          border
                          p-1
                          transition-all
                          duration-200
                          focus:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-amber-500

                          sm:rounded-lg
                          sm:p-1.5
                          md:p-2

                          ${
                            isSelected
                              ? "border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/10"
                              : isToday
                                ? "border-amber-500/70 bg-amber-500/10 hover:bg-amber-500/20"
                                : "border-white/5 bg-white/[0.03] hover:border-white/10 hover:bg-white/10"
                          }
                        `}
                    >
                      {/* Main number */}

                      <T
                        lang={main.lang}
                        className={`
                            text-xs font-semibold
                            leading-none
                            sm:text-sm
                            md:text-lg
                            lg:text-xl

                            ${
                              isSelected
                                ? "text-black"
                                : isFriday
                                  ? "text-rose-300"
                                  : "text-white"
                            }
                          `}
                      >
                        {main.text}
                      </T>

                      {/* Other calendar numbers */}

                      <span
                        className={`
                            flex
                            w-full
                            min-w-0
                            justify-between
                            gap-0.5
                            text-[7px]
                            leading-none
                            sm:text-[9px]
                            md:text-[10px]
                            lg:text-xs

                            ${isSelected ? "text-black/70" : "text-gray-400"}
                          `}
                      >
                        {side.map((s) => (
                          <T key={s.lang} lang={s.lang} className="truncate">
                            {s.text}
                          </T>
                        ))}
                      </span>

                      {/* Today indicator */}

                      {isToday && !isSelected && (
                        <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-amber-400 sm:h-2 sm:w-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calendar explanation */}

            <p className="mt-3 text-[10px] leading-relaxed text-gray-500 sm:text-xs">
              The small numbers in each box show the {legendNames} dates.
              Fridays are in red.
            </p>
          </div>

          {/* =======================================================
              SELECTED DATE
          ======================================================== */}

          <aside className="min-w-0 space-y-3 border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <h3 className="text-sm font-semibold text-gray-300">
              Selected date
            </h3>

            {/* English */}

            <InfoRow label="English">
              <p className="text-base font-semibold leading-relaxed sm:text-lg">
                {EN_DAYS[sel.wd]}, {sel.g.day} {EN_MONTHS[sel.g.month]}{" "}
                {sel.g.year}
              </p>
            </InfoRow>

            {/* Hijri */}

            {sel.h && (
              <InfoRow label="Hijri (Arabic)">
                <p
                  dir="rtl"
                  className="text-base font-semibold leading-relaxed sm:text-lg"
                >
                  <T lang="ar">
                    {AR_DAYS[sel.wd]}، {arDigits(sel.h.day)}{" "}
                    {AR_HIJRI[sel.h.month - 1]} {arDigits(sel.h.year)} هـ
                  </T>
                </p>

                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                  {sel.h.day} {EN_HIJRI[sel.h.month - 1]} {sel.h.year} AH
                </p>

                {/* Hijri adjustment */}

                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3 text-xs text-gray-400">
                  <span className="w-full sm:w-auto">
                    Moon-sighting adjustment
                  </span>

                  <button
                    type="button"
                    onClick={() => setOffset((o) => Math.max(-2, o - 1))}
                    disabled={offset <= -2}
                    aria-label="Subtract one day from Hijri dates"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 text-base text-gray-200 transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    −
                  </button>

                  <span className="min-w-20 flex-1 text-center tabular-nums text-gray-200 sm:flex-none">
                    {offset > 0 ? `+${offset}` : offset}{" "}
                    {Math.abs(offset) === 1 ? "day" : "days"}
                  </span>

                  <button
                    type="button"
                    onClick={() => setOffset((o) => Math.min(2, o + 1))}
                    disabled={offset >= 2}
                    aria-label="Add one day to Hijri dates"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 text-base text-gray-200 transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                <p className="mt-2 text-[10px] leading-relaxed text-gray-500 sm:text-xs">
                  Hijri dates follow the Umm al-Qura calendar. Local moon
                  sighting can differ by a day.
                </p>
              </InfoRow>
            )}

            {/* Bangla */}

            <InfoRow label="Bangla (Bangladesh)">
              <p className="text-base font-semibold leading-relaxed sm:text-lg">
                <T lang="bn">
                  {BN_DAYS[sel.wd]}, {bnDigits(sel.b.day)}{" "}
                  {BN_MONTHS[sel.b.month]} {bnDigits(sel.b.year)} বঙ্গাব্দ
                </T>
              </p>

              <p className="mt-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
                {sel.b.day} {BN_MONTHS_EN[sel.b.month]} {sel.b.year}, season:{" "}
                <T lang="bn">{BN_SEASONS[Math.floor(sel.b.month / 2)]}</T>
              </p>
            </InfoRow>

            {/* Actions */}

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-end">
              <button
                type="button"
                onClick={goToday}
                className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:w-auto"
              >
                Go to today
              </button>

              <div className="w-full min-w-0 sm:w-auto sm:flex-1">
                <label
                  htmlFor="tri-calendar-jump"
                  className="mb-1 block text-xs text-gray-400"
                >
                  Jump to an English date
                </label>

                <input
                  id="tri-calendar-jump"
                  type="date"
                  min="1900-01-01"
                  max="2100-12-31"
                  value={ymd(selected)}
                  onChange={(e) => jumpTo(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#0E0E10] px-3 py-2.5 text-sm text-white [color-scheme:dark] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
