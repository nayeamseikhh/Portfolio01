import { useCallback, useEffect, useRef, useState } from "react";

const SIZE = 4;

function emptyGrid() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function addRandomTile(grid) {
  const empty = [];
  grid.forEach((row, r) => row.forEach((v, c) => { if (v === 0) empty.push([r, c]); }));
  if (empty.length === 0) return grid;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  const next = grid.map((row) => [...row]);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function slideRowLeft(row, addScore) {
  const filtered = row.filter((v) => v !== 0);
  const merged = [];
  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i] === filtered[i + 1]) {
      const val = filtered[i] * 2;
      merged.push(val);
      addScore(val);
      i++;
    } else {
      merged.push(filtered[i]);
    }
  }
  while (merged.length < SIZE) merged.push(0);
  return merged;
}

function transpose(grid) {
  return grid[0].map((_, c) => grid.map((row) => row[c]));
}

function reverseRows(grid) {
  return grid.map((row) => [...row].reverse());
}

function move(grid, direction, addScore) {
  let g = grid.map((row) => [...row]);
  if (direction === "up") g = transpose(g);
  if (direction === "down") g = reverseRows(transpose(g));
  if (direction === "right") g = reverseRows(g);

  g = g.map((row) => slideRowLeft(row, addScore));

  if (direction === "up") g = transpose(g);
  if (direction === "down") g = transpose(reverseRows(g));
  if (direction === "right") g = reverseRows(g);

  return g;
}

function gridsEqual(a, b) {
  return a.every((row, r) => row.every((v, c) => v === b[r][c]));
}

function canMove(grid) {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] === 0) return true;
      if (c < SIZE - 1 && grid[r][c] === grid[r][c + 1]) return true;
      if (r < SIZE - 1 && grid[r][c] === grid[r + 1][c]) return true;
    }
  }
  return false;
}

const TILE_STYLES = {
  0: "bg-black01",
  2: "bg-white01 text-black01",
  4: "bg-white02 text-black01",
  8: "bg-orange/70 text-black01",
  16: "bg-orange text-black01",
  32: "bg-orange text-black01",
  64: "bg-orange text-black01",
  128: "bg-orange text-black01",
  256: "bg-orange text-black01",
  512: "bg-orange text-black01",
  1024: "bg-orange text-white01",
  2048: "bg-orange text-white01",
};

export default function Game2048() {
  const [grid, setGrid] = useState(() => addRandomTile(addRandomTile(emptyGrid())));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [status, setStatus] = useState("playing"); // playing | won | over
  const touchStart = useRef(null);

  const handleMove = useCallback(
    (direction) => {
      if (status === "over") return;
      let gained = 0;
      const next = move(grid, direction, (v) => { gained += v; });
      if (gridsEqual(next, grid)) return;

      const withTile = addRandomTile(next);
      setGrid(withTile);
      setScore((s) => {
        const newScore = s + gained;
        setBest((b) => Math.max(b, newScore));
        return newScore;
      });

      if (status !== "won" && withTile.flat().includes(2048)) setStatus("won");
      else if (!canMove(withTile)) setStatus("over");
    },
    [grid, status]
  );

  useEffect(() => {
    const onKey = (e) => {
      const map = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" };
      if (map[e.key]) {
        e.preventDefault();
        handleMove(map[e.key]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleMove]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 25) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      handleMove(dx > 0 ? "right" : "left");
    } else {
      handleMove(dy > 0 ? "down" : "up");
    }
    touchStart.current = null;
  };

  const restart = () => {
    setGrid(addRandomTile(addRandomTile(emptyGrid())));
    setScore(0);
    setStatus("playing");
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-black02 border border-white02/10 rounded-xl p-4 sm:p-6 font-poppins text-center">
      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1">
        2048
      </h2>
      <p className="text-white02 text-sm mb-4">
        Use arrow keys, or swipe on mobile, to merge tiles.
      </p>

      <div className="flex justify-center gap-3 mb-4">
        <div className="bg-black01 border border-white02/20 rounded-lg px-4 py-2">
          <p className="text-white02 text-[10px] uppercase">Score</p>
          <p className="text-white01 font-semibold">{score}</p>
        </div>
        <div className="bg-black01 border border-white02/20 rounded-lg px-4 py-2">
          <p className="text-white02 text-[10px] uppercase">Best</p>
          <p className="text-orange font-semibold">{best}</p>
        </div>
      </div>

      {status === "won" && <p className="text-orange font-medium mb-3">🎉 You reached 2048!</p>}
      {status === "over" && <p className="text-red-400 font-medium mb-3">Game over — no more moves.</p>}

      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="grid grid-cols-4 gap-2 bg-black01 p-2 rounded-lg mb-5 mx-auto max-w-[320px] touch-none select-none"
      >
        {grid.flat().map((val, i) => (
          <div
            key={i}
            className={`aspect-square rounded-md flex items-center justify-center font-bold text-lg sm:text-xl transition-colors ${
              TILE_STYLES[val] || "bg-orange text-white01"
            }`}
          >
            {val !== 0 ? val : ""}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1.5 max-w-[150px] mx-auto mb-4 sm:hidden">
        <div />
        <button onClick={() => handleMove("up")} className="btn-secondary py-1.5">▲</button>
        <div />
        <button onClick={() => handleMove("left")} className="btn-secondary py-1.5">◀</button>
        <button onClick={() => handleMove("down")} className="btn-secondary py-1.5">▼</button>
        <button onClick={() => handleMove("right")} className="btn-secondary py-1.5">▶</button>
      </div>

      <button onClick={restart} className="btn-primary px-6">
        New Game
      </button>
    </div>
  );
}
