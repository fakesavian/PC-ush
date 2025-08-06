import React from "react";
import { cn } from "@/lib/utils";

interface TierCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  recommended?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function TierCard({
  title,
  description,
  price,
  features,
  recommended = false,
  onClick,
  className,
}: TierCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-3xl border bg-white p-6 shadow-sm transition-all duration-200",
        recommended
          ? "border-sky-200 shadow-sky-100"
          : "border-gray-100 shadow-gray-50",
        className
      )}
      onClick={onClick}
    >
      {recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sky-500 px-3 py-1 text-xs font-medium text-white">
          Recommended
        </div>
      )}
      <div className="mb-4 space-y-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="mb-5">
        <div className="text-2xl font-bold text-gray-900">{price}</div>
      </div>

      <ul className="mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="mr-2 mt-1 h-4 w-4 text-sky-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={cn(
          "w-full rounded-full py-2.5 text-sm font-medium transition-all duration-200",
          recommended
            ? "bg-sky-500 text-white hover:bg-sky-600"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        )}
      >
        Choose Plan
      </button>
    </div>
  );
}
