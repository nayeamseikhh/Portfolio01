import { useMemo, useState } from "react";

const ONES = [
  "",
  "এক",
  "দুই",
  "তিন",
  "চার",
  "পাঁচ",
  "ছয়",
  "সাত",
  "আট",
  "নয়",
  "দশ",
  "এগারো",
  "বারো",
  "তেরো",
  "চৌদ্দ",
  "পনেরো",
  "ষোলো",
  "সতেরো",
  "আঠারো",
  "উনিশ",
  "বিশ",
  "একুশ",
  "বাইশ",
  "তেইশ",
  "চব্বিশ",
  "পঁচিশ",
  "ছাব্বিশ",
  "সাতাশ",
  "আঠাশ",
  "ঊনত্রিশ",
  "ত্রিশ",
  "একত্রিশ",
  "বত্রিশ",
  "তেত্রিশ",
  "চৌত্রিশ",
  "পঁয়ত্রিশ",
  "ছত্রিশ",
  "সাঁইত্রিশ",
  "আটত্রিশ",
  "ঊনচল্লিশ",
  "চল্লিশ",
  "একচল্লিশ",
  "বিয়াল্লিশ",
  "তেতাল্লিশ",
  "চুয়াল্লিশ",
  "পঁয়তাল্লিশ",
  "ছেচল্লিশ",
  "সাতচল্লিশ",
  "আটচল্লিশ",
  "ঊনপঞ্চাশ",
  "পঞ্চাশ",
  "একান্ন",
  "বাহান্ন",
  "তিপ্পান্ন",
  "চুয়ান্ন",
  "পঞ্চান্ন",
  "ছাপ্পান্ন",
  "সাতান্ন",
  "আটান্ন",
  "ঊনষাট",
  "ষাট",
  "একষট্টি",
  "বাষট্টি",
  "তেষট্টি",
  "চৌষট্টি",
  "পঁয়ষট্টি",
  "ছেষট্টি",
  "সাতষট্টি",
  "আটষট্টি",
  "ঊনসত্তর",
  "সত্তর",
  "একাত্তর",
  "বাহাত্তর",
  "তিয়াত্তর",
  "চুয়াত্তর",
  "পঁচাত্তর",
  "ছিয়াত্তর",
  "সাতাত্তর",
  "আটাত্তর",
  "ঊনআশি",
  "আশি",
  "একাশি",
  "বিরাশি",
  "তিরাশি",
  "চুরাশি",
  "পঁচাশি",
  "ছিয়াশি",
  "সাতাশি",
  "আটাশি",
  "ঊননব্বই",
  "নব্বই",
  "একানব্বই",
  "বিরানব্বই",
  "তিরানব্বই",
  "চুরানব্বই",
  "পঁচানব্বই",
  "ছিয়ানব্বই",
  "সাতানব্বই",
  "আটানব্বই",
  "নিরানব্বই",
];

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

function toBanglaDigits(numStr) {
  return numStr.replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

function twoDigitWord(n) {
  return ONES[n] || "";
}

function threeDigitWord(n) {
  const hundred = Math.floor(n / 100);
  const rest = n % 100;
  let word = "";
  if (hundred) word += `${ONES[hundred]}শত `;
  if (rest) word += twoDigitWord(rest);
  return word.trim();
}

// Indian numbering system: crore / lakh / thousand / hundred
function numberToBanglaWords(input) {
  const n = Math.floor(Math.abs(input));
  if (n === 0) return "শূন্য";

  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const hundredPart = n % 1000;

  const parts = [];
  if (crore) parts.push(`${threeDigitWord(crore)} কোটি`);
  if (lakh) parts.push(`${threeDigitWord(lakh)} লক্ষ`);
  if (thousand) parts.push(`${threeDigitWord(thousand)} হাজার`);
  if (hundredPart) parts.push(threeDigitWord(hundredPart));

  return parts.join(" ").trim();
}

export default function BanglaSongkhaToKotha() {
  const [value, setValue] = useState("2026");

  const { words, banglaDigits, error } = useMemo(() => {
    if (value.trim() === "") return { words: "", banglaDigits: "", error: "" };
    if (!/^\d+$/.test(value.trim())) {
      return {
        words: "",
        banglaDigits: "",
        error: "শুধুমাত্র সংখ্যা লিখুন (0-9)",
      };
    }
    const num = Number(value);
    if (num > 999999999999) {
      return { words: "", banglaDigits: "", error: "সংখ্যাটি খুব বড়" };
    }
    return {
      words: numberToBanglaWords(num),
      banglaDigits: toBanglaDigits(value.trim()),
      error: "",
    };
  }, [value]);

  return (
    <div className="w-full max-w-lg mt-25 mx-auto bg-gradient-to-b from-black02 to-black01 border border-orange/30 rounded-2xl p-5 sm:p-8 font-poppins relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange/10 blur-2xl pointer-events-none" />

      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1 relative">
        বাংলা সংখ্যা → কথায়
      </h2>
      <p className="text-white02 text-sm mb-6 relative">
        যেকোনো সংখ্যা লিখুন, সাথে সাথে বাংলা বানানে রূপান্তরিত হবে।
      </p>

      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, ""))}
        placeholder="যেমনঃ ২০২৬"
        className="w-full bg-black01 text-white01 border border-white02/20 rounded-lg p-3.5 text-lg font-mono text-center tracking-wider mb-5 focus:outline-none focus:border-orange relative"
      />

      {error && (
        <p className="text-red-400 text-sm text-center mb-4">{error}</p>
      )}

      {!error && banglaDigits && (
        <div className="text-center mb-5">
          <p className="text-3xl sm:text-4xl text-orange font-semibold tracking-wide">
            {banglaDigits}
          </p>
        </div>
      )}

      {!error && words && (
        <div className="bg-black01/70 border border-orange/20 rounded-xl p-4 sm:p-5 text-center">
          <p className="text-white01 text-lg sm:text-xl leading-relaxed break-words">
            {words}
          </p>
        </div>
      )}

      {!error && !words && !value && (
        <p className="text-white02 text-sm text-center">
          একটি সংখ্যা লিখে শুরু করুন
        </p>
      )}
    </div>
  );
}
