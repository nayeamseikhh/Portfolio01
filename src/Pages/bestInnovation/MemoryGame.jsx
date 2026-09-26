import { useEffect, useMemo, useState } from "react";

const EMOJIS = ["🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🥝", "🍍"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(pairCount) {
  const chosen = EMOJIS.slice(0, pairCount);
  return shuffle([...chosen, ...chosen]).map((emoji, i) => ({
    id: i,
    emoji,
    matched: false,
  }));
}

const SIZES = { Easy: 6, Medium: 8 };

export default function MemoryGame() {
  const [difficulty, setDifficulty] = useState("Easy");
  const [deck, setDeck] = useState(() => buildDeck(SIZES.Easy));
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const matchedCount = deck.filter((c) => c.matched).length;
  const won = matchedCount === deck.length;

  useEffect(() => {
    if (!running || won) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running, won]);

  useEffect(() => {
    if (flipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = flipped;
      if (deck[a].emoji === deck[b].emoji) {
        setDeck((d) =>
          d.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c))
        );
        setFlipped([]);
      } else {
        const t = setTimeout(() => setFlipped([]), 700);
        return () => clearTimeout(t);
      }
    }
  }, [flipped, deck]);

  const handleFlip = (i) => {
    if (!running) setRunning(true);
    if (flipped.length === 2 || flipped.includes(i) || deck[i].matched) return;
    setFlipped((f) => [...f, i]);
  };

  const restart = (diff = difficulty) => {
    setDeck(buildDeck(SIZES[diff]));
    setFlipped([]);
    setMoves(0);
    setSeconds(0);
    setRunning(false);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const gridCols = useMemo(
    () => (deck.length <= 12 ? "grid-cols-4" : "grid-cols-4 sm:grid-cols-4"),
    [deck.length]
  );

  return (
    <div className="w-full max-w-lg mx-auto bg-black02 border border-white02/10 rounded-xl p-4 sm:p-6 font-poppins text-center">
      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1">
        Memory Match
      </h2>
      <p className="text-white02 text-sm mb-4">
        Flip two cards at a time and find all the pairs.
      </p>

      <div className="flex justify-center gap-2 mb-4">
        {Object.keys(SIZES).map((d) => (
          <button
            key={d}
            onClick={() => {
              setDifficulty(d);
              restart(d);
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

      <div className="flex justify-center gap-4 text-sm text-white02 mb-4">
        <span>Moves: <span className="text-white01">{moves}</span></span>
        <span>Time: <span className="text-white01">{mm}:{ss}</span></span>
        <span>Pairs: <span className="text-white01">{matchedCount / 2}/{deck.length / 2}</span></span>
      </div>

      {won && (
        <p className="text-orange font-medium mb-4">
          🎉 Solved in {moves} moves and {mm}:{ss}!
        </p>
      )}

      <div className={`grid ${gridCols} gap-2 mb-5 max-w-md mx-auto`}>
        {deck.map((card, i) => {
          const isUp = card.matched || flipped.includes(i);
          return (
            <button
              key={card.id}
              onClick={() => handleFlip(i)}
              className={`aspect-square rounded-lg text-2xl sm:text-3xl flex items-center justify-center border transition-all duration-300 ${
                isUp
                  ? card.matched
                    ? "bg-orange/20 border-orange"
                    : "bg-black01 border-orange"
                  : "bg-black01 border-white02/20 hover:border-orange/50"
              }`}
            >
              {isUp ? card.emoji : ""}
            </button>
          );
        })}
      </div>

      <button onClick={() => restart()} className="btn-primary px-6">
        Restart
      </button>
    </div>
  );
}
