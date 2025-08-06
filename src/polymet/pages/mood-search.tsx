import React, { useState } from "react";
import { Link } from "react-router-dom";
import GradientBackground from "@/polymet/components/gradient-background";
import { ArrowLeftIcon, ChevronRightIcon } from "lucide-react";

export default function MoodSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const feelingCategories = [
    { name: "Yellow", color: "bg-amber-200 text-amber-800" },
    { name: "Green", color: "bg-emerald-200 text-emerald-800" },
    { name: "Blue", color: "bg-blue-200 text-blue-800" },
    { name: "Red", color: "bg-red-200 text-red-800" },
  ];

  const feelings = [
    { name: "Abused", color: "blue", icon: "🔵" },
    { name: "Accepted", color: "green", icon: "🟢" },
    { name: "Accomplished", color: "yellow", icon: "🟡" },
    { name: "Affectionate", color: "green", icon: "💚" },
    { name: "Afraid", color: "red", icon: "🔴" },
    { name: "Agitated", color: "red", icon: "🔶" },
    { name: "Alarmed", color: "blue", icon: "🔷" },
    { name: "Alert", color: "green", icon: "🟢" },
    { name: "Alienated", color: "yellow", icon: "🟡" },
    { name: "Alive", color: "yellow", icon: "🟡" },
  ];

  const filteredFeelings = feelings.filter((feeling) =>
    feeling.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <GradientBackground variant="blue" className="flex flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <Link to="/mood-tracking">
          <button className="rounded-full p-2 text-gray-600">
            <ArrowLeftIcon size={20} />
          </button>
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Search</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      {/* Search Input */}
      <div className="mb-6 rounded-xl bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center">
          <svg
            className="mr-2 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search feelings"
            className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Feeling Categories */}
      <div className="mb-6 flex flex-wrap gap-2">
        {feelingCategories.map((category) => (
          <span
            key={category.name}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${category.color}`}
          >
            {category.name}
          </span>
        ))}
      </div>

      {/* Feelings List */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        {filteredFeelings.map((feeling) => (
          <div
            key={feeling.name}
            className="flex items-center rounded-lg bg-white p-3 shadow-sm"
          >
            <span className="mr-3 text-xl">{feeling.icon}</span>
            <span className="flex-1 text-base font-medium text-gray-900">
              {feeling.name}
            </span>
            <ChevronRightIcon size={20} className="text-gray-400" />
          </div>
        ))}
      </div>
    </GradientBackground>
  );
}
