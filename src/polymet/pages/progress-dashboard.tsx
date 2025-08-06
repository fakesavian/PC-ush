import React from "react";
import { Link } from "react-router-dom";
import GradientBackground from "@/polymet/components/gradient-background";
import ProgressCard from "@/polymet/components/progress-card";
import BadgeCard from "@/polymet/components/badge-card";
import FeeReminder from "@/polymet/components/fee-reminder";
import { generateUserBadges } from "@/polymet/data/badges-data";
import { PlusIcon, TrendingUpIcon, BellIcon, SettingsIcon } from "lucide-react";

export default function ProgressDashboard() {
  const userBadges = generateUserBadges();
  const displayBadges = userBadges.slice(0, 3); // Show first 3 badges

  const handleBadgeClick = (badge: any) => {
    console.log("Badge clicked:", badge.title);
  };

  return (
    <GradientBackground
      variant="blue"
      className="flex flex-col min-h-screen overflow-auto pb-safe"
      data-testid="progress-dashboard-page"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600">Your progress at a glance</p>
        </div>

        <div className="flex space-x-2">
          <Link
            to="/notifications"
            className="rounded-full p-2 text-gray-600 hover:bg-white/50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            data-testid="notifications-link"
          >
            <BellIcon size={20} />
          </Link>
          <Link
            to="/settings"
            className="rounded-full p-2 text-gray-600 hover:bg-white/50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            data-testid="settings-link"
          >
            <SettingsIcon size={20} />
          </Link>
        </div>
      </div>

      {/* Goal Summary */}
      <div className="mt-6 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 p-5 text-white shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Goal Summary</h2>
          <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium">
            Week 2 of 4
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs">Active Goals</p>
          </div>

          <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
            <p className="text-2xl font-bold">75%</p>
            <p className="text-xs">Completion</p>
          </div>

          <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs">Badges</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span>Overall Progress</span>
            <span>75%</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: "75%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Active Goals */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Active Goals</h2>
          <Link to="/goal-creation">
            <button className="flex items-center rounded-full bg-sky-100 px-3 py-1.5 text-xs font-medium text-sky-700 hover:bg-sky-200">
              <PlusIcon size={14} className="mr-1" />
              Add Goal
            </button>
          </Link>
        </div>

        <div className="mt-3 space-y-4">
          <ProgressCard
            title="Morning Workout Routine"
            description="30 minutes of exercise every morning"
            progress={75}
            daysLeft={5}
            variant="default"
          />

          <ProgressCard
            title="Read 2 Books This Month"
            description="20 pages per day minimum"
            progress={90}
            daysLeft={2}
            variant="success"
          />

          <ProgressCard
            title="Meditation Practice"
            description="10 minutes daily meditation"
            progress={45}
            daysLeft={10}
            variant="warning"
          />
        </div>
      </div>

      {/* Badges */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Your Badges</h2>
          <Link
            to="/badges"
            className="text-xs font-medium text-sky-600 hover:text-sky-700 transition-colors"
            data-testid="view-all-badges-link"
          >
            View All
          </Link>
        </div>

        <div className="mt-3 space-y-3">
          {displayBadges.map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              onClick={handleBadgeClick}
            />
          ))}
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900">Weekly Stats</h2>

        <div className="mt-3 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">This Week</p>
              <p className="text-xs text-gray-500">Jun 12 - Jun 18</p>
            </div>
            <div className="flex items-center text-emerald-600">
              <TrendingUpIcon size={16} className="mr-1" />

              <span className="text-xs font-medium">+15%</span>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="mb-1 h-20 w-6 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="bg-sky-500 w-full"
                    style={{
                      height: `${[70, 45, 80, 30, 60, 0, 0][index]}%`,
                      marginTop: `auto`,
                      borderRadius: "inherit",
                    }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-600">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fee Reminder */}
      <div className="mt-6 mb-4">
        <FeeReminder amount="$25.00" dueDate="June 15, 2023" isPaid={false} />
      </div>
    </GradientBackground>
  );
}
