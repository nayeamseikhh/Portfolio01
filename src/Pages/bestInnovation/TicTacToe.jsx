import { useEffect, useState } from "react";

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function calculateWinner(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  if (board.every(Boolean)) return { winner: "draw", line: [] };
  return null;
}

function minimax(board, player, ai, human) {
  const result = calculateWinner(board);
  if (result) {
    if (result.winner === ai) return { score: 1 };
    if (result.winner === human) return { score: -1 };
    return { score: 0 };
  }

  const moves = [];
  board.forEach((cell, i) => {
    if (!cell) {
      const next = [...board];
      next[i] = player;
      const { score } = minimax(next, player === ai ? human : ai, ai, human);
      moves.push({ index: i, score });
    }
  });

  if (player === ai) {
    return moves.reduce((best, m) => (m.score > best.score ? m : best), {
      score: -Infinity,
    });
  }
  return moves.reduce((best, m) => (m.score < best.score ? m : best), {
    score: Infinity,
  });
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [mode, setMode] = useState("computer"); // "computer" | "two"
  const [turn, setTurn] = useState("X");
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });

  const result = calculateWinner(board);

  useEffect(() => {
    if (mode === "computer" && turn === "O" && !result) {
      const timer = setTimeout(() => {
        const best = minimax(board, "O", "O", "X");
        if (best.index !== undefined) {
          const next = [...board];
          next[best.index] = "O";
          setBoard(next);
          setTurn("X");
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [turn, mode, board, result]);

  useEffect(() => {
    if (result) {
      setScores((s) => ({ ...s, [result.winner]: (s[result.winner] || 0) + 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.winner]);

  const handleClick = (i) => {
    if (board[i] || result) return;
    if (mode === "computer" && turn === "O") return;
    const next = [...board];
    next[i] = turn;
    setBoard(next);
    setTurn(turn === "X" ? "O" : "X");
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
  };

  const switchMode = (m) => {
    setMode(m);
    setBoard(Array(9).fill(null));
    setTurn("X");
    setScores({ X: 0, O: 0, draw: 0 });
  };

  const statusText = result
    ? result.winner === "draw"
      ? "It's a draw!"
      : `${result.winner} wins!`
    : `${turn}'s turn${mode === "computer" && turn === "O" ? " (thinking...)" : ""}`;

  return (
    <div className="w-full max-w-sm mx-auto bg-black02 border border-white02/10 rounded-xl p-4 sm:p-6 font-poppins text-center">
      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1">
        Tic Tac Toe
      </h2>
      <p className="text-white02 text-sm mb-4">
        Classic 3×3 — play a friend or challenge the computer.
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

      <div className="flex justify-center gap-4 text-sm text-white02 mb-4">
        <span>X: <span className="text-white01">{scores.X}</span></span>
        <span>O: <span className="text-white01">{scores.O}</span></span>
        <span>Draws: <span className="text-white01">{scores.draw}</span></span>
      </div>

      <p className="text-orange font-medium mb-4">{statusText}</p>

      <div className="grid grid-cols-3 gap-2 mb-5 max-w-[280px] mx-auto">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`aspect-square bg-black01 border rounded-lg text-3xl sm:text-4xl font-bold flex items-center justify-center transition-colors ${
              result?.line.includes(i)
                ? "border-orange text-orange"
                : "border-white02/20 text-white01 hover:border-orange/50"
            }`}
          >
            {cell}
          </button>
        ))}
      </div>

      <button onClick={reset} className="btn-primary px-6">
        New Round
      </button>
    </div>
  );
}
