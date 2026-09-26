import { useEffect, useRef, useState } from "react";

const DISK_COLORS = [
  "bg-orange",
  "bg-white01",
  "bg-white02",
  "bg-orange/70",
  "bg-white01/70",
  "bg-orange/50",
  "bg-white02/70",
  "bg-orange/30",
];

function buildInitial(count) {
  return {
    A: Array.from({ length: count }, (_, i) => count - i),
    B: [],
    C: [],
  };
}

export default function TowerOfHanoi() {
  const [diskCount, setDiskCount] = useState(4);
  const [pegs, setPegs] = useState(() => buildInitial(4));
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState(0);
  const [solving, setSolving] = useState(false);
  const timeoutRef = useRef(null);

  const minMoves = 2 ** diskCount - 1;
  const won = pegs.C.length === diskCount;

  const restart = (count = diskCount) => {
    clearTimeout(timeoutRef.current);
    setSolving(false);
    setPegs(buildInitial(count));
    setSelected(null);
    setMoves(0);
  };

  const tryMove = (from, to, pegState = pegs) => {
    const fromStack = pegState[from];
    const toStack = pegState[to];
    if (fromStack.length === 0) return null;
    const disk = fromStack[fromStack.length - 1];
    if (toStack.length > 0 && toStack[toStack.length - 1] < disk) return null;
    return {
      ...pegState,
      [from]: fromStack.slice(0, -1),
      [to]: [...toStack, disk],
    };
  };

  const handlePegClick = (peg) => {
    if (solving) return;
    if (selected === null) {
      if (pegs[peg].length > 0) setSelected(peg);
      return;
    }
    if (selected === peg) {
      setSelected(null);
      return;
    }
    const next = tryMove(selected, peg);
    if (next) {
      setPegs(next);
      setMoves((m) => m + 1);
    }
    setSelected(null);
  };

  const autoSolve = () => {
    restart(diskCount);
    setSolving(true);
    const moveList = [];
    const solve = (n, from, to, via) => {
      if (n === 0) return;
      solve(n - 1, from, via, to);
      moveList.push([from, to]);
      solve(n - 1, via, to, from);
    };
    solve(diskCount, "A", "C", "B");

    let state = buildInitial(diskCount);
    let i = 0;
    const step = () => {
      if (i >= moveList.length) {
        setSolving(false);
        return;
      }
      const [from, to] = moveList[i];
      state = tryMove(from, to, state);
      setPegs(state);
      setMoves((m) => m + 1);
      i++;
      timeoutRef.current = setTimeout(step, 450);
    };
    step();
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const changeDisks = (n) => {
    setDiskCount(n);
    restart(n);
  };

  return (
    <div className="w-full max-w-lg mx-auto my-30 bg-black02 border border-white02/10 rounded-xl p-4 sm:p-6 font-poppins text-center">
      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1">
        Tower of Hanoi
      </h2>
      <p className="text-white02 text-sm mb-4">
        Click a peg to pick up the top disk, click another to drop it.
      </p>

      <div className="flex justify-center gap-2 mb-4 flex-wrap">
        {[3, 4, 5, 6].map((n) => (
          <button
            key={n}
            onClick={() => changeDisks(n)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              diskCount === n
                ? "bg-orange text-black01 border-orange"
                : "text-white02 border-white02/20 hover:border-orange"
            }`}
          >
            {n} disks
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4 text-sm text-white02 mb-4">
        <span>
          Moves: <span className="text-white01">{moves}</span>
        </span>
        <span>
          Minimum: <span className="text-white01">{minMoves}</span>
        </span>
      </div>

      {won && (
        <p className="text-orange font-medium mb-4">
          🎉 Solved in {moves} moves{moves === minMoves ? " — optimal!" : ""}
        </p>
      )}

      <div className="grid grid-cols-3 gap-3 mb-5 items-end h-48 sm:h-56">
        {["A", "B", "C"].map((peg) => (
          <button
            key={peg}
            onClick={() => handlePegClick(peg)}
            className={`relative h-full bg-black01 rounded-lg border flex flex-col-reverse items-center justify-start pb-2 transition-colors ${
              selected === peg
                ? "border-orange"
                : "border-white02/20 hover:border-orange/50"
            }`}
          >
            <div className="absolute bottom-2 w-1.5 h-[85%] bg-white02/20 rounded-full -z-0" />
            {pegs[peg].map((disk) => (
              <div
                key={disk}
                className={`relative z-10 h-4 sm:h-5 rounded-full mb-1 ${DISK_COLORS[disk - 1]}`}
                style={{ width: `${30 + disk * (100 / diskCount)}%` }}
              />
            ))}
            <span className="absolute -bottom-6 text-white02 text-xs">
              {peg}
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <button onClick={() => restart()} className="btn-secondary px-5">
          Reset
        </button>
        <button
          onClick={autoSolve}
          disabled={solving}
          className="btn-primary px-5 disabled:opacity-50"
        >
          {solving ? "Solving..." : "Auto Solve"}
        </button>
      </div>
    </div>
  );
}
