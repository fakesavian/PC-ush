import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface GoalInputProps {
  label: string;
  placeholder?: string;
  helperText?: string;
  maxLength?: number;
  className?: string;
  onChange?: (value: string) => void;
}

export default function GoalInput({
  label,
  placeholder = "",
  helperText,
  maxLength = 100,
  className,
  onChange,
}: GoalInputProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length <= maxLength) {
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div
        className={cn(
          "relative rounded-xl border bg-white px-4 py-3 shadow-sm transition-all duration-200",
          isFocused
            ? "border-sky-500 ring-1 ring-sky-500/20"
            : "border-gray-200"
        )}
      >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
        />

        {maxLength && (
          <div className="absolute bottom-1 right-3 text-xs text-gray-400">
            {value.length}/{maxLength}
          </div>
        )}
      </div>

      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
}
