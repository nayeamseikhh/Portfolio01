# Portfolio Games — Component Pack

৯টি classic logic গেম, সবগুলো standalone React component হিসেবে বানানো —
আগের tools pack-এর মতোই আপনার `index.css`-এর design token (orange
`#e0822d`, `black01`/`black02`, `white01`/`white02`, Poppins,
`.btn-primary` / `.btn-secondary`) অনুসরণ করে, mobile → desktop পুরোপুরি
responsive, কোনো external game লাইব্রেরি ছাড়াই।

## ফাইল তালিকা

| গেম | ফাইল |
|---|---|
| Tic Tac Toe (vs Computer সহ) | `TicTacToe.jsx` |
| Memory / Matching Card Game | `MemoryGame.jsx` |
| Rock Paper Scissors (vs Computer) | `RockPaperScissors.jsx` |
| Connect Four | `ConnectFour.jsx` |
| Minesweeper | `Minesweeper.jsx` |
| Sudoku (generator ও solver সহ) | `Sudoku.jsx` |
| 2048 | `Game2048.jsx` |
| Snake Game | `SnakeGame.jsx` |
| Tower of Hanoi | `TowerOfHanoi.jsx` |

## ব্যবহার

আগের মতোই — `src/components/games/` ফোল্ডারে কপি করে import করুন:

```jsx
import TicTacToe from "../components/games/TicTacToe";

export default function GamesPage() {
  return (
    <div className="py-10 px-4 grid gap-8">
      <TicTacToe />
    </div>
  );
}
```

## নোট

- **Tic Tac Toe** ও **Connect Four** — vs Computer মোডে minimax / heuristic
  AI দিয়ে একটা competent (hard-to-beat) প্রতিপক্ষ তৈরি করা হয়েছে।
- **Sudoku** — নতুন প্রতিটা পাজল backtracking algorithm দিয়ে জেনারেট হয়
  (Easy/Medium/Hard), সাথে Check, Solve ও Reveal বাটন আছে।
- **Snake** — `<canvas>` দিয়ে রেন্ডার করা, keyboard arrow keys এবং
  mobile-এর জন্য on-screen directional pad দুটোই আছে।
- **2048** — keyboard এবং touch swipe (mobile) দুটোই সাপোর্ট করে।
- **Minesweeper** — left click reveal, right click (desktop) / long-press
  আচরণ হিসেবে normal click দিয়েও works, তবে flag-এর জন্য right-click ব্যবহার
  করাই best; মোবাইলে চাইলে flag mode toggle বাটন যোগ করে নিতে পারেন।
- **Tower of Hanoi** — ম্যানুয়াল খেলা এবং animated "Auto Solve" (optimal
  move sequence) দুটোই আছে।
- প্রতিটা কম্পোনেন্ট self-contained ও independent — যেকোনো একটা আলাদাভাবে
  বসালেও কাজ করবে।
