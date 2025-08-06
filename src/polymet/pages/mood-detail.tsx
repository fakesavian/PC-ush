import React from "react";
import { Link } from "react-router-dom";
import GradientBackground from "@/polymet/components/gradient-background";
import AppButton from "@/polymet/components/app-button";
import { ArrowLeftIcon, EditIcon } from "lucide-react";

export default function MoodDetail() {
  return (
    <GradientBackground variant="lavender" className="flex flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <Link to="/mood-tracking">
          <button className="rounded-full p-2 text-gray-600">
            <ArrowLeftIcon size={20} />
          </button>
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">
          Attachments <span className="text-amber-500">·7</span>
        </h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      {/* Mood Visualization */}
      <div className="mx-auto mb-8 mt-4 w-full max-w-xs">
        <div className="relative h-40">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-amber-300"></div>
          <div className="absolute bottom-0 left-0 h-28 w-40 rounded-3xl bg-teal-200"></div>

          <div className="absolute right-0 top-20 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-amber-100 text-amber-800">
            <span className="text-lg">🔆</span>
            <span className="text-xs">Videos</span>
            <span className="text-xs">Recording</span>
          </div>
        </div>
      </div>

      {/* Mood Title */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">I'm feeling</h2>
        <p className="text-2xl font-bold">
          <span className="text-blue-500">proud</span> &{" "}
          <span className="text-teal-500">satisfied</span>
        </p>
      </div>

      {/* Timestamp */}
      <div className="mb-6 flex items-center justify-center space-x-6">
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded-full border-2 border-blue-500"></div>
          <span className="text-sm text-gray-700">Today 9:58am</span>
        </div>
        <button className="text-sm font-medium text-blue-500">
          Edit Emojis
        </button>
      </div>

      {/* Journal Entry */}
      <div className="mx-4 mb-6 rounded-xl bg-amber-100 p-4">
        <p className="text-gray-800">
          Being able to do wall-painting by surscives!
        </p>
        <div className="mt-2 text-right">
          <button className="text-sm font-medium text-blue-500">
            Edit Journal Entry
          </button>
        </div>
      </div>

      {/* More Data Section */}
      <div className="mx-4">
        <h3 className="mb-4 text-xl font-semibold text-gray-900">More data</h3>

        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center rounded-xl bg-amber-100 p-3 text-center">
            <span className="text-xl">😴</span>
            <span className="mt-1 text-sm font-medium">Sleep</span>
            <span className="text-xs text-gray-500">0 min</span>
          </div>

          <div className="flex flex-col items-center rounded-xl bg-amber-100 p-3 text-center">
            <span className="text-xl">🏋️</span>
            <span className="mt-1 text-sm font-medium">Exercise</span>
            <span className="text-xs text-gray-500">0 min</span>
          </div>

          <div className="flex flex-col items-center rounded-xl bg-amber-100 p-3 text-center">
            <span className="text-xl">🛑</span>
            <span className="mt-1 text-sm font-medium">Stops</span>
            <span className="text-xs text-gray-500">0 min</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-auto px-4 py-6">
        <Link to="/progress-dashboard">
          <AppButton variant="primary" fullWidth>
            Back to Dashboard
          </AppButton>
        </Link>
      </div>
    </GradientBackground>
  );
}
