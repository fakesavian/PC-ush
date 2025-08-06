import React from "react";
import { cn } from "@/lib/utils";

interface ArticleCategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function ArticleCategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: ArticleCategoryFilterProps) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex space-x-2">
        <button
          onClick={() => onSelectCategory("All")}
          className={cn(
            "whitespace-nowrap px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
            selectedCategory === "All"
              ? "bg-sky-100 text-sky-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "whitespace-nowrap px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
              selectedCategory === category
                ? "bg-sky-100 text-sky-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
