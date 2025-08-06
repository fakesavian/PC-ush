import React from "react";
import BadgeCard from "@/polymet/components/mobile-badge-card";
import { UserBadge, RECENT_UNLOCKS } from "@/polymet/data/badges-data";

interface BadgeGridProps {
  badges: UserBadge[];
  onBadgeClick: (badge: UserBadge) => void;
}

export default function BadgeGrid({ badges, onBadgeClick }: BadgeGridProps) {
  if (badges.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No badges found
        </h3>
        <p className="text-gray-600">
          Try adjusting your filter to see more badges.
        </p>
      </div>
    );
  }

  // Sort badges: unlocked first, then by rarity, then by progress
  const sortedBadges = [...badges].sort((a, b) => {
    if (a.unlocked !== b.unlocked) {
      return a.unlocked ? -1 : 1;
    }

    const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
    const rarityDiff = rarityOrder[a.rarity] - rarityOrder[b.rarity];
    if (rarityDiff !== 0) return rarityDiff;

    return b.progress - a.progress;
  });

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-safe"
      data-testid="badge-grid-container"
    >
      {sortedBadges.map((badge) => (
        <BadgeCard
          key={badge.id}
          badge={badge}
          onClick={onBadgeClick}
          isRecentlyUnlocked={RECENT_UNLOCKS.includes(badge.id)}
        />
      ))}
    </div>
  );
}
