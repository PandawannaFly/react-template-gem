"use client";
import ControlSection from "@/components/ControlSection";
import { useRef, useState } from "react";

export default function Home() {
  const [unit, setUnit] = useState<string>("%");
  const [value, setValue] = useState<number>(1.0);
  const prevValueRef = useRef<number>(value);

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    if (newUnit === "%" && value > 100) setValue(100);
  };

  const handleValueChange = (newValue: string) => {
    const cleaned = newValue
      .replace(",", ".")
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\./g, "$1");
    let num = parseFloat(cleaned) || prevValueRef.current;
    if (num < 0) num = 0;
    if (unit === "%" && num > 100) return;
    prevValueRef.current = value;
    setValue(num);
  };

  const handleBlur = () => {
    if (unit === "%" && value > 100) {
      setValue(prevValueRef.current);
    }
  };

  const handleIncrement = () => {
    if (unit === "%" && value >= 100) return;
    setValue((prev) => {
      const newValue = Number((prev + 0.1).toFixed(1));
      prevValueRef.current = prev;
      return newValue;
    });
  };

  const handleDecrement = () => {
    if (value <= 0) return;
    setValue((prev) => {
      const newValue = Number((prev - 0.1).toFixed(1));
      prevValueRef.current = prev;
      return newValue;
    });
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-100 flex items-start justify-center py-16">
      <div className="grid grid-cols-2 gap-16 max-w-6xl w-full px-8">
        <div>
          <div className="bg-[#121212] rounded-md p-4 w-[360px]">
            <p className="text-xs text-gray-500 mb-2">Unit value</p>

            {/* Unit selector */}
            <ControlSection label="Unit">
              <div className="flex bg-[#0a0a0a] rounded-md">
                <button
                  onClick={() => handleUnitChange("%")}
                  className={`px-4 py-1 text-sm rounded-l-md ${
                    unit === "%" ? "bg-[#2b2b2b]" : "bg-[#1b1b1b]"
                  } hover:bg-[#2b2b2b]`}
                >
                  %
                </button>
                <button
                  onClick={() => handleUnitChange("px")}
                  className={`px-4 py-1 text-sm rounded-r-md ${
                    unit === "px" ? "bg-[#2b2b2b]" : "bg-[#1b1b1b]"
                  } hover:bg-[#2b2b2b]`}
                >
                  px
                </button>
              </div>
            </ControlSection>

            {/* Value selector */}
            <ControlSection label="Value">
              <div className="flex items-center bg-[#0a0a0a] rounded-md px-1 py-[2px]">
                <button
                  onClick={handleDecrement}
                  disabled={value <= 0}
                  className="px-3 py-1 text-sm bg-[#1b1b1b] hover:bg-[#2b2b2b] rounded disabled:opacity-40"
                >
                  −
                </button>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleValueChange(e.target.value)}
                  onBlur={handleBlur}
                  className="w-16 text-center bg-transparent text-sm focus:outline-none"
                />
                <button
                  onClick={handleIncrement}
                  disabled={unit === "%" && value >= 100}
                  className="px-3 py-1 text-sm bg-[#1b1b1b] hover:bg-[#2b2b2b] rounded disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </ControlSection>
          </div>
        </div>

        {/* ===== Frame sections ===== */}
        <div className="space-y-8">
          {[
            { label: "Normal" },
            { label: "Hover on button" },
            { label: "Hover on input" },
            { label: "Focus", focus: true },
          ].map((item, i) => (
            <ControlSection key={i} label={item.label}>
              <div
                className={`flex bg-[#2a2a2a] rounded overflow-hidden ${
                  item.focus ? "ring-1 ring-blue-500" : ""
                }`}
              >
                <button className="px-4 py-1 text-sm bg-[#3a3a3a] hover:bg-[#4a4a4a]">
                  −
                </button>
                <input
                  type="text"
                  defaultValue="4"
                  className="w-16 text-center bg-[#1e1e1e] focus:outline-none text-sm"
                />
                <button className="px-4 py-1 text-sm bg-[#3a3a3a] hover:bg-[#4a4a4a]">
                  +
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Frame</p>
            </ControlSection>
          ))}

          <div className="flex space-x-10">
            {[
              {
                label: "Button disable and hover",
                tooltip: "Value must greater than 0",
                default: "0",
              },
              {
                label: "Frame",
                tooltip: "Value must smaller than 100",
                default: "100",
              },
            ].map((item, i) => (
              <ControlSection key={i} label={item.label}>
                <div className="relative group">
                  {/* Tooltip */}
                  {item.tooltip && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <div className="relative bg-black text-gray-200 text-xs rounded px-2 py-[2px] shadow-lg whitespace-nowrap">
                        {item.tooltip}
                        <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                      </div>
                    </div>
                  )}

                  {/* Input group */}
                  <div className="flex bg-[#2a2a2a] rounded overflow-hidden">
                    <button className="px-4 py-1 text-sm bg-[#3a3a3a] hover:bg-[#4a4a4a]">
                      −
                    </button>
                    <input
                      type="text"
                      defaultValue={item.default}
                      className="w-16 text-center bg-[#1e1e1e] focus:outline-none text-sm"
                    />
                    <button className="px-4 py-1 text-sm bg-[#3a3a3a] hover:bg-[#4a4a4a]">
                      +
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Frame</p>
                </div>
              </ControlSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
