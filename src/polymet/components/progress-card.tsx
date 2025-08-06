import React from "react";
import { cn } from "@/lib/utils";

interface ProgressCardProps {
  title: string;
  description?: string;
  progress: number; // 0 to 100
  daysLeft?: number;
  className?: string;
  variant?: "default" | "success" | "warning" | "danger";
}

export default function ProgressCard({
  title,
  description,
  progress,
  daysLeft,
  className,
  variant = "default",
}: ProgressCardProps) {
  const variantClasses = {
    default: {
      bg: "bg-sky-100",
      fill: "bg-sky-500",
      text: "text-sky-700",
    },
    success: {
      bg: "bg-emerald-100",
      fill: "bg-emerald-500",
      text: "text-emerald-700",
    },
    warning: {
      bg: "bg-amber-100",
      fill: "bg-amber-500",
      text: "text-amber-700",
    },
    danger: {
      bg: "bg-rose-100",
      fill: "bg-rose-500",
      text: "text-rose-700",
    },
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-white p-5 shadow-sm",
        className
      )}
    >
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>

        {daysLeft !== undefined && (
          <div
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium",
              variantClasses[variant].text,
              variantClasses[variant].bg
            )}
          >
            {daysLeft} days left
          </div>
        )}
      </div>

      <div className="mb-2 mt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-gray-700">Progress</span>
          <span className="font-medium text-gray-700">{progress}%</span>
        </div>
        <div
          className={cn(
            "mt-2 h-2 w-full overflow-hidden rounded-full",
            variantClasses[variant].bg
          )}
        >
          <div
            className={cn("h-full rounded-full", variantClasses[variant].fill)}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
