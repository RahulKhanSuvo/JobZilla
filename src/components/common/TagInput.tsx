import { useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type TagInputProps = {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export default function TagInput({
  label,
  value,
  onChange,
  placeholder = "Type and press Enter...",
  className,
  disabled = false,
}: TagInputProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();

      const newTag = input.trim();

      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
      }

      setInput("");
    }
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <label className="text-sm font-bold text-slate-700">{label}</label>
      )}

      <div className="flex flex-wrap items-center gap-2 p-2 border border-slate-200 rounded-xl min-h-14 focus-within:ring-2 focus-within:ring-blue-200">
        {value.map((tag, index) => (
          <span
            key={index}
            className="flex items-center gap-1 bg-[#EBF5FF] text-[#004A80] px-3 py-1.5 rounded-lg  font-bold border border-[#D1E9FF]"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-1 opacity-60 hover:opacity-100"
              >
                <X size={16} />
              </button>
            )}
          </span>
        ))}

        <input
          disabled={disabled}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="outline-none text-sm text-slate-600 ml-2 bg-transparent flex-1 min-w-30"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
