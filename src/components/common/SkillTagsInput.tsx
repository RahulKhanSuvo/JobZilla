"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  variant?: "default" | "withBg";
};

export default function SkillTagsInput({
  value,
  onChange,
  placeholder = "Type and press enter",
  className,
  variant = "default",
}: Props) {
  const [tags, setTags] = React.useState<string[]>(value || []);
  const [input, setInput] = React.useState("");

  // Sync external value changes (only if value prop is provided)
  React.useEffect(() => {
    if (value !== undefined) {
      setTags(value);
    }
  }, [value]);

  const addTag = (tag: string) => {
    if (!tag || tags.includes(tag)) return;

    const newTags = [...tags, tag];
    setTags(newTags);
    onChange?.(newTags);
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    onChange?.(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      let tag = input.trim();

      if (tag.startsWith("/")) tag = tag.slice(1);

      if (tag.length > 0) {
        addTag(tag.toLowerCase());
        setInput("");
      }
    }

    if (e.key === "Backspace" && !input && tags.length) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const containerStyles = cn(
    "flex min-h-11 flex-wrap items-center gap-1.5 rounded-none border px-3 py-1 text-sm transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[1px]",
    variant === "withBg" && "bg-[#F5F5F5] dark:bg-[#222222]",
    variant === "default" && "border-input bg-transparent",
    className,
  );

  return (
    <div className={containerStyles}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 text-xs text-primary font-medium"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="hover:text-destructive transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 min-w-15 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
      />
    </div>
  );
}
