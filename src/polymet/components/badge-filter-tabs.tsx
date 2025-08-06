import React from "react";
import { Badge } from "@/polymet/data/badges-data";

interface BadgeFilterTabsProps {
  activeFilter: Badge["type"] | "all";
  onFilterChange: (filter: Badge["type"] | "all") => void;
  badgeCounts: {
    all: number;
    streak: number;
    milestone: number;
    surprise: number;
  };
}

const filterOptions = [
  { id: "all", label: "All", icon: "🏆" },
  { id: "streak", label: "Streaks", icon: "🔥" },
  { id: "milestone", label: "Milestones", icon: "🎯" },
  { id: "surprise", label: "Surprises", icon: "✨" },
] as const;

export default function BadgeFilterTabs({
  activeFilter,
  onFilterChange,
  badgeCounts,
}: BadgeFilterTabsProps) {
  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      {filterOptions.map((option) => {
        const isActive = activeFilter === option.id;
        const count = badgeCounts[option.id];

        return (
          <button
            key={option.id}
            onClick={() => onFilterChange(option.id)}
            className={`
              flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }
            `}
          >
            <span className="text-base">{option.icon}</span>
            <span>{option.label}</span>
            <span
              className={`
              px-1.5 py-0.5 text-xs rounded-full
              ${
                isActive
                  ? "bg-gray-100 text-gray-600"
                  : "bg-gray-200 text-gray-500"
              }
            `}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
