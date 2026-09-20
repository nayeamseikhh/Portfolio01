import { useState, useMemo, useRef, useEffect, useCallback } from "react";

/**
 * SheetGrid
 * A self-contained Google Sheets–style spreadsheet component built with
 * React + Tailwind CSS. No external libraries required.
 *
 * Features
 *  - Column letters (A, B, C…) and numbered rows with a frozen header
 *  - Click to select a cell, double-click (or just type) to edit
 *  - Keyboard navigation: arrows, Tab, Enter, Escape, Delete
 *  - Formula support starting with "=" :
 *      =A1+B2          arithmetic on cell refs and numbers
 *      =SUM(A1:A5)     SUM, AVERAGE, MIN, MAX, COUNT over a range
 *  - Formula bar showing the raw value of the selected cell
 *  - Add / remove rows and columns
 *  - Export the sheet to CSV
 *
 * Usage: <SheetGrid /> or <SheetGrid initialRows={30} initialCols={10} />
 */

const colLabel = (i) => {
  let s = "";
  i += 1;
  while (i > 0) {
    const rem = (i - 1) % 26;
    s = String.fromCharCode(65 + rem) + s;
    i = Math.floor((i - 1) / 26);
  }
  return s;
};

const colIndexFromLabel = (label) => {
  let n = 0;
  for (const ch of label.toUpperCase()) {
    n = n * 26 + (ch.charCodeAt(0) - 64);
  }
  return n - 1;
};

const cellKey = (r, c) => `${colLabel(c)}${r + 1}`;

const parseRef = (ref) => {
  const m = /^([A-Za-z]+)(\d+)$/.exec(ref.trim());
  if (!m) return null;
  return { row: parseInt(m[2], 10) - 1, col: colIndexFromLabel(m[1]) };
};

export default function SheetGrid({ initialRows = 24, initialCols = 8 }) {
  const [rowCount, setRowCount] = useState(initialRows);
  const [colCount, setColCount] = useState(initialCols);
  const [data, setData] = useState({}); // { "A1": "raw value" }
  const [selected, setSelected] = useState({ row: 0, col: 0 });
  const [editing, setEditing] = useState(null); // { row, col }
  const [draft, setDraft] = useState("");
  const gridRef = useRef(null);
  const inputRef = useRef(null);

  /* ---------------- formula evaluation ---------------- */

  const evaluate = useCallback(
    (raw, seen = new Set()) => {
      if (raw === undefined || raw === null || raw === "") return "";
      if (typeof raw !== "string" || !raw.startsWith("=")) return raw;

      let expr = raw.slice(1);

      try {
        // Range functions: SUM / AVERAGE / MIN / MAX / COUNT
        expr = expr.replace(
          /\b(SUM|AVERAGE|AVG|MIN|MAX|COUNT)\s*\(\s*([A-Za-z]+\d+)\s*:\s*([A-Za-z]+\d+)\s*\)/gi,
          (_, fn, startRef, endRef) => {
            const a = parseRef(startRef);
            const b = parseRef(endRef);
            if (!a || !b) return "0";

            const values = [];
            for (
              let r = Math.min(a.row, b.row);
              r <= Math.max(a.row, b.row);
              r++
            ) {
              for (
                let c = Math.min(a.col, b.col);
                c <= Math.max(a.col, b.col);
                c++
              ) {
                const k = cellKey(r, c);
                if (seen.has(k)) continue;
                const v = evaluate(data[k], new Set([...seen, k]));
                const n = parseFloat(v);
                if (!isNaN(n)) values.push(n);
              }
            }

            const f = fn.toUpperCase();
            if (values.length === 0) return "0";
            if (f === "SUM") return String(values.reduce((s, n) => s + n, 0));
            if (f === "AVERAGE" || f === "AVG")
              return String(values.reduce((s, n) => s + n, 0) / values.length);
            if (f === "MIN") return String(Math.min(...values));
            if (f === "MAX") return String(Math.max(...values));
            if (f === "COUNT") return String(values.length);
            return "0";
          },
        );

        // Single cell references
        expr = expr.replace(/\b([A-Za-z]+\d+)\b/g, (ref) => {
          const pos = parseRef(ref);
          if (!pos) return "0";
          const k = cellKey(pos.row, pos.col);
          if (seen.has(k)) return "0"; // circular guard
          const v = evaluate(data[k], new Set([...seen, k]));
          const n = parseFloat(v);
          return isNaN(n) ? "0" : String(n);
        });

        // Only allow safe characters before evaluating
        if (!/^[\d\s+\-*/().,%]*$/.test(expr)) return "#ERROR";

        // eslint-disable-next-line no-new-func
        const result = Function(`"use strict"; return (${expr || 0});`)();
        if (typeof result !== "number" || !isFinite(result)) return "#ERROR";
        return String(Math.round(result * 1e10) / 1e10);
      } catch {
        return "#ERROR";
      }
    },
    [data],
  );

  const displayValue = useCallback(
    (r, c) => evaluate(data[cellKey(r, c)]),
    [data, evaluate],
  );

  /* ---------------- editing ---------------- */

  const startEditing = (r, c, initial) => {
    setEditing({ row: r, col: c });
    setDraft(initial !== undefined ? initial : (data[cellKey(r, c)] ?? ""));
  };

  const commit = (move = "down") => {
    if (!editing) return;
    const k = cellKey(editing.row, editing.col);
    setData((prev) => {
      const next = { ...prev };
      if (draft === "") delete next[k];
      else next[k] = draft;
      return next;
    });
    const { row, col } = editing;
    setEditing(null);
    setDraft("");
    if (move === "down")
      setSelected({ row: Math.min(row + 1, rowCount - 1), col });
    else if (move === "right")
      setSelected({ row, col: Math.min(col + 1, colCount - 1) });
    else setSelected({ row, col });
    gridRef.current?.focus();
  };

  const cancel = () => {
    setEditing(null);
    setDraft("");
    gridRef.current?.focus();
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  /* ---------------- keyboard ---------------- */

  const onKeyDown = (e) => {
    if (editing) return;
    const { row, col } = selected;

    const move = (dr, dc) => {
      e.preventDefault();
      setSelected({
        row: Math.max(0, Math.min(rowCount - 1, row + dr)),
        col: Math.max(0, Math.min(colCount - 1, col + dc)),
      });
    };

    switch (e.key) {
      case "ArrowUp":
        return move(-1, 0);
      case "ArrowDown":
        return move(1, 0);
      case "ArrowLeft":
        return move(0, -1);
      case "ArrowRight":
        return move(0, 1);
      case "Tab":
        e.preventDefault();
        return setSelected({
          row,
          col: e.shiftKey
            ? Math.max(0, col - 1)
            : Math.min(colCount - 1, col + 1),
        });
      case "Enter":
        e.preventDefault();
        return startEditing(row, col);
      case "Backspace":
      case "Delete":
        e.preventDefault();
        return setData((prev) => {
          const next = { ...prev };
          delete next[cellKey(row, col)];
          return next;
        });
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          startEditing(row, col, e.key);
        }
    }
  };

  /* ---------------- toolbar actions ---------------- */

  const exportCsv = () => {
    const rows = [];
    for (let r = 0; r < rowCount; r++) {
      const cells = [];
      for (let c = 0; c < colCount; c++) {
        const v = String(displayValue(r, c) ?? "");
        cells.push(/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
      }
      rows.push(cells.join(","));
    }
    const blob = new Blob([rows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sheet.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setData({});
    setEditing(null);
  };

  const selectedKey = cellKey(selected.row, selected.col);
  const selectedRaw = data[selectedKey] ?? "";

  const columns = useMemo(
    () => Array.from({ length: colCount }, (_, i) => i),
    [colCount],
  );
  const rows = useMemo(
    () => Array.from({ length: rowCount }, (_, i) => i),
    [rowCount],
  );

  const btn =
    "px-3 py-1.5 text-xs font-medium rounded-md border border-white/10 text-[#D1D5DB] hover:bg-white/5 hover:text-white transition-colors";

  return (
    <div className="w-full bg-[#0E0E10] text-white py-25">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1A1A1D]">
          {/* Title bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold m-0">Sheet</h2>
              <p className="text-xs text-[#9CA3AF] mt-0.5 m-0">
                Type values or formulas like{" "}
                <code className="text-[#F59E0B]">=SUM(A1:A5)</code>
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={exportCsv} className={btn}>
                Export CSV
              </button>
              <button onClick={clearAll} className={btn}>
                Clear
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 px-5 py-3 border-b border-white/10">
            <button onClick={() => setRowCount((n) => n + 1)} className={btn}>
              + Row
            </button>
            <button
              onClick={() => setRowCount((n) => Math.max(1, n - 1))}
              className={btn}
            >
              − Row
            </button>
            <button onClick={() => setColCount((n) => n + 1)} className={btn}>
              + Column
            </button>
            <button
              onClick={() => setColCount((n) => Math.max(1, n - 1))}
              className={btn}
            >
              − Column
            </button>
            <span className="ml-auto text-xs text-[#6B7280]">
              {rowCount} rows × {colCount} cols
            </span>
          </div>

          {/* Formula bar */}
          <div className="flex items-stretch border-b border-white/10 bg-[#141417]">
            <div className="flex items-center justify-center w-16 shrink-0 text-xs font-semibold text-[#F59E0B] border-r border-white/10">
              {selectedKey}
            </div>
            <input
              value={editing ? draft : selectedRaw}
              onChange={(e) => {
                if (!editing)
                  startEditing(selected.row, selected.col, e.target.value);
                else setDraft(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") commit("down");
                if (e.key === "Escape") cancel();
              }}
              placeholder="Enter a value or formula"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-[#4B5563]"
            />
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="overflow-auto max-h-[520px] outline-none"
          >
            <table className="border-collapse text-sm select-none">
              <thead className="sticky top-0 z-20">
                <tr>
                  <th className="sticky left-0 z-30 w-12 min-w-12 bg-[#232329] border border-white/10 text-[11px] text-[#9CA3AF] font-medium" />
                  {columns.map((c) => (
                    <th
                      key={c}
                      className={`min-w-[112px] px-3 py-1.5 bg-[#232329] border border-white/10 text-[11px] font-semibold ${
                        selected.col === c ? "text-[#F59E0B]" : "text-[#9CA3AF]"
                      }`}
                    >
                      {colLabel(c)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r}>
                    <td
                      className={`sticky left-0 z-10 w-12 min-w-12 text-center bg-[#232329] border border-white/10 text-[11px] font-semibold ${
                        selected.row === r ? "text-[#F59E0B]" : "text-[#9CA3AF]"
                      }`}
                    >
                      {r + 1}
                    </td>
                    {columns.map((c) => {
                      const isSel = selected.row === r && selected.col === c;
                      const isEditing =
                        editing && editing.row === r && editing.col === c;
                      const val = displayValue(r, c);
                      const numeric =
                        val !== "" && !isNaN(parseFloat(val)) && isFinite(val);

                      return (
                        <td
                          key={c}
                          onClick={() => {
                            if (!isEditing) {
                              setSelected({ row: r, col: c });
                              gridRef.current?.focus();
                            }
                          }}
                          onDoubleClick={() => startEditing(r, c)}
                          className={`relative border border-white/10 h-8 px-2 cursor-cell ${
                            isSel ? "bg-[#F59E0B]/10" : "hover:bg-white/[0.03]"
                          } ${numeric ? "text-right tabular-nums" : "text-left"} ${
                            val === "#ERROR"
                              ? "text-[#F87171]"
                              : "text-[#E5E7EB]"
                          }`}
                        >
                          {isEditing ? (
                            <input
                              ref={inputRef}
                              value={draft}
                              onChange={(e) => setDraft(e.target.value)}
                              onBlur={() => commit("none")}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  commit("down");
                                } else if (e.key === "Tab") {
                                  e.preventDefault();
                                  commit("right");
                                } else if (e.key === "Escape") {
                                  e.preventDefault();
                                  cancel();
                                }
                              }}
                              className="absolute inset-0 w-full h-full px-2 bg-[#0E0E10] text-white text-sm outline-none ring-2 ring-[#F59E0B] ring-inset"
                            />
                          ) : (
                            <>
                              <span className="block truncate">{val}</span>
                              {isSel && (
                                <span className="pointer-events-none absolute inset-0 ring-2 ring-[#F59E0B] ring-inset" />
                              )}
                            </>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Status bar */}
          <div className="px-5 py-2.5 border-t border-white/10 text-[11px] text-[#6B7280]">
            Click a cell and start typing · Enter to confirm · Tab moves right ·
            Esc cancels · Delete clears
          </div>
        </div>
      </div>
    </div>
  );
}
