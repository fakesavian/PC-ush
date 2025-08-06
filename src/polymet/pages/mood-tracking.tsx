import React, { useState } from "react";
import { Link } from "react-router-dom";
import GradientBackground from "@/polymet/components/gradient-background";
import AppButton from "@/polymet/components/app-button";
import {
  ArrowLeftIcon,
  PlusIcon,
  ChevronRightIcon,
  SearchIcon,
} from "lucide-react";

export default function MoodTracking() {
  const [selectedMood, setSelectedMood] = useState<string | null>("Proud");

  const moods = [
    { name: "Ecstatic", color: "bg-amber-200" },
    { name: "Inspired", color: "bg-amber-200" },
    { name: "Empowered", color: "bg-amber-200" },
    { name: "Motivated", color: "bg-amber-200" },
    { name: "Optimistic", color: "bg-amber-200" },
    { name: "Proud", color: "bg-amber-200" },
    { name: "Happy", color: "bg-amber-200" },
    { name: "Excited", color: "bg-amber-200" },
  ];

  const moodDefinition = {
    Proud:
      "Pleased with your own achievements or those of someone close to you",
  };

  return (
    <GradientBackground variant="peach" className="flex flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link to="/progress-dashboard">
          <button className="rounded-full p-2 text-gray-600">
            <ArrowLeftIcon size={20} />
          </button>
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">
          How are feeling
          <br />
          this morning?
        </h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      {/* Mood Selection Circle */}
      <div className="relative mx-auto my-4 h-64 w-64">
        {/* Circle background with gradient */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 via-purple-300 to-red-300 opacity-30"></div>

        {/* Center button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
            <PlusIcon size={24} className="text-gray-600" />

            <span className="mt-1 text-xs font-medium text-gray-600">
              Check in
            </span>
          </button>
        </div>

        {/* Mood bubbles */}
        {moods.map((mood, index) => {
          // Calculate position around the circle
          const angle = index * 45 * (Math.PI / 180);
          const radius = 110; // Distance from center
          const left = Math.cos(angle) * radius + 128 - 30; // 128 is half of container, 30 is half of bubble
          const top = Math.sin(angle) * radius + 128 - 30;

          return (
            <button
              key={mood.name}
              className={`absolute h-16 w-16 rounded-full ${mood.color} flex items-center justify-center transition-transform ${selectedMood === mood.name ? "ring-2 ring-blue-400 scale-110" : ""}`}
              style={{ left: `${left}px`, top: `${top}px` }}
              onClick={() => setSelectedMood(mood.name)}
            >
              <span className="text-xs font-medium text-gray-800">
                {mood.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Mood Definition */}
      {selectedMood && (
        <div className="mx-auto mt-8 w-full max-w-md rounded-xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedMood}
              </h3>
              <p className="text-sm text-gray-600">
                {moodDefinition[selectedMood as keyof typeof moodDefinition]}
              </p>
            </div>
            <ChevronRightIcon size={20} className="text-gray-400" />
          </div>
        </div>
      )}

      {/* Search Button */}
      <div className="mt-auto px-4 py-6">
        <Link to="/mood-search">
          <AppButton
            variant="outline"
            fullWidth
            icon={<SearchIcon size={18} />}
            iconPosition="left"
          >
            Search feelings
          </AppButton>
        </Link>
      </div>
    </GradientBackground>
  );
}
