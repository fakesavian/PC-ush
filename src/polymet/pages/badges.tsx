import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import GradientBackground from "@/polymet/components/gradient-background";
import BadgeFilterTabs from "@/polymet/components/badge-filter-tabs";
import BadgeGrid from "@/polymet/components/badge-grid";
import {
  generateUserBadges,
  filterBadgesByType,
  UserBadge,
  Badge,
} from "@/polymet/data/badges-data";
import { TrophyIcon, FlameIcon, TargetIcon } from "lucide-react";

export default function BadgesPage() {
  const [activeFilter, setActiveFilter] = useState<Badge["type"] | "all">(
    "all"
  );
  const [selectedBadge, setSelectedBadge] = useState<UserBadge | null>(null);

  const userBadges = useMemo(() => generateUserBadges(), []);
  const filteredBadges = useMemo(
    () => filterBadgesByType(userBadges, activeFilter),
    [userBadges, activeFilter]
  );

  const badgeCounts = useMemo(
    () => ({
      all: userBadges.length,
      streak: userBadges.filter((b) => b.type === "streak").length,
      milestone: userBadges.filter((b) => b.type === "milestone").length,
      surprise: userBadges.filter((b) => b.type === "surprise").length,
    }),
    [userBadges]
  );

  const unlockedCount = userBadges.filter((b) => b.unlocked).length;
  const completionPercentage = Math.round(
    (unlockedCount / userBadges.length) * 100
  );

  const handleBadgeClick = (badge: UserBadge) => {
    setSelectedBadge(badge);
    // In a real app, this would open a modal
    console.log("Opening badge modal for:", badge.title);
  };

  return (
    <GradientBackground
      variant="blue"
      className="min-h-screen overflow-auto"
      data-testid="badges-page"
    >
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
            <TrophyIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Badges</h1>
          <p className="text-gray-600">
            Track your achievements and unlock new rewards
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center mb-4">
          <Link
            to="/reflection-archive"
            className="text-sm text-sky-600 hover:text-sky-700 transition-colors font-medium"
            data-testid="reflection-archive-link"
          >
            View Reflection Archive →
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {unlockedCount}
            </div>
            <div className="text-xs text-gray-600">Unlocked</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {completionPercentage}%
            </div>
            <div className="text-xs text-gray-600">Complete</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {userBadges.length - unlockedCount}
            </div>
            <div className="text-xs text-gray-600">To Unlock</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <BadgeFilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          badgeCounts={badgeCounts}
        />
      </div>

      {/* Badge Grid */}
      <div className="px-4 pb-safe">
        <BadgeGrid
          badges={filteredBadges}
          onBadgeClick={handleBadgeClick}
          data-testid="badge-grid"
        />
      </div>

      {/* Progress Indicator */}
      <div className="px-4 pb-safe">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Overall Progress
            </span>
            <span className="text-sm text-gray-600">
              {unlockedCount} / {userBadges.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}
