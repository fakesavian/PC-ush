import React from "react";
import { cn } from "@/lib/utils";
import { ZapIcon } from "lucide-react";

export interface MessageBubbleProps {
  content: string;
  isAi?: boolean;
  timestamp?: string;
  className?: string;
}

export default function MessageBubble({
  content,
  isAi = false,
  timestamp,
  className,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex w-full",
        isAi ? "justify-start" : "justify-end",
        className
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isAi
            ? "rounded-bl-none bg-white text-gray-800"
            : "rounded-br-none bg-indigo-500 text-white"
        )}
      >
        {isAi && (
          <div className="mb-1 flex items-center">
            <ZapIcon size={14} className="mr-1 text-indigo-500" />

            <span className="text-xs font-medium text-indigo-500">FitBot</span>
          </div>
        )}
        <p className="text-sm">{content}</p>
        {timestamp && (
          <div className="mt-1 text-right">
            <span
              className={cn(
                "text-xs",
                isAi ? "text-gray-500" : "text-indigo-200"
              )}
            >
              {timestamp}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
