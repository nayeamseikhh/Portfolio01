import { useState } from "react";

const CHOICES = [
  { key: "rock", emoji: "🪨", label: "Rock" },
  { key: "paper", emoji: "📄", label: "Paper" },
  { key: "scissors", emoji: "✂️", label: "Scissors" },
];

const BEATS = { rock: "scissors", paper: "rock", scissors: "paper" };

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(""); // "win" | "lose" | "draw"
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [animating, setAnimating] = useState(false);

  const play = (key) => {
    if (animating) return;
    setAnimating(true);
    setPlayerChoice(key);
    setComputerChoice(null);
    setResult("");

    setTimeout(() => {
      const compKey = CHOICES[Math.floor(Math.random() * 3)].key;
      setComputerChoice(compKey);

      let outcome = "draw";
      if (key !== compKey) {
        outcome = BEATS[key] === compKey ? "win" : "lose";
      }
      setResult(outcome);
      setScore((s) => ({
        player: s.player + (outcome === "win" ? 1 : 0),
        computer: s.computer + (outcome === "lose" ? 1 : 0),
      }));
      setAnimating(false);
    }, 600);
  };

  const reset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
    setScore({ player: 0, computer: 0 });
  };

  const resultText = {
    win: "You win! 🎉",
    lose: "Computer wins!",
    draw: "It's a draw!",
  }[result];

  const emojiFor = (key) => CHOICES.find((c) => c.key === key)?.emoji;

  return (
    <div className="w-full max-w-md mx-auto bg-black02 border border-white02/10 rounded-xl p-4 sm:p-6 font-poppins text-center">
      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1">
        Rock Paper Scissors
      </h2>
      <p className="text-white02 text-sm mb-4">
        Pick your move and battle the computer.
      </p>

      <div className="flex justify-center gap-4 text-sm text-white02 mb-5">
        <span>You: <span className="text-orange font-semibold">{score.player}</span></span>
        <span>Computer: <span className="text-orange font-semibold">{score.computer}</span></span>
      </div>

      <div className="flex items-center justify-center gap-6 mb-5 h-24">
        <div className="flex flex-col items-center">
          <div
            className={`w-20 h-20 rounded-full bg-black01 border-2 flex items-center justify-center text-4xl ${
              result === "win" ? "border-orange" : "border-white02/20"
            }`}
          >
            {playerChoice ? emojiFor(playerChoice) : "❓"}
          </div>
          <span className="text-white02 text-xs mt-1">You</span>
        </div>
        <span className="text-white02 text-xl">vs</span>
        <div className="flex flex-col items-center">
          <div
            className={`w-20 h-20 rounded-full bg-black01 border-2 flex items-center justify-center text-4xl ${
              result === "lose" ? "border-orange" : "border-white02/20"
            } ${animating ? "animate-pulse" : ""}`}
          >
            {computerChoice ? emojiFor(computerChoice) : "❓"}
          </div>
          <span className="text-white02 text-xs mt-1">Computer</span>
        </div>
      </div>

      {resultText && (
        <p className="text-orange font-medium mb-5">{resultText}</p>
      )}

      <div className="flex justify-center gap-3 mb-5">
        {CHOICES.map((c) => (
          <button
            key={c.key}
            onClick={() => play(c.key)}
            disabled={animating}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-black01 border border-white02/20 hover:border-orange text-3xl sm:text-4xl flex items-center justify-center transition-colors disabled:opacity-50"
            title={c.label}
          >
            {c.emoji}
          </button>
        ))}
      </div>

      <button onClick={reset} className="btn-secondary px-6">
        Reset Score
      </button>
    </div>
  );
}
