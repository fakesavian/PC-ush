import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SendIcon } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  placeholder = "Type your message...",
  className,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full items-end gap-2", className)}
    >
      <div className="relative flex-1">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          rows={1}
          className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />

        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className={cn(
            "absolute bottom-2 right-2 rounded-full p-2",
            message.trim() && !disabled
              ? "bg-indigo-500 text-white hover:bg-indigo-600"
              : "bg-gray-100 text-gray-400"
          )}
        >
          <SendIcon size={16} />
        </button>
      </div>
    </form>
  );
}
