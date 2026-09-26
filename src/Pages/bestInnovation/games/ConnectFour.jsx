import { useEffect, useState } from "react";

const ROWS = 6;
const COLS = 7;

function emptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function cloneBoard(board) {
  return board.map((row) => [...row]);
}

function getDropRow(board, col) {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (!board[r][col]) return r;
  }
  return -1;
}

function checkWinner(board) {
  const dirs = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const player = board[r][c];
      if (!player) continue;
      for (const [dr, dc] of dirs) {
        const cells = [[r, c]];
        for (let i = 1; i < 4; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;
          if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) break;
          if (board[nr][nc] !== player) break;
          cells.push([nr, nc]);
        }
        if (cells.length === 4) return { player, cells };
      }
    }
  }
  const full = board.every((row) => row.every(Boolean));
  if (full) return { player: "draw", cells: [] };
  return null;
}

function pickComputerMove(board) {
  const validCols = [];
  for (let c = 0; c < COLS; c++) {
    if (getDropRow(board, c) !== -1) validCols.push(c);
  }

  // Win if possible
  for (const c of validCols) {
    const test = cloneBoard(board);
    const r = getDropRow(test, c);
    test[r][c] = "yellow";
    if (checkWinner(test)?.player === "yellow") return c;
  }
  // Block opponent
  for (const c of validCols) {
    const test = cloneBoard(board);
    const r = getDropRow(test, c);
    test[r][c] = "red";
    if (checkWinner(test)?.player === "red") return c;
  }
  // Prefer center columns
  const centerOrder = [3, 2, 4, 1, 5, 0, 6];
  for (const c of centerOrder) {
    if (validCols.includes(c)) return c;
  }
  return validCols[0];
}

export default function ConnectFour() {
  const [board, setBoard] = useState(emptyBoard);
  const [turn, setTurn] = useState("red");
  const [mode, setMode] = useState("computer");
  const [scores, setScores] = useState({ red: 0, yellow: 0 });

  const result = checkWinner(board);

  useEffect(() => {
    if (mode === "computer" && turn === "yellow" && !result) {
      const timer = setTimeout(() => {
        const col = pickComputerMove(board);
        drop(col, "yellow");
      }, 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, mode, board, result]);

  useEffect(() => {
    if (result && result.player !== "draw") {
      setScores((s) => ({ ...s, [result.player]: s[result.player] + 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.player]);

  const drop = (col, player) => {
    setBoard((prev) => {
      const r = getDropRow(prev, col);
      if (r === -1) return prev;
      const next = cloneBoard(prev);
      next[r][col] = player;
      return next;
    });
    setTurn(player === "red" ? "yellow" : "red");
  };

  const handleClick = (col) => {
    if (result) return;
    if (mode === "computer" && turn === "yellow") return;
    if (getDropRow(board, col) === -1) return;
    drop(col, turn);
  };

  const reset = () => {
    setBoard(emptyBoard());
    setTurn("red");
  };

  const switchMode = (m) => {
    setMode(m);
    setBoard(emptyBoard());
    setTurn("red");
    setScores({ red: 0, yellow: 0 });
  };

  const statusText = result
    ? result.player === "draw"
      ? "It's a draw!"
      : `${result.player === "red" ? "Red" : "Yellow"} wins!`
    : `${turn === "red" ? "Red" : "Yellow"}'s turn${
        mode === "computer" && turn === "yellow" ? " (thinking...)" : ""
      }`;

  const isWinCell = (r, c) =>
    result?.cells?.some(([wr, wc]) => wr === r && wc === c);

  return (
    <div className="w-full max-w-xl mx-auto bg-black02 border border-white02/10 my-30 rounded-xl p-4 sm:p-6 font-poppins text-center">
      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1">
        Connect Four
      </h2>
      <p className="text-white02 text-sm mb-4">
        Drop pieces and connect four in a row to win.
      </p>

      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => switchMode("computer")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            mode === "computer"
              ? "bg-orange text-black01 border-orange"
              : "text-white02 border-white02/20 hover:border-orange"
          }`}
        >
          vs Computer
        </button>
        <button
          onClick={() => switchMode("two")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            mode === "two"
              ? "bg-orange text-black01 border-orange"
              : "text-white02 border-white02/20 hover:border-orange"
          }`}
        >
          2 Players
        </button>
      </div>

      <div className="flex justify-center gap-4 text-sm text-white02 mb-3">
        <span>
          🔴 Red: <span className="text-white01">{scores.red}</span>
        </span>
        <span>
          🟡 Yellow: <span className="text-white01">{scores.yellow}</span>
        </span>
      </div>

      <p className="text-orange font-medium mb-4">{statusText}</p>

      <div className="inline-block bg-black01 border border-white02/20 rounded-lg p-2 mb-5 overflow-x-auto max-w-full">
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 w-[280px] sm:w-[420px]">
          {board.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => handleClick(c)}
                className="aspect-square rounded-full bg-black02 flex items-center justify-center"
              >
                <span
                  className={`w-[80%] h-[80%] rounded-full transition-colors ${
                    cell === "red"
                      ? "bg-red-500"
                      : cell === "yellow"
                        ? "bg-yellow-400"
                        : "bg-white02/10"
                  } ${isWinCell(r, c) ? "ring-2 ring-orange" : ""}`}
                />
              </button>
            )),
          )}
        </div>
      </div>

      <div>
        <button onClick={reset} className="btn-primary px-6">
          New Game
        </button>
      </div>
    </div>
  );
}
