import { useEffect, useRef, useState } from "react";

const LEVELS = {
  Easy: { rows: 8, cols: 8, mines: 10 },
  Medium: { rows: 10, cols: 10, mines: 18 },
  Hard: { rows: 12, cols: 10, mines: 28 },
};

function buildBoard(rows, cols, mines, safeR, safeC) {
  const cells = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      r,
      c,
      mine: false,
      revealed: false,
      flagged: false,
      count: 0,
    })),
  );

  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    const tooClose = Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1;
    if (cells[r][c].mine || tooClose) continue;
    cells[r][c].mine = true;
    placed++;
  }

  const neighbors = (r, c) => {
    const out = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr,
          nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) out.push([nr, nc]);
      }
    }
    return out;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (cells[r][c].mine) continue;
      cells[r][c].count = neighbors(r, c).filter(
        ([nr, nc]) => cells[nr][nc].mine,
      ).length;
    }
  }

  return { cells, neighbors };
}

const NUM_COLORS = [
  "",
  "text-blue-400",
  "text-green-400",
  "text-red-400",
  "text-purple-400",
  "text-yellow-500",
  "text-teal-400",
  "text-white01",
  "text-white02",
];

export default function Minesweeper() {
  const [level, setLevel] = useState("Easy");
  const [board, setBoard] = useState(null);
  const [status, setStatus] = useState("ready"); // ready | playing | won | lost
  const [seconds, setSeconds] = useState(0);
  const neighborsRef = useRef(null);

  const { rows, cols, mines } = LEVELS[level];

  useEffect(() => {
    reset(level);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => {
    if (status !== "playing") return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [status]);

  const reset = (lvl = level) => {
    const { rows, cols } = LEVELS[lvl];
    const blank = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => ({
        r,
        c,
        mine: false,
        revealed: false,
        flagged: false,
        count: 0,
      })),
    );
    setBoard(blank);
    neighborsRef.current = null;
    setStatus("ready");
    setSeconds(0);
  };

  const flaggedCount = board ? board.flat().filter((c) => c.flagged).length : 0;

  const reveal = (r, c) => {
    if (!board || status === "won" || status === "lost") return;
    if (board[r][c].flagged) return;

    let current = board;
    let neighborsFn = neighborsRef.current;

    if (status === "ready") {
      const built = buildBoard(rows, cols, mines, r, c);
      current = built.cells;
      neighborsFn = built.neighbors;
      neighborsRef.current = neighborsFn;
      setStatus("playing");
    }

    const next = current.map((row) => row.map((cell) => ({ ...cell })));

    if (next[r][c].mine) {
      next.forEach((row) =>
        row.forEach((cell) => {
          if (cell.mine) cell.revealed = true;
        }),
      );
      setBoard(next);
      setStatus("lost");
      return;
    }

    const stack = [[r, c]];
    const seen = new Set();
    while (stack.length) {
      const [cr, cc] = stack.pop();
      const key = `${cr}-${cc}`;
      if (seen.has(key)) continue;
      seen.add(key);
      next[cr][cc].revealed = true;
      if (next[cr][cc].count === 0) {
        neighborsFn(cr, cc).forEach(([nr, nc]) => {
          if (!next[nr][nc].revealed && !next[nr][nc].mine)
            stack.push([nr, nc]);
        });
      }
    }

    const won = next.every((row) =>
      row.every((cell) => cell.mine || cell.revealed),
    );
    setBoard(next);
    if (won) setStatus("won");
  };

  const toggleFlag = (e, r, c) => {
    e.preventDefault();
    if (!board || status === "won" || status === "lost" || status === "ready")
      return;
    setBoard((prev) => {
      const next = prev.map((row) => row.map((cell) => ({ ...cell })));
      if (!next[r][c].revealed) next[r][c].flagged = !next[r][c].flagged;
      return next;
    });
  };

  if (!board) return null;

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="w-full max-w-xl mx-auto bg-black02 border border-white02/10 rounded-xl p-4 sm:p-6 my-30 font-poppins text-center">
      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1">
        Minesweeper
      </h2>
      <p className="text-white02 text-sm mb-4">
        Left click to reveal, right click (or long-press) to flag.
      </p>

      <div className="flex justify-center gap-2 mb-4">
        {Object.keys(LEVELS).map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              level === l
                ? "bg-orange text-black01 border-orange"
                : "text-white02 border-white02/20 hover:border-orange"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4 text-sm text-white02 mb-3">
        <span>💣 {mines - flaggedCount}</span>
        <span>
          ⏱ {mm}:{ss}
        </span>
      </div>

      {status === "lost" && (
        <p className="text-red-400 font-medium mb-3">💥 Game over!</p>
      )}
      {status === "won" && (
        <p className="text-orange font-medium mb-3">
          🎉 You cleared the field!
        </p>
      )}

      <div className="overflow-x-auto mb-5">
        <div
          className="inline-grid gap-[2px] bg-white02/10 p-1 rounded-lg mx-auto"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(22px, 30px))` }}
        >
          {board.flat().map((cell) => (
            <button
              key={`${cell.r}-${cell.c}`}
              onClick={() => reveal(cell.r, cell.c)}
              onContextMenu={(e) => toggleFlag(e, cell.r, cell.c)}
              className={`aspect-square rounded-[3px] flex items-center justify-center text-xs sm:text-sm font-semibold ${
                cell.revealed
                  ? cell.mine
                    ? "bg-red-500/70"
                    : "bg-black01"
                  : "bg-black02 hover:bg-black01 border border-white02/10"
              } ${cell.count > 0 && cell.revealed ? NUM_COLORS[cell.count] : ""}`}
            >
              {cell.revealed
                ? cell.mine
                  ? "💣"
                  : cell.count > 0
                    ? cell.count
                    : ""
                : cell.flagged
                  ? "🚩"
                  : ""}
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => reset()} className="btn-primary px-6">
        New Game
      </button>
    </div>
  );
}
