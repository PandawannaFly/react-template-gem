"use client";
import { useRef, useState } from "react";

export default function Home() {
  const [unit, setUnit] = useState<string>("%");
  const [value, setValue] = useState<number>(4);
  const [inputValue, setInputValue] = useState<string>("4");
  const prevValidValueRef = useRef<number>(value);
  const [isFocused, setIsFocused] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);
  const [showMinusTooltip, setShowMinusTooltip] = useState(false);
  const [showPlusTooltip, setShowPlusTooltip] = useState(false);

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    if (newUnit === "%" && value > 100) {
      setValue(100);
      setInputValue("100");
      prevValidValueRef.current = 100;
    }
  };

  const handleValueChange = (newValue: string) => {
    const cleaned = newValue
      .replace(",", ".")
      .replace(/[^0-9.-]/g, "")
      .replace(/(\..*?)\./g, "$1");

    setInputValue(cleaned);
  };

  const handleBlur = () => {
    setIsFocused(false);

    let num = parseFloat(inputValue);

    if (isNaN(num)) {
      num = prevValidValueRef.current;
    }

    if (num < 0) {
      num = 0;
    }

    if (unit === "%" && num > 100) {
      num = prevValidValueRef.current;
    }

    setValue(num);
    setInputValue(num.toString());
    prevValidValueRef.current = num;
  };

  const handleIncrement = () => {
    if (unit === "%" && value >= 100) return;
    const newValue = Number((value + 1).toFixed(0));
    setValue(newValue);
    setInputValue(newValue.toString());
    prevValidValueRef.current = newValue;
  };

  const handleDecrement = () => {
    if (value <= 0) return;
    const newValue = Number((value - 1).toFixed(0));
    setValue(newValue);
    setInputValue(newValue.toString());
    prevValidValueRef.current = newValue;
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-100 flex items-center justify-center font-inter">
      <div className="bg-[#121212] rounded-lg p-6 w-[360px] space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <label className="text-xs text-gray-400 w-16">Unit</label>
          <div className="flex bg-[#1b1b1b] rounded-md overflow-hidden flex-1 max-w-[200px]">
            <button
              onClick={() => handleUnitChange("%")}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                unit === "%"
                  ? "bg-[#2b2b2b] text-white"
                  : "text-gray-500 hover:text-white hover:bg-[#242424]"
              }`}
            >
              %
            </button>
            <button
              onClick={() => handleUnitChange("px")}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                unit === "px"
                  ? "bg-[#2b2b2b] text-white"
                  : "text-gray-500 hover:text-white hover:bg-[#242424]"
              }`}
            >
              px
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs text-gray-400 w-16">Value</label>

          <div
            className={`flex items-center rounded-md overflow-visible flex-1 max-w-[200px] transition-all duration-200 relative
              ${isFocused ? "ring-2 ring-[#3B82F6]" : "ring-0"} 
              ${isInputHovered ? "bg-[#2a2a2a]" : "bg-[#1b1b1b]"}`}
          >
            <div
              className="relative w-1/3"
              onMouseEnter={() => {
                if (value <= 0) setShowMinusTooltip(true);
              }}
              onMouseLeave={() => setShowMinusTooltip(false)}
            >
              <div className="w-full h-full">
                <button
                  onClick={handleDecrement}
                  disabled={value <= 0}
                  className="text-lg w-full py-2 text-gray-200 transition-colors 
                 hover:bg-[#2a2a2a] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  −
                </button>
              </div>

              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 transition-all duration-150
                  ${
                    showMinusTooltip
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1 pointer-events-none"
                  }`}
                aria-hidden={!showMinusTooltip}
              >
                <div className="relative bg-[#2b2b2b] text-gray-200 text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap">
                  Value must be greater than 0
                  <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-[#2b2b2b] rotate-45"></div>
                </div>
              </div>
            </div>

            <div
              className="w-1/3 flex justify-center items-center transition-colors"
              onMouseEnter={() => setIsInputHovered(true)}
              onMouseLeave={() => setIsInputHovered(false)}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleValueChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
                className="w-full text-center bg-transparent text-sm text-white focus:outline-none"
              />
            </div>

            <div
              className="relative w-1/3"
              onMouseEnter={() => {
                if (unit === "%" && value >= 100) setShowPlusTooltip(true);
              }}
              onMouseLeave={() => setShowPlusTooltip(false)}
            >
              <div className="w-full h-full">
                <button
                  onClick={handleIncrement}
                  disabled={unit === "%" && value >= 100}
                  className="text-lg w-full py-2 text-gray-200 transition-colors 
                 hover:bg-[#2a2a2a] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>

              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 transition-all duration-150
                  ${
                    showPlusTooltip
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1 pointer-events-none"
                  }`}
                aria-hidden={!showPlusTooltip}
              >
                <div className="relative bg-[#2b2b2b] text-gray-200 text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap">
                  Value must be smaller than 100
                  <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-[#2b2b2b] rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
