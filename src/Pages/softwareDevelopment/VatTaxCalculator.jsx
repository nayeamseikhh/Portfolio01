import { useState, useMemo } from "react";

/**
 * VatTaxCalculator
 * A self-contained React + Tailwind CSS component.
 * VAT is deducted from the total amount first; tax is then calculated
 * on the remaining balance (after VAT) and deducted from that.
 *
 * Usage: <VatTaxCalculator /> — manages its own state, so it can be
 * dropped directly into any page.
 */
export default function VatTaxCalculator() {
  const [total, setTotal] = useState("");
  const [vatPct, setVatPct] = useState("15");
  const [taxPct, setTaxPct] = useState("5");

  const { vatAmount, afterVat, taxAmount, final } = useMemo(() => {
    const t = parseFloat(total) || 0;
    const v = parseFloat(vatPct) || 0;
    const x = parseFloat(taxPct) || 0;

    const vatAmount = t * (v / 100);
    const afterVat = t - vatAmount;
    const taxAmount = afterVat * (x / 100);
    const final = afterVat - taxAmount;

    return { vatAmount, afterVat, taxAmount, final };
  }, [total, vatPct, taxPct]);

  const fmt = (n) =>
    (isNaN(n) ? 0 : n).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className=" w-full bg-gradient-to-br from-[#1B2A4A] via-[#2D2159] to-[#3B1E4A] px-4 py-25 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl shadow-black/30 bg-[#FBF6EC]">
        {/* Header */}
        <div className="px-8 py-7 bg-[#12796F]">
          <h2 className="text-white text-2xl font-bold m-0 tracking-tight">
            VAT &amp; Tax Calculator
          </h2>
          <p className="text-[#CDEEE8] text-sm mt-1.5 m-0">
            Enter an amount to see it broken down after VAT and tax
          </p>
        </div>

        {/* Body */}
        <div className="px-8 pt-7 pb-8">
          {/* Total amount */}
          <div className="mb-5">
            <label
              htmlFor="vtc-total"
              className="block text-sm text-[#5B6470] mb-1.5 font-medium"
            >
              Total amount
            </label>
            <div className="flex items-center border-2 border-[#E4DBC8] rounded-xl overflow-hidden bg-white focus-within:border-[#12796F] transition-colors">
              <span className="text-[#5B6470] font-semibold pl-4 pr-1 text-[15px]">
                $
              </span>
              <input
                id="vtc-total"
                type="number"
                min="0"
                step="any"
                placeholder="e.g. 10,000"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="flex-1 min-w-0 bg-transparent px-2 py-3.5 text-lg font-medium text-[#22262B] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* VAT % and Tax % settings */}
          <div className="grid grid-cols-2 gap-3.5 mb-6">
            <div>
              <label
                htmlFor="vtc-vat"
                className="block text-sm text-[#5B6470] mb-1.5 font-medium"
              >
                VAT rate
              </label>
              <div className="flex items-center border-2 border-[#E4DBC8] rounded-xl overflow-hidden bg-white focus-within:border-[#12796F] transition-colors">
                <input
                  id="vtc-vat"
                  type="number"
                  min="0"
                  step="any"
                  value={vatPct}
                  onChange={(e) => setVatPct(e.target.value)}
                  className="flex-1 min-w-0 bg-transparent pl-4 pr-1 py-3.5 text-base text-[#22262B] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-[#5B6470] font-semibold pr-4 pl-1 text-[15px]">
                  %
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor="vtc-tax"
                className="block text-sm text-[#5B6470] mb-1.5 font-medium"
              >
                Tax rate
              </label>
              <div className="flex items-center border-2 border-[#E4DBC8] rounded-xl overflow-hidden bg-white focus-within:border-[#12796F] transition-colors">
                <input
                  id="vtc-tax"
                  type="number"
                  min="0"
                  step="any"
                  value={taxPct}
                  onChange={(e) => setTaxPct(e.target.value)}
                  className="flex-1 min-w-0 bg-transparent pl-4 pr-1 py-3.5 text-base text-[#22262B] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-[#5B6470] font-semibold pr-4 pl-1 text-[15px]">
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="rounded-xl bg-white border border-[#E4DBC8] px-5 py-5">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-baseline text-[15px]">
                <span className="text-[#5B6470]">Total amount</span>
                <span className="font-semibold tabular-nums text-[#22262B]">
                  ${fmt(parseFloat(total) || 0)}
                </span>
              </div>

              <div className="flex justify-between items-baseline text-[15px]">
                <span className="text-[#5B6470]">VAT ({vatPct || 0}%)</span>
                <span className="font-semibold tabular-nums text-[#B24C34]">
                  − ${fmt(vatAmount)}
                </span>
              </div>

              <div className="flex justify-between items-baseline text-[15px] pb-3 border-b border-dashed border-[#E4DBC8]">
                <span className="text-[#5B6470]">Balance after VAT</span>
                <span className="font-semibold tabular-nums text-[#22262B]">
                  ${fmt(afterVat)}
                </span>
              </div>

              <div className="flex justify-between items-baseline text-[15px]">
                <span className="text-[#5B6470]">Tax ({taxPct || 0}%)</span>
                <span className="font-semibold tabular-nums text-[#B24C34]">
                  − ${fmt(taxAmount)}
                </span>
              </div>

              <div className="flex justify-between items-baseline mt-1 pt-4 border-t-2 border-[#12796F]/20">
                <span className="text-[#22262B] text-base font-semibold">
                  You'll be left with
                </span>
                <span className="text-3xl font-bold tabular-nums text-[#12796F]">
                  ${fmt(final)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-[12.5px] text-[#5B6470] bg-[#EFE7D6] rounded-lg px-4 py-3 leading-relaxed">
            VAT is deducted from the total amount first. Tax is then calculated
            on the balance remaining after VAT, and deducted from that.
          </div>
        </div>
      </div>
    </div>
  );
}
