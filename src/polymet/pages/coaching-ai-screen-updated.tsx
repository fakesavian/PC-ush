import React, { useState } from "react";
import { Link } from "react-router-dom";
import GradientBackground from "@/polymet/components/gradient-background";
import BackButton from "@/polymet/components/back-button";
import AiCoachCard from "@/polymet/components/ai-coach-card-updated";
import {
  SearchIcon,
  ZapIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  StarIcon,
} from "lucide-react";

export default function CoachingAiScreen() {
  const [activeTab, setActiveTab] = useState("recommended");

  const tabs = [
    { id: "recommended", label: "Recommended" },
    { id: "fitness", label: "Fitness" },
    { id: "mindfulness", label: "Mindfulness" },
    { id: "productivity", label: "Productivity" },
    { id: "nutrition", label: "Nutrition" },
  ];

  const aiCoaches = [
    {
      id: "1",
      name: "FitBot",
      description:
        "AI fitness coach specialized in creating personalized workout plans",
      avatar: "https://github.com/polymet-ai.png",
      specialties: ["Strength Training", "HIIT", "Cardio"],
      category: "fitness",
    },
    {
      id: "2",
      name: "MindfulAI",
      description:
        "Your meditation and mindfulness assistant for daily practice",
      avatar: "https://github.com/polymet-ai.png",
      specialties: ["Meditation", "Stress Relief", "Sleep"],
      category: "mindfulness",
    },
    {
      id: "3",
      name: "ProductivityPro",
      description: "AI coach to help you build effective productivity habits",
      avatar: "https://github.com/polymet-ai.png",
      specialties: ["Time Management", "Goal Setting", "Focus"],
      category: "productivity",
    },
    {
      id: "4",
      name: "NutriCoach",
      description: "AI nutrition coach to help you build healthy eating habits",
      avatar: "https://github.com/polymet-ai.png",
      specialties: ["Meal Planning", "Nutrition Tracking", "Dietary Advice"],
      category: "nutrition",
    },
    {
      id: "5",
      name: "RunningPal",
      description:
        "Your AI running coach for improving endurance and technique",
      avatar: "https://github.com/polymet-ai.png",
      specialties: ["Running Form", "Training Plans", "Race Prep"],
      category: "fitness",
    },
  ];

  const filteredCoaches = aiCoaches.filter(
    (coach) => activeTab === "recommended" || coach.category === activeTab
  );

  return (
    <GradientBackground variant="blue" className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <BackButton to="/settings" label="Back" />

        <h1 className="text-xl font-bold text-gray-900">AI Coaching</h1>
        <Link
          to="/coaching-live"
          className="text-sm text-sky-600 font-medium flex items-center"
        >
          Live Coaches <ArrowRightIcon size={16} className="ml-1" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <SearchIcon
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search for AI coaches..."
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* AI Coach Cards */}
      <div className="flex-1 overflow-auto">
        <div className="space-y-4 pb-4">
          {filteredCoaches.map((coach) => (
            <AiCoachCard
              key={coach.id}
              id={coach.id}
              name={coach.name}
              description={coach.description}
              avatar={coach.avatar}
              specialties={coach.specialties}
            />
          ))}
        </div>
      </div>

      {/* Upgrade Banner */}
      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="flex items-start">
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Upgrade to Premium</h3>
            <p className="text-sm text-white/90 mb-3">
              Get unlimited access to all AI coaches and advanced features
            </p>
            <div className="flex space-x-3 text-xs mb-3">
              <div className="flex items-center">
                <ZapIcon size={14} className="mr-1" />

                <span>Faster responses</span>
              </div>
              <div className="flex items-center">
                <TrendingUpIcon size={14} className="mr-1" />

                <span>Advanced analytics</span>
              </div>
            </div>
            <button className="px-4 py-1.5 bg-white text-indigo-700 rounded-full text-sm font-medium">
              Upgrade Now
            </button>
          </div>
          <div className="ml-3 flex items-center">
            <div className="flex -space-x-1">
              <StarIcon size={20} className="text-yellow-300 fill-yellow-300" />

              <StarIcon size={20} className="text-yellow-300 fill-yellow-300" />

              <StarIcon size={20} className="text-yellow-300 fill-yellow-300" />
            </div>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}
