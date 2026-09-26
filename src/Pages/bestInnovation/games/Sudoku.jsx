import { useState } from "react";

const SIZE = 9;
const BOX = 3;

function emptyGrid() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function isValid(grid, r, c, val) {
  for (let i = 0; i < SIZE; i++) {
    if (grid[r][i] === val || grid[i][c] === val) return false;
  }
  const br = Math.floor(r / BOX) * BOX;
  const bc = Math.floor(c / BOX) * BOX;
  for (let i = 0; i < BOX; i++) {
    for (let j = 0; j < BOX; j++) {
      if (grid[br + i][bc + j] === val) return false;
    }
  }
  return true;
}

function shuffledDigits() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function fillGrid(grid) {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] === 0) {
        for (const val of shuffledDigits()) {
          if (isValid(grid, r, c, val)) {
            grid[r][c] = val;
            if (fillGrid(grid)) return true;
            grid[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solveGrid(grid) {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] === 0) {
        for (let val = 1; val <= 9; val++) {
          if (isValid(grid, r, c, val)) {
            grid[r][c] = val;
            if (solveGrid(grid)) return true;
            grid[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

const DIFFICULTY_HOLES = { Easy: 36, Medium: 46, Hard: 54 };

function generatePuzzle(difficulty) {
  const solution = emptyGrid();
  fillGrid(solution);
  const puzzle = solution.map((row) => [...row]);

  const holes = DIFFICULTY_HOLES[difficulty];
  const positions = [];
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) positions.push([r, c]);
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  positions.slice(0, holes).forEach(([r, c]) => {
    puzzle[r][c] = 0;
  });

  return { puzzle, solution };
}

export default function Sudoku() {
  const [difficulty, setDifficulty] = useState("Easy");
  const [puzzle, setPuzzle] = useState(() => generatePuzzle("Easy"));
  const [grid, setGrid] = useState(() => puzzle.puzzle.map((r) => [...r]));
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");

  const newPuzzle = (diff = difficulty) => {
    const p = generatePuzzle(diff);
    setPuzzle(p);
    setGrid(p.puzzle.map((r) => [...r]));
    setSelected(null);
    setMessage("");
  };

  const fixedCell = (r, c) => puzzle.puzzle[r][c] !== 0;

  const setValue = (val) => {
    if (!selected) return;
    const [r, c] = selected;
    if (fixedCell(r, c)) return;
    const next = grid.map((row) => [...row]);
    next[r][c] = val;
    setGrid(next);
    setMessage("");
  };

  const checkSolution = () => {
    const correct = grid.every((row, r) =>
      row.every((val, c) => val === puzzle.solution[r][c]),
    );
    setMessage(
      correct ? "✅ Correct! Well solved." : "❌ Not quite right yet.",
    );
  };

  const revealSolution = () => {
    setGrid(puzzle.solution.map((r) => [...r]));
    setMessage("Solution revealed.");
  };

  const solveFromCurrent = () => {
    const attempt = grid.map((row) => [...row]);
    if (solveGrid(attempt)) {
      setGrid(attempt);
      setMessage("Solved from current board.");
    } else {
      setMessage("This board can't be solved — check for mistakes.");
    }
  };

  const clearEntries = () => {
    setGrid(puzzle.puzzle.map((r) => [...r]));
    setMessage("");
  };

  return (
    <div className="w-full max-w-lg mx-auto my-30 bg-black02 border border-white02/10 rounded-xl p-4 sm:p-6 font-poppins text-center">
      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1">
        Sudoku
      </h2>
      <p className="text-white02 text-sm mb-4">
        Generated puzzles with instant check &amp; solve.
      </p>

      <div className="flex justify-center gap-2 mb-4">
        {Object.keys(DIFFICULTY_HOLES).map((d) => (
          <button
            key={d}
            onClick={() => {
              setDifficulty(d);
              newPuzzle(d);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              difficulty === d
                ? "bg-orange text-black01 border-orange"
                : "text-white02 border-white02/20 hover:border-orange"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {message && (
        <p className="text-orange text-sm font-medium mb-3">{message}</p>
      )}

      <div className="inline-block border-2 border-orange/50 mb-5 mx-auto">
        {grid.map((row, r) => (
          <div key={r} className="flex">
            {row.map((val, c) => {
              const isSel = selected && selected[0] === r && selected[1] === c;
              const fixed = fixedCell(r, c);
              return (
                <button
                  key={c}
                  onClick={() => setSelected([r, c])}
                  className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-sm sm:text-base font-medium
                    border border-white02/10
                    ${c % 3 === 0 ? "border-l-2 border-l-orange/40" : ""}
                    ${r % 3 === 0 ? "border-t-2 border-t-orange/40" : ""}
                    ${c === 8 ? "border-r-2 border-r-orange/40" : ""}
                    ${r === 8 ? "border-b-2 border-b-orange/40" : ""}
                    ${fixed ? "bg-black01 text-white01" : "bg-black02 text-orange"}
                    ${isSel ? "ring-2 ring-orange ring-inset" : ""}
                  `}
                >
                  {val !== 0 ? val : ""}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-1.5 max-w-xs mx-auto mb-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            onClick={() => setValue(n)}
            className="bg-black01 border border-white02/20 hover:border-orange text-white01 rounded-md py-2 text-sm"
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => setValue(0)}
          className="bg-black01 border border-white02/20 hover:border-orange text-white02 rounded-md py-2 text-sm"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <button onClick={() => newPuzzle()} className="btn-primary px-4">
          New Puzzle
        </button>
        <button onClick={checkSolution} className="btn-secondary px-4">
          Check
        </button>
        <button onClick={solveFromCurrent} className="btn-secondary px-4">
          Solve
        </button>
        <button onClick={revealSolution} className="btn-secondary px-4">
          Reveal
        </button>
        <button onClick={clearEntries} className="btn-secondary px-4">
          Clear
        </button>
      </div>
    </div>
  );
}
