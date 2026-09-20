import { useState, useEffect, useMemo, useCallback } from "react";

/**
 * CryptoMarketTable
 *
 * Responsive cryptocurrency market table.
 *
 * Desktop:
 * - Full sortable table
 * - Sparkline charts
 * - Market statistics
 *
 * Mobile:
 * - Responsive crypto cards
 * - No horizontal page scrolling
 * - Compact price/change layout
 *
 * Data source: CoinGecko public API
 */

const API = "https://api.coingecko.com/api/v3";

const currencySymbols = {
  usd: "$",
  eur: "€",
  gbp: "£",
  bdt: "৳",
  inr: "₹",
};

/* =========================================================
   Formatting helpers
========================================================= */

const fmtPrice = (n, sym) => {
  if (n === null || n === undefined) return "—";

  const decimals = n >= 1000 ? 2 : n >= 1 ? 2 : n >= 0.01 ? 4 : 8;

  return (
    sym +
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
};

const fmtBig = (n, sym) => {
  if (!n) return "—";

  return (
    sym +
    n.toLocaleString("en-US", {
      maximumFractionDigits: 0,
    })
  );
};

const fmtPct = (n) => {
  if (n === null || n === undefined) return "—";

  return `${n >= 0 ? "▲" : "▼"} ${Math.abs(n).toFixed(1)}%`;
};

/* =========================================================
   Sparkline
========================================================= */

function Sparkline({ points = [], positive, mobile = false }) {
  const path = useMemo(() => {
    if (!points.length) return "";

    const w = mobile ? 90 : 120;
    const h = mobile ? 32 : 40;

    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    return points
      .map((p, i) => {
        const x = points.length === 1 ? w / 2 : (i / (points.length - 1)) * w;

        const y = h - ((p - min) / range) * h;

        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
  }, [points, mobile]);

  if (!path) {
    return <div className={mobile ? "h-8 w-[90px]" : "h-10 w-[120px]"} />;
  }

  const width = mobile ? 90 : 120;
  const height = mobile ? 32 : 40;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      aria-hidden="true"
    >
      <path
        d={path}
        fill="none"
        strokeWidth="1.5"
        stroke={positive ? "#16C784" : "#EA3943"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   Percentage cell
========================================================= */

const PctCell = ({ value }) => {
  if (value === null || value === undefined) {
    return <span className="text-[#6B7280]">—</span>;
  }

  const positive = value >= 0;

  return (
    <span
      className={`text-xs font-medium tabular-nums ${
        positive ? "text-[#16C784]" : "text-[#EA3943]"
      }`}
    >
      {fmtPct(value)}
    </span>
  );
};

/* =========================================================
   Main component
========================================================= */

export default function CryptoMarketTable({
  perPage = 50,
  currency = "usd",
  refreshMs = 60000,
}) {
  const [coins, setCoins] = useState([]);
  const [globalData, setGlobalData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [sortKey, setSortKey] = useState("market_cap_rank");

  const [sortDir, setSortDir] = useState("asc");

  const [watchlist, setWatchlist] = useState(new Set());

  const [lastUpdated, setLastUpdated] = useState(null);

  const sym = currencySymbols[currency] || "$";

  /* =====================================================
     Fetch market data
  ===================================================== */

  const fetchCoins = useCallback(
    async (showSpinner = false) => {
      if (showSpinner) {
        setLoading(true);
      }

      try {
        const res = await fetch(
          `${API}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d`,
        );

        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }

        const json = await res.json();

        setCoins(json);
        setError("");
        setLastUpdated(new Date());
      } catch (e) {
        setError(
          "Couldn't load market data. CoinGecko's free API is rate-limited — try again in a moment.",
        );
      } finally {
        setLoading(false);
      }
    },
    [currency, perPage, page],
  );

  const fetchGlobal = useCallback(async () => {
    try {
      const res = await fetch(`${API}/global`);

      if (!res.ok) return;

      const json = await res.json();

      setGlobalData(json.data);
    } catch {
      // Non-critical
    }
  }, []);

  useEffect(() => {
    fetchCoins(true);
    fetchGlobal();
  }, [fetchCoins, fetchGlobal]);

  useEffect(() => {
    if (!refreshMs) return;

    const id = setInterval(() => {
      fetchCoins(false);
      fetchGlobal();
    }, refreshMs);

    return () => clearInterval(id);
  }, [refreshMs, fetchCoins, fetchGlobal]);

  /* =====================================================
     Watchlist
  ===================================================== */

  const toggleWatch = (id) => {
    setWatchlist((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  /* =====================================================
     Sorting
  ===================================================== */

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);

      setSortDir(key === "market_cap_rank" ? "asc" : "desc");
    }
  };

  /* =====================================================
     Search + sorted data
  ===================================================== */

  const visible = useMemo(() => {
    let list = coins;

    if (search.trim()) {
      const q = search.trim().toLowerCase();

      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.symbol.toLowerCase().includes(q),
      );
    }

    return [...list].sort((a, b) => {
      const av = a[sortKey] ?? 0;

      const bv = b[sortKey] ?? 0;

      return sortDir === "asc" ? av - bv : bv - av;
    });
  }, [coins, search, sortKey, sortDir]);

  /* =====================================================
     Sort header
  ===================================================== */

  const SortHeader = ({ label, sortableKey, className = "" }) => (
    <th
      onClick={() => handleSort(sortableKey)}
      className={`
        cursor-pointer
        select-none
        whitespace-nowrap
        px-3
        py-3
        text-xs
        font-semibold
        text-[#9CA3AF]
        transition-colors
        hover:text-white
        ${className}
      `}
    >
      {label}

      {sortKey === sortableKey && (
        <span className="ml-1 text-[#F59E0B]">
          {sortDir === "asc" ? "↑" : "↓"}
        </span>
      )}
    </th>
  );

  /* =====================================================
     Mobile Coin Card
  ===================================================== */

  const MobileCoinCard = ({ coin }) => {
    const spark = coin.sparkline_in_7d?.price ?? [];

    const weekPositive =
      (coin.price_change_percentage_7d_in_currency ?? 0) >= 0;

    const isWatching = watchlist.has(coin.id);

    return (
      <article
        className="
          rounded-2xl
          border
          border-white/10
          bg-[#1A1A1D]
          p-4
          transition-colors
          hover:border-white/15
        "
      >
        {/* Top */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {/* Rank */}
            <span className="w-6 shrink-0 text-xs text-[#6B7280]">
              {coin.market_cap_rank ?? "—"}
            </span>

            {/* Logo */}
            <img
              src={coin.image}
              alt={coin.name}
              className="
                h-9
                w-9
                shrink-0
                rounded-full
                object-cover
              "
              loading="lazy"
            />

            {/* Name */}
            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-sm
                  font-semibold
                  text-white
                "
              >
                {coin.name}
              </p>

              <p
                className="
                  mt-0.5
                  text-[11px]
                  uppercase
                  tracking-wide
                  text-[#6B7280]
                "
              >
                {coin.symbol}
              </p>
            </div>
          </div>

          {/* Watchlist */}
          <button
            type="button"
            onClick={() => toggleWatch(coin.id)}
            aria-label={
              isWatching
                ? `Remove ${coin.name} from watchlist`
                : `Add ${coin.name} to watchlist`
            }
            aria-pressed={isWatching}
            className={`
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-lg
              transition-colors
              ${
                isWatching
                  ? "text-[#F59E0B]"
                  : "text-[#4B5563] hover:text-[#9CA3AF]"
              }
            `}
          >
            ★
          </button>
        </div>

        {/* Price + chart */}
        <div
          className="
            mt-4
            flex
            items-end
            justify-between
            gap-3
          "
        >
          <div className="min-w-0">
            <p className="text-[11px] text-[#6B7280]">Price</p>

            <p
              className="
                mt-1
                truncate
                text-lg
                font-bold
                tabular-nums
                text-white
              "
            >
              {fmtPrice(coin.current_price, sym)}
            </p>
          </div>

          <div className="shrink-0">
            <Sparkline points={spark} positive={weekPositive} mobile />
          </div>
        </div>

        {/* Percentage changes */}
        <div
          className="
            mt-4
            grid
            grid-cols-3
            gap-2
            border-t
            border-white/5
            pt-3
          "
        >
          <div>
            <p className="text-[10px] text-[#6B7280]">1h</p>

            <div className="mt-1">
              <PctCell value={coin.price_change_percentage_1h_in_currency} />
            </div>
          </div>

          <div>
            <p className="text-[10px] text-[#6B7280]">24h</p>

            <div className="mt-1">
              <PctCell value={coin.price_change_percentage_24h_in_currency} />
            </div>
          </div>

          <div>
            <p className="text-[10px] text-[#6B7280]">7d</p>

            <div className="mt-1">
              <PctCell value={coin.price_change_percentage_7d_in_currency} />
            </div>
          </div>
        </div>

        {/* Volume / Market Cap */}
        <div
          className="
            mt-3
            grid
            grid-cols-2
            gap-3
          "
        >
          <div
            className="
              rounded-xl
              bg-white/[0.025]
              px-3
              py-2.5
            "
          >
            <p className="text-[10px] text-[#6B7280]">24h Volume</p>

            <p
              className="
                mt-1
                truncate
                text-xs
                font-medium
                tabular-nums
                text-[#D1D5DB]
              "
            >
              {fmtBig(coin.total_volume, sym)}
            </p>
          </div>

          <div
            className="
              rounded-xl
              bg-white/[0.025]
              px-3
              py-2.5
            "
          >
            <p className="text-[10px] text-[#6B7280]">Market Cap</p>

            <p
              className="
                mt-1
                truncate
                text-xs
                font-medium
                tabular-nums
                text-[#D1D5DB]
              "
            >
              {fmtBig(coin.market_cap, sym)}
            </p>
          </div>
        </div>
      </article>
    );
  };

  /* =====================================================
     Loading Card
  ===================================================== */

  const MobileLoadingCard = () => (
    <div
      className="
        animate-pulse
        rounded-2xl
        border
        border-white/10
        bg-[#1A1A1D]
        p-4
      "
    >
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-white/5" />

        <div className="flex-1">
          <div className="h-3 w-28 rounded bg-white/5" />
          <div className="mt-2 h-2.5 w-16 rounded bg-white/5" />
        </div>

        <div className="h-4 w-4 rounded bg-white/5" />
      </div>

      <div className="mt-5 h-5 w-32 rounded bg-white/5" />

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="h-8 rounded bg-white/5" />
        <div className="h-8 rounded bg-white/5" />
        <div className="h-8 rounded bg-white/5" />
      </div>
    </div>
  );

  /* =====================================================
     Render
  ===================================================== */

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0E0E10] text-white">
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-3
          py-6
          sm:px-4
          sm:py-8
          lg:px-6
          lg:py-10
          xl:px-8
        "
      >
        {/* =================================================
            Header
        ================================================= */}
        <div className="mb-5 sm:mb-6">
          <h2
            className="
              m-0
              text-xl
              font-bold
              leading-tight
              sm:text-2xl
              md:text-3xl
            "
          >
            Cryptocurrency Prices by Market Cap
          </h2>

          <p
            className="
              m-0
              mt-2
              text-xs
              leading-relaxed
              text-[#9CA3AF]
              sm:text-sm
              pt-10
            "
          >
            Live market data, refreshed automatically
            {lastUpdated && (
              <span className="text-[#6B7280]">
                {" · last updated "}
                {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>

        {/* =================================================
            Global Stats
        ================================================= */}
        {globalData && (
          <div
            className="
              mb-5
              grid
              grid-cols-2
              gap-2
              sm:gap-3
              lg:grid-cols-4
            "
          >
            {[
              {
                label: "Total Market Cap",
                value: fmtBig(globalData.total_market_cap?.[currency], sym),
                change: globalData.market_cap_change_percentage_24h_usd,
              },
              {
                label: "24h Trading Volume",
                value: fmtBig(globalData.total_volume?.[currency], sym),
              },
              {
                label: "BTC Dominance",
                value: `${
                  globalData.market_cap_percentage?.btc?.toFixed(1) ?? "—"
                }%`,
              },
              {
                label: "Active Coins",
                value:
                  globalData.active_cryptocurrencies?.toLocaleString() ?? "—",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-white/5
                  bg-[#1A1A1D]
                  px-3
                  py-3
                  sm:px-4
                  sm:py-3.5
                "
              >
                <p
                  className="
                    m-0
                    truncate
                    text-[10px]
                    text-[#9CA3AF]
                    sm:text-[11px]
                  "
                >
                  {stat.label}
                </p>

                <p
                  className="
                    m-0
                    mt-1
                    truncate
                    text-sm
                    font-bold
                    tabular-nums
                    sm:text-lg
                  "
                >
                  {stat.value}
                </p>

                {stat.change !== undefined && stat.change !== null && (
                  <div className="mt-0.5">
                    <PctCell value={stat.change} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* =================================================
            Controls
        ================================================= */}
        <div
          className="
            mb-4
            flex
            flex-col
            gap-2.5
            sm:flex-row
            sm:items-center
            sm:gap-3
          "
        >
          <div className="relative min-w-0 flex-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search coins..."
              aria-label="Search cryptocurrencies"
              className="
                h-11
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#1A1A1D]
                px-4
                text-sm
                text-white
                outline-none
                transition-colors
                placeholder:text-[#4B5563]
                focus:border-[#F59E0B]
                sm:h-12
              "
            />
          </div>

          <button
            type="button"
            onClick={() => fetchCoins(true)}
            className="
              flex
              h-11
              w-full
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              px-4
              text-sm
              font-medium
              text-[#D1D5DB]
              transition-colors
              hover:bg-white/5
              hover:text-white
              sm:h-12
              sm:w-auto
              sm:min-w-[100px]
            "
          >
            Refresh
          </button>
        </div>

        {/* =================================================
            Error
        ================================================= */}
        {error && (
          <div
            className="
              mb-4
              rounded-xl
              border
              border-[#EA3943]/30
              bg-[#EA3943]/10
              px-4
              py-3
              text-xs
              leading-relaxed
              text-[#F87171]
              sm:text-sm
            "
          >
            {error}
          </div>
        )}

        {/* =================================================
            DESKTOP TABLE
            Visible from lg+
        ================================================= */}
        <div
          className="
            hidden
            overflow-hidden
            rounded-xl
            border
            border-white/10
            bg-[#1A1A1D]
            lg:block
          "
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="border-b border-white/10">
                <tr className="text-left">
                  <th className="w-10 px-3 py-3" />

                  <SortHeader label="#" sortableKey="market_cap_rank" />

                  <th className="px-3 py-3 text-xs font-semibold text-[#9CA3AF]">
                    Coin
                  </th>

                  <SortHeader
                    label="Price"
                    sortableKey="current_price"
                    className="text-right"
                  />

                  <SortHeader
                    label="1h"
                    sortableKey="price_change_percentage_1h_in_currency"
                    className="text-right"
                  />

                  <SortHeader
                    label="24h"
                    sortableKey="price_change_percentage_24h_in_currency"
                    className="text-right"
                  />

                  <SortHeader
                    label="7d"
                    sortableKey="price_change_percentage_7d_in_currency"
                    className="text-right"
                  />

                  <SortHeader
                    label="24h Volume"
                    sortableKey="total_volume"
                    className="text-right"
                  />

                  <SortHeader
                    label="Market Cap"
                    sortableKey="market_cap"
                    className="text-right"
                  />

                  <th
                    className="
                      whitespace-nowrap
                      px-3
                      py-3
                      text-right
                      text-xs
                      font-semibold
                      text-[#9CA3AF]
                    "
                  >
                    Last 7 Days
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading &&
                  Array.from({
                    length: 10,
                  }).map((_, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td colSpan={10} className="px-3 py-4">
                        <div className="h-4 animate-pulse rounded bg-white/5" />
                      </td>
                    </tr>
                  ))}

                {!loading &&
                  visible.map((coin) => {
                    const spark = coin.sparkline_in_7d?.price ?? [];

                    const weekPositive =
                      (coin.price_change_percentage_7d_in_currency ?? 0) >= 0;

                    const isWatching = watchlist.has(coin.id);

                    return (
                      <tr
                        key={coin.id}
                        className="
                          border-b
                          border-white/5
                          transition-colors
                          hover:bg-white/[0.03]
                        "
                      >
                        {/* Watchlist */}
                        <td className="px-3 py-3.5">
                          <button
                            type="button"
                            onClick={() => toggleWatch(coin.id)}
                            className={`
                              text-base
                              leading-none
                              transition-colors
                              ${
                                isWatching
                                  ? "text-[#F59E0B]"
                                  : "text-[#4B5563] hover:text-[#9CA3AF]"
                              }
                            `}
                            aria-label="Toggle watchlist"
                            aria-pressed={isWatching}
                          >
                            ★
                          </button>
                        </td>

                        {/* Rank */}
                        <td className="px-3 py-3.5 text-xs tabular-nums text-[#9CA3AF]">
                          {coin.market_cap_rank ?? "—"}
                        </td>

                        {/* Coin */}
                        <td className="px-3 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={coin.image}
                              alt={coin.name}
                              className="h-6 w-6 shrink-0 rounded-full"
                              loading="lazy"
                            />

                            <div className="min-w-0">
                              <p className="m-0 truncate text-sm font-semibold">
                                {coin.name}
                              </p>

                              <p className="m-0 text-[11px] uppercase text-[#6B7280]">
                                {coin.symbol}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="whitespace-nowrap px-3 py-3.5 text-right text-sm font-semibold tabular-nums">
                          {fmtPrice(coin.current_price, sym)}
                        </td>

                        {/* 1h */}
                        <td className="whitespace-nowrap px-3 py-3.5 text-right">
                          <PctCell
                            value={coin.price_change_percentage_1h_in_currency}
                          />
                        </td>

                        {/* 24h */}
                        <td className="whitespace-nowrap px-3 py-3.5 text-right">
                          <PctCell
                            value={coin.price_change_percentage_24h_in_currency}
                          />
                        </td>

                        {/* 7d */}
                        <td className="whitespace-nowrap px-3 py-3.5 text-right">
                          <PctCell
                            value={coin.price_change_percentage_7d_in_currency}
                          />
                        </td>

                        {/* Volume */}
                        <td className="whitespace-nowrap px-3 py-3.5 text-right text-sm tabular-nums text-[#D1D5DB]">
                          {fmtBig(coin.total_volume, sym)}
                        </td>

                        {/* Market Cap */}
                        <td className="whitespace-nowrap px-3 py-3.5 text-right text-sm tabular-nums text-[#D1D5DB]">
                          {fmtBig(coin.market_cap, sym)}
                        </td>

                        {/* Sparkline */}
                        <td className="px-3 py-3.5">
                          <div className="flex justify-end">
                            <Sparkline points={spark} positive={weekPositive} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                {!loading && visible.length === 0 && !error && (
                  <tr>
                    <td
                      colSpan={10}
                      className="
                          px-3
                          py-10
                          text-center
                          text-sm
                          text-[#6B7280]
                        "
                    >
                      No coins matched your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* =================================================
            MOBILE CARDS
            Visible below lg
        ================================================= */}
        <div
          className="
            grid
            grid-cols-1
            gap-3
            lg:hidden
          "
        >
          {loading &&
            Array.from({
              length: 6,
            }).map((_, i) => <MobileLoadingCard key={i} />)}

          {!loading &&
            visible.map((coin) => <MobileCoinCard key={coin.id} coin={coin} />)}

          {!loading && visible.length === 0 && !error && (
            <div
              className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#1A1A1D]
                  px-4
                  py-10
                  text-center
                  text-sm
                  text-[#6B7280]
                "
            >
              No coins matched your search.
            </div>
          )}
        </div>

        {/* =================================================
            Pagination
        ================================================= */}
        <div
          className="
            mt-3
            flex
            flex-col
            gap-3
            rounded-xl
            border
            border-white/10
            bg-[#1A1A1D]
            px-4
            py-3
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-5
            sm:py-3.5
          "
        >
          <span
            className="
              text-center
              text-xs
              text-[#6B7280]
              sm:text-left
            "
          >
            Showing {visible.length} coins
            {" · "}
            page {page}
          </span>

          <div
            className="
              grid
              grid-cols-2
              gap-2
              sm:flex
            "
          >
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="
                min-h-[40px]
                rounded-lg
                border
                border-white/10
                px-3
                py-2
                text-xs
                font-medium
                text-[#D1D5DB]
                transition-colors
                hover:bg-white/5
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Previous
            </button>

            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              className="
                min-h-[40px]
                rounded-lg
                border
                border-white/10
                px-3
                py-2
                text-xs
                font-medium
                text-[#D1D5DB]
                transition-colors
                hover:bg-white/5
                hover:text-white
              "
            >
              Next
            </button>
          </div>
        </div>

        {/* =================================================
            Disclaimer
        ================================================= */}
        <p
          className="
            mt-3
            text-center
            text-[10px]
            leading-relaxed
            text-[#6B7280]
            sm:text-left
            sm:text-[11px]
          "
        >
          Market data provided by CoinGecko. Prices are for informational
          purposes only and are not investment advice.
        </p>
      </div>
    </div>
  );
}
