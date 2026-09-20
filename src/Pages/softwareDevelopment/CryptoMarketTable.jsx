import { useState, useEffect, useMemo, useCallback } from "react";

/**
 * CryptoMarketTable
 * A CoinGecko-style live cryptocurrency market table built with
 * React + Tailwind CSS. No external chart or data libraries required —
 * sparklines are drawn as inline SVG.
 *
 * Data source: CoinGecko public API (free, no API key needed).
 * https://api.coingecko.com/api/v3/coins/markets
 *
 * Usage:
 *   <CryptoMarketTable />
 *   <CryptoMarketTable perPage={50} currency="usd" refreshMs={60000} />
 */

const API = "https://api.coingecko.com/api/v3";

const currencySymbols = { usd: "$", eur: "€", gbp: "£", bdt: "৳", inr: "₹" };

/* ---------- formatting helpers ---------- */

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
  return sym + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
};

const fmtPct = (n) => (n === null || n === undefined ? "—" : `${n >= 0 ? "▲" : "▼"} ${Math.abs(n).toFixed(1)}%`);

/* ---------- sparkline ---------- */

function Sparkline({ points = [], positive }) {
  const path = useMemo(() => {
    if (!points.length) return "";
    const w = 120;
    const h = 40;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    return points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * w;
        const y = h - ((p - min) / range) * h;
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
  }, [points]);

  if (!path) return <div className="w-[120px] h-10" />;

  return (
    <svg width="120" height="40" viewBox="0 0 120 40" className="overflow-visible">
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

/* ---------- percentage cell ---------- */

const PctCell = ({ value }) => {
  if (value === null || value === undefined)
    return <span className="text-[#6B7280]">—</span>;
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

/* ---------- main component ---------- */

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

  const fetchCoins = useCallback(
    async (showSpinner = false) => {
      if (showSpinner) setLoading(true);
      try {
        const res = await fetch(
          `${API}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d`
        );
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const json = await res.json();
        setCoins(json);
        setError("");
        setLastUpdated(new Date());
      } catch (e) {
        setError(
          "Couldn't load market data. CoinGecko's free API is rate-limited — try again in a moment."
        );
      } finally {
        setLoading(false);
      }
    },
    [currency, perPage, page]
  );

  const fetchGlobal = useCallback(async () => {
    try {
      const res = await fetch(`${API}/global`);
      if (!res.ok) return;
      const json = await res.json();
      setGlobalData(json.data);
    } catch {
      /* non-critical */
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

  const toggleWatch = (id) =>
    setWatchlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "market_cap_rank" ? "asc" : "desc");
    }
  };

  const visible = useMemo(() => {
    let list = coins;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => {
      const av = a[sortKey] ?? 0;
      const bv = b[sortKey] ?? 0;
      return sortDir === "asc" ? av - bv : bv - av;
    });
  }, [coins, search, sortKey, sortDir]);

  const SortHeader = ({ label, sortableKey, className = "" }) => (
    <th
      onClick={() => handleSort(sortableKey)}
      className={`px-3 py-3 text-xs font-semibold text-[#9CA3AF] cursor-pointer hover:text-white whitespace-nowrap select-none ${className}`}
    >
      {label}
      {sortKey === sortableKey && (
        <span className="ml-1 text-[#F59E0B]">
          {sortDir === "asc" ? "↑" : "↓"}
        </span>
      )}
    </th>
  );

  return (
    <div className="w-full bg-[#0E0E10] text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold m-0">
            Cryptocurrency Prices by Market Cap
          </h2>
          <p className="text-sm text-[#9CA3AF] mt-2 m-0">
            Live market data, refreshed automatically
            {lastUpdated && (
              <span className="text-[#6B7280]">
                {" · last updated "}
                {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>

        {/* Global stats */}
        {globalData && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
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
                value: `${globalData.market_cap_percentage?.btc?.toFixed(1) ?? "—"}%`,
              },
              {
                label: "Active Coins",
                value: globalData.active_cryptocurrencies?.toLocaleString() ?? "—",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#1A1A1D] border border-white/5 rounded-xl px-4 py-3.5"
              >
                <p className="text-[11px] text-[#9CA3AF] m-0">{stat.label}</p>
                <p className="text-lg font-bold mt-1 m-0 tabular-nums">
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

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search coins…"
            className="flex-1 min-w-[200px] bg-[#1A1A1D] border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#F59E0B] transition-colors placeholder:text-[#4B5563]"
          />
          <button
            onClick={() => fetchCoins(true)}
            className="px-4 py-2.5 text-xs font-medium rounded-lg border border-white/10 text-[#D1D5DB] hover:bg-white/5 hover:text-white transition-colors"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-[#EA3943]/10 border border-[#EA3943]/30 px-4 py-3 text-sm text-[#F87171]">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="rounded-xl border border-white/10 bg-[#1A1A1D] overflow-hidden">
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
                  <th className="px-3 py-3 text-xs font-semibold text-[#9CA3AF] text-right whitespace-nowrap">
                    Last 7 Days
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading &&
                  Array.from({ length: 10 }).map((_, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td colSpan={10} className="px-3 py-4">
                        <div className="h-4 bg-white/5 rounded animate-pulse" />
                      </td>
                    </tr>
                  ))}

                {!loading &&
                  visible.map((coin) => {
                    const spark = coin.sparkline_in_7d?.price ?? [];
                    const weekPositive =
                      (coin.price_change_percentage_7d_in_currency ?? 0) >= 0;
                    return (
                      <tr
                        key={coin.id}
                        className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                      >
                        <td className="px-3 py-3.5">
                          <button
                            onClick={() => toggleWatch(coin.id)}
                            className={`text-base leading-none transition-colors ${
                              watchlist.has(coin.id)
                                ? "text-[#F59E0B]"
                                : "text-[#4B5563] hover:text-[#9CA3AF]"
                            }`}
                            aria-label="Toggle watchlist"
                          >
                            ★
                          </button>
                        </td>
                        <td className="px-3 py-3.5 text-xs text-[#9CA3AF] tabular-nums">
                          {coin.market_cap_rank ?? "—"}
                        </td>
                        <td className="px-3 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={coin.image}
                              alt=""
                              className="w-6 h-6 rounded-full shrink-0"
                              loading="lazy"
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold truncate m-0">
                                {coin.name}
                              </p>
                              <p className="text-[11px] text-[#6B7280] uppercase m-0">
                                {coin.symbol}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3.5 text-right text-sm font-semibold tabular-nums whitespace-nowrap">
                          {fmtPrice(coin.current_price, sym)}
                        </td>
                        <td className="px-3 py-3.5 text-right whitespace-nowrap">
                          <PctCell value={coin.price_change_percentage_1h_in_currency} />
                        </td>
                        <td className="px-3 py-3.5 text-right whitespace-nowrap">
                          <PctCell value={coin.price_change_percentage_24h_in_currency} />
                        </td>
                        <td className="px-3 py-3.5 text-right whitespace-nowrap">
                          <PctCell value={coin.price_change_percentage_7d_in_currency} />
                        </td>
                        <td className="px-3 py-3.5 text-right text-sm text-[#D1D5DB] tabular-nums whitespace-nowrap">
                          {fmtBig(coin.total_volume, sym)}
                        </td>
                        <td className="px-3 py-3.5 text-right text-sm text-[#D1D5DB] tabular-nums whitespace-nowrap">
                          {fmtBig(coin.market_cap, sym)}
                        </td>
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
                      className="px-3 py-10 text-center text-sm text-[#6B7280]"
                    >
                      No coins matched your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/10">
            <span className="text-xs text-[#6B7280]">
              Showing {visible.length} coins · page {page}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3.5 py-1.5 text-xs font-medium rounded-md border border-white/10 text-[#D1D5DB] hover:bg-white/5 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-3.5 py-1.5 text-xs font-medium rounded-md border border-white/10 text-[#D1D5DB] hover:bg-white/5 hover:text-white transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#6B7280] mt-4">
          Market data provided by CoinGecko. Prices are for informational
          purposes only and are not investment advice.
        </p>
      </div>
    </div>
  );
}
