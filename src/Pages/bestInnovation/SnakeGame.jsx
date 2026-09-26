import { useEffect, useRef, useState } from "react";

const GRID = 20;
const CELL = 16; // px, canvas = GRID * CELL
const SPEED_MS = 120;

function randomFood(snake) {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID),
    };
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
}

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const snakeRef = useRef([{ x: 10, y: 10 }]);
  const dirRef = useRef({ x: 1, y: 0 });
  const nextDirRef = useRef({ x: 1, y: 0 });
  const foodRef = useRef(randomFood(snakeRef.current));
  const loopRef = useRef(null);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#161513";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#e0822d";
    const f = foodRef.current;
    ctx.beginPath();
    ctx.arc(f.x * CELL + CELL / 2, f.y * CELL + CELL / 2, CELL / 2.5, 0, Math.PI * 2);
    ctx.fill();

    snakeRef.current.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? "#ffffff" : "#c5c5c5";
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });
  };

  const tick = () => {
    dirRef.current = nextDirRef.current;
    const head = snakeRef.current[0];
    const newHead = { x: head.x + dirRef.current.x, y: head.y + dirRef.current.y };

    const hitsWall = newHead.x < 0 || newHead.x >= GRID || newHead.y < 0 || newHead.y >= GRID;
    const hitsSelf = snakeRef.current.some((s) => s.x === newHead.x && s.y === newHead.y);

    if (hitsWall || hitsSelf) {
      setGameOver(true);
      setRunning(false);
      clearInterval(loopRef.current);
      return;
    }

    const newSnake = [newHead, ...snakeRef.current];
    if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
      setScore((s) => {
        const val = s + 10;
        setBest((b) => Math.max(b, val));
        return val;
      });
      foodRef.current = randomFood(newSnake);
    } else {
      newSnake.pop();
    }
    snakeRef.current = newSnake;
    draw();
  };

  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (running) {
      loopRef.current = setInterval(tick, SPEED_MS);
    }
    return () => clearInterval(loopRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  useEffect(() => {
    const onKey = (e) => {
      const map = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };
      const next = map[e.key];
      if (!next) return;
      e.preventDefault();
      const cur = dirRef.current;
      if (next.x === -cur.x && next.y === -cur.y) return; // no reverse
      nextDirRef.current = next;
      if (!running && !gameOver) setRunning(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, gameOver]);

  const setDirection = (x, y) => {
    const cur = dirRef.current;
    if (x === -cur.x && y === -cur.y) return;
    nextDirRef.current = { x, y };
    if (!running && !gameOver) setRunning(true);
  };

  const restart = () => {
    snakeRef.current = [{ x: 10, y: 10 }];
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    foodRef.current = randomFood(snakeRef.current);
    setScore(0);
    setGameOver(false);
    setRunning(true);
    draw();
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-black02 border border-white02/10 rounded-xl p-4 sm:p-6 font-poppins text-center">
      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1">
        Snake
      </h2>
      <p className="text-white02 text-sm mb-4">
        Arrow keys or the on-screen pad. Eat the dots, don't hit yourself.
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

      {gameOver && <p className="text-red-400 font-medium mb-3">Game over!</p>}
      {!running && !gameOver && score === 0 && (
        <p className="text-white02 text-sm mb-3">Press an arrow key or a control below to start</p>
      )}

      <div className="flex justify-center mb-4">
        <canvas
          ref={canvasRef}
          width={GRID * CELL}
          height={GRID * CELL}
          className="border border-white02/20 rounded-lg max-w-full"
        />
      </div>

      <div className="grid grid-cols-3 gap-1.5 max-w-[150px] mx-auto mb-4">
        <div />
        <button onClick={() => setDirection(0, -1)} className="btn-secondary py-1.5">▲</button>
        <div />
        <button onClick={() => setDirection(-1, 0)} className="btn-secondary py-1.5">◀</button>
        <button onClick={() => setDirection(0, 1)} className="btn-secondary py-1.5">▼</button>
        <button onClick={() => setDirection(1, 0)} className="btn-secondary py-1.5">▶</button>
      </div>

      <button onClick={restart} className="btn-primary px-6">
        {gameOver ? "Play Again" : "Restart"}
      </button>
    </div>
  );
}
