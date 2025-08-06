import React from "react";
import { cn } from "@/lib/utils";

interface AppButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export default function AppButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  disabled = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
}: AppButtonProps) {
  const baseClasses =
    "relative flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]";

  const variantClasses = {
    primary: "bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-500/50",
    secondary:
      "bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500/50",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500/30",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500/30",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const disabledClasses = disabled
    ? "opacity-60 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabledClasses,
        widthClass,
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
}
