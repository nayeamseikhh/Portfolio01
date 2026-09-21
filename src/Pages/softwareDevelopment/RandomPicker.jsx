import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiPlus,
  FiRefreshCw,
  FiShuffle,
  FiTrash2,
  FiX,
} from "react-icons/fi";

const DEFAULT_OPTIONS = [
  "React",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "TypeScript",
];

const WHEEL_COLORS = [
  "#e0822d",
  "#32aee3",
  "#6fde59",
  "#9b6cff",
  "#ef5da8",
  "#f5c451",
  "#4dd0c8",
  "#ff7a59",
];

const RandomPicker = () => {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [input, setInput] = useState("");
  const [winner, setWinner] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const wheelRef = useRef(null);

  const optionCount = options.length;

  const segmentAngle = useMemo(() => {
    if (!optionCount) return 360;
    return 360 / optionCount;
  }, [optionCount]);

  const addOption = () => {
    const value = input.trim();

    if (!value || spinning) return;

    setOptions((prev) => [...prev, value]);
    setInput("");
    setWinner("");
    setShowResult(false);
  };

  const removeOption = (index) => {
    if (spinning) return;

    setOptions((prev) => prev.filter((_, i) => i !== index));
    setWinner("");
    setShowResult(false);
  };

  const clearOptions = () => {
    if (spinning) return;

    setOptions([]);
    setWinner("");
    setShowResult(false);
  };

  const resetOptions = () => {
    if (spinning) return;

    setOptions(DEFAULT_OPTIONS);
    setWinner("");
    setRotation(0);
    setShowResult(false);
  };

  const shuffleOptions = () => {
    if (spinning || options.length < 2) return;

    const shuffled = [...options];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[i],
      ];
    }

    setOptions(shuffled);
    setWinner("");
    setShowResult(false);
  };

  const spinWheel = () => {
    if (spinning || optionCount < 2) return;

    const winnerIndex = Math.floor(Math.random() * optionCount);

    /*
      Pointer is at the top.
      We calculate the center of the selected segment,
      then rotate that segment to the pointer.
    */
    const segmentCenter = winnerIndex * segmentAngle + segmentAngle / 2;

    const targetAngle = 360 - segmentCenter;

    const currentNormalized = ((rotation % 360) + 360) % 360;

    const adjustment = (targetAngle - currentNormalized + 360) % 360;

    const extraSpins = 6 + Math.floor(Math.random() * 3);

    const finalRotation = rotation + extraSpins * 360 + adjustment;

    setSpinning(true);
    setWinner("");
    setShowResult(false);
    setRotation(finalRotation);

    window.setTimeout(() => {
      setWinner(options[winnerIndex]);
      setShowResult(true);
      setSpinning(false);
    }, 5200);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "Enter" &&
        document.activeElement?.tagName === "INPUT"
      ) {
        addOption();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const wheelGradient = useMemo(() => {
    if (!optionCount) {
      return "conic-gradient(#252525 0deg 360deg)";
    }

    const segments = options.map((_, index) => {
      const start = index * segmentAngle;
      const end = start + segmentAngle;
      const color = WHEEL_COLORS[index % WHEEL_COLORS.length];

      return `${color} ${start}deg ${end}deg`;
    });

    return `conic-gradient(${segments.join(", ")})`;
  }, [options, optionCount, segmentAngle]);

  return (
    <section className="min-h-screen w-full bg-black01 px-3 py-24 text-white sm:px-5 md:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange/10 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange" />

            <span className="font-poppins text-xs font-semibold uppercase tracking-[0.16em] text-orange sm:text-sm">
              Random Decision Tool
            </span>
          </div>

          <h1 className="font-poppins text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Random Picker <span className="text-orange">Wheel</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl font-poppins text-sm leading-7 text-white02 sm:text-base">
            Add your options, spin the wheel, and let the wheel make the
            decision for you.
          </p>
        </div>

        {/* Main Card */}
        <div className="grid overflow-hidden rounded-3xl border border-white/[0.08] bg-black02 shadow-[0_25px_80px_rgba(0,0,0,0.35)] lg:grid-cols-[minmax(320px,0.85fr)_minmax(450px,1.15fr)]">
          {/* LEFT - Options */}
          <div className="border-b border-white/[0.07] p-4 sm:p-6 lg:border-b-0 lg:border-r lg:p-8 xl:p-10">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="font-poppins text-lg font-semibold text-white sm:text-xl">
                  Your Options
                </h2>

                <p className="mt-1 font-poppins text-xs text-white02 sm:text-sm">
                  {optionCount} {optionCount === 1 ? "option" : "options"}
                </p>
              </div>

              <button
                type="button"
                onClick={shuffleOptions}
                disabled={spinning || optionCount < 2}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.03]
                  px-3
                  py-2
                  font-poppins
                  text-xs
                  font-medium
                  text-white02
                  transition-all
                  hover:border-orange/30
                  hover:bg-orange/10
                  hover:text-orange
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  sm:text-sm
                "
              >
                <FiShuffle />
                Shuffle
              </button>
            </div>

            {/* Add Option */}
            <div className="mb-5 flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Enter an option..."
                disabled={spinning}
                className="
                  min-w-0
                  flex-1
                  rounded-xl
                  border
                  border-white/[0.09]
                  bg-black01
                  px-4
                  py-3
                  font-poppins
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-white02/40
                  transition-all
                  focus:border-orange/60
                  focus:ring-2
                  focus:ring-orange/10
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              />

              <button
                type="button"
                onClick={addOption}
                disabled={!input.trim() || spinning}
                className="
                  inline-flex
                  min-h-[46px]
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-orange
                  px-5
                  font-poppins
                  text-sm
                  font-semibold
                  text-white
                  shadow-[0_8px_25px_rgba(224,130,45,0.15)]
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-orange/90
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  disabled:hover:translate-y-0
                "
              >
                <FiPlus size={18} />
                Add
              </button>
            </div>

            {/* Options List */}
            <div className="max-h-[360px] overflow-y-auto pr-1 scrollbar-thin sm:max-h-[430px]">
              {options.length > 0 ? (
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div
                      key={`${option}-${index}`}
                      className="
                        group
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        border
                        border-white/[0.06]
                        bg-white/[0.025]
                        px-3
                        py-3
                        transition-all
                        hover:border-orange/20
                        hover:bg-white/[0.045]
                      "
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                        style={{
                          backgroundColor:
                            WHEEL_COLORS[index % WHEEL_COLORS.length],
                        }}
                      >
                        {index + 1}
                      </span>

                      <span className="min-w-0 flex-1 truncate font-poppins text-sm text-white sm:text-[15px]">
                        {option}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        disabled={spinning}
                        aria-label={`Remove ${option}`}
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          text-white02/50
                          opacity-100
                          transition-all
                          hover:bg-red-500/10
                          hover:text-red-400
                          disabled:cursor-not-allowed
                          disabled:opacity-30
                          sm:opacity-0
                          sm:group-hover:opacity-100
                        "
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.09] bg-white/[0.015] px-5 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange/10 text-orange">
                    <FiPlus size={22} />
                  </div>

                  <p className="font-poppins text-sm font-medium text-white">
                    No options yet
                  </p>

                  <p className="mt-1 max-w-xs font-poppins text-xs leading-5 text-white02">
                    Add at least two options to start spinning the wheel.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-5">
              <button
                type="button"
                onClick={resetOptions}
                disabled={spinning}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.08]
                  px-3
                  py-2
                  font-poppins
                  text-xs
                  text-white02
                  transition-all
                  hover:border-orange/30
                  hover:text-orange
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <FiRefreshCw />
                Reset
              </button>

              <button
                type="button"
                onClick={clearOptions}
                disabled={spinning || optionCount === 0}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.08]
                  px-3
                  py-2
                  font-poppins
                  text-xs
                  text-white02
                  transition-all
                  hover:border-red-400/30
                  hover:text-red-400
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <FiTrash2 />
                Clear All
              </button>
            </div>
          </div>

          {/* RIGHT - Wheel */}
          <div className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden p-5 sm:min-h-[600px] sm:p-8 lg:min-h-[700px] lg:p-10">
            {/* Background Glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/10 blur-[100px] sm:h-[420px] sm:w-[420px]" />

            {/* Pointer */}
            <div className="relative z-20 mb-[-8px]">
              <div
                className="
                  h-0
                  w-0
                  border-l-[12px]
                  border-r-[12px]
                  border-t-[25px]
                  border-l-transparent
                  border-r-transparent
                  border-t-white
                  drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]
                  sm:border-l-[14px]
                  sm:border-r-[14px]
                  sm:border-t-[30px]
                "
              />
            </div>

            {/* Wheel */}
            <div
              ref={wheelRef}
              className={`
                relative
                z-10
                aspect-square
                w-[min(82vw,400px)]
                rounded-full
                border-[8px]
                border-[#1d1d1d]
                shadow-[0_0_0_2px_rgba(255,255,255,0.06),0_25px_70px_rgba(0,0,0,0.5)]
                sm:w-[min(70vw,480px)]
                lg:w-[min(42vw,530px)]
                ${spinning ? "will-change-transform" : ""}
              `}
              style={{
                background: wheelGradient,
                transform: `rotate(${rotation}deg)`,
                transition: spinning
                  ? "transform 5.2s cubic-bezier(0.12, 0.72, 0.16, 1)"
                  : "none",
              }}
            >
              {/* Wheel Labels */}
              {options.map((option, index) => {
                const angle = index * segmentAngle + segmentAngle / 2;

                return (
                  <div
                    key={`${option}-label-${index}`}
                    className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 origin-bottom"
                    style={{
                      transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                    }}
                  >
                    <div
                      className="
                        absolute
                        left-1/2
                        top-[10%]
                        w-[75%]
                        -translate-x-1/2
                        truncate
                        text-center
                        font-poppins
                        text-[9px]
                        font-bold
                        text-white
                        drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]
                        sm:text-[11px]
                        md:text-xs
                      "
                    >
                      {option}
                    </div>
                  </div>
                );
              })}

              {/* Center */}
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  z-20
                  flex
                  h-14
                  w-14
                  -translate-x-1/2
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border-4
                  border-[#151515]
                  bg-white
                  shadow-[0_5px_20px_rgba(0,0,0,0.35)]
                  sm:h-16
                  sm:w-16
                "
              >
                <span className="h-5 w-5 rounded-full bg-orange sm:h-6 sm:w-6" />
              </div>
            </div>

            {/* Spin Button */}
            <button
              type="button"
              onClick={spinWheel}
              disabled={spinning || optionCount < 2}
              className="
                relative
                z-20
                mt-8
                inline-flex
                min-h-[52px]
                min-w-[170px]
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-orange
                px-7
                py-3
                font-poppins
                text-base
                font-bold
                text-white
                shadow-[0_10px_35px_rgba(224,130,45,0.28)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-orange/90
                hover:shadow-[0_15px_40px_rgba(224,130,45,0.38)]
                disabled:cursor-not-allowed
                disabled:bg-white/10
                disabled:text-white02/40
                disabled:shadow-none
                disabled:hover:translate-y-0
                sm:min-h-[56px]
                sm:min-w-[190px]
                sm:text-lg
              "
            >
              {spinning ? (
                <>
                  <FiRefreshCw className="animate-spin" />
                  Spinning...
                </>
              ) : (
                <>
                  <span>🎯</span>
                  Spin the Wheel
                </>
              )}
            </button>

            {optionCount < 2 && (
              <p className="relative z-10 mt-3 text-center font-poppins text-xs text-white02/60">
                Add at least 2 options to spin.
              </p>
            )}

            {/* Result */}
            <div
              className={`
                relative
                z-10
                mt-6
                w-full
                max-w-md
                overflow-hidden
                rounded-2xl
                border
                transition-all
                duration-500
                ${
                  showResult
                    ? "translate-y-0 border-orange/30 bg-orange/10 opacity-100"
                    : "pointer-events-none h-0 translate-y-3 border-transparent opacity-0"
                }
              `}
            >
              {showResult && winner && (
                <div className="p-5 text-center sm:p-6">
                  <div className="mb-2 flex items-center justify-center gap-2 text-orange">
                    <FiCheck size={18} />

                    <span className="font-poppins text-xs font-semibold uppercase tracking-[0.16em]">
                      Selected
                    </span>
                  </div>

                  <h3 className="break-words font-poppins text-2xl font-bold text-white sm:text-3xl">
                    {winner}
                  </h3>

                  <p className="mt-2 font-poppins text-xs text-white02">
                    The wheel has made the decision.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Tip */}
        <div className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-2 text-center">
          <FiChevronDown className="shrink-0 text-orange" />

          <p className="font-poppins text-xs leading-5 text-white02/60 sm:text-sm">
            Add your choices, spin the wheel, and get a random result instantly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RandomPicker;
