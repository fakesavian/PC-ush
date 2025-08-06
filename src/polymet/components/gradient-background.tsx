import React from "react";
import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: "blue" | "mint" | "peach" | "lavender";
}

export default function GradientBackground({
  children,
  className,
  variant = "blue",
}: GradientBackgroundProps) {
  const gradientClasses = {
    blue: "from-sky-50 via-blue-50 to-indigo-50",
    mint: "from-emerald-50 via-teal-50 to-cyan-50",
    peach: "from-orange-50 via-amber-50 to-yellow-50",
    lavender: "from-purple-50 via-fuchsia-50 to-pink-50",
  };

  return (
    <div
      className={cn(
        "h-full w-full overflow-y-auto bg-gradient-to-br p-5",
        gradientClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
