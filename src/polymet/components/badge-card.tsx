import React, { useState, useRef, useEffect } from "react";
import {
  UserBadge,
  getBadgeRarityColor,
  getBadgeRarityBorder,
} from "@/polymet/data/badges-data";
import * as LucideIcons from "lucide-react";

interface BadgeCardProps {
  badge: UserBadge;
  onClick: (badge: UserBadge) => void;
  isRecentlyUnlocked?: boolean;
}

export default function BadgeCard({
  badge,
  onClick,
  isRecentlyUnlocked = false,
}: BadgeCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Get the Lucide icon component
  const IconComponent = (LucideIcons as any)[badge.icon] || LucideIcons.Award;

  const handleClick = () => {
    onClick(badge);
  };

  const rarityGradient = getBadgeRarityColor(badge.rarity);
  const rarityBorder = getBadgeRarityBorder(badge.rarity);

  // Check if text is truncated
  useEffect(() => {
    if (titleRef.current) {
      const element = titleRef.current;
      setIsTextTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [badge.title]);

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`
          relative w-full aspect-[4/5] p-2 rounded-xl border-2 transition-all duration-300 text-left group overflow-hidden min-h-[44px]
          ${
            badge.unlocked
              ? `${rarityBorder} bg-white hover:shadow-lg hover:scale-105 active:scale-95`
              : "border-gray-200 bg-gray-50 hover:bg-gray-100"
          }
          ${
            isRecentlyUnlocked
              ? "animate-pulse ring-2 ring-yellow-400 ring-opacity-50"
              : ""
          }
        `}
      >
        {/* Rarity glow effect for unlocked badges */}
        {badge.unlocked && (
          <div
            className={`absolute inset-0 rounded-xl bg-gradient-to-r ${rarityGradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
          />
        )}

        {/* Recently unlocked indicator */}
        {isRecentlyUnlocked && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-xs">✨</span>
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col">
          {/* Badge Icon Container - Takes up half the height */}
          <div className="h-1/2 flex items-center justify-center">
            <div
              className={`
              w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
              ${
                badge.unlocked
                  ? `bg-gradient-to-r ${rarityGradient} text-white group-hover:scale-110`
                  : "bg-gray-200 text-gray-400"
              }
            `}
            >
              <IconComponent size={20} />
            </div>
          </div>

          {/* Content Container - Takes up remaining space */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Badge Title */}
            <h3
              ref={titleRef}
              className={`
              font-semibold text-sm text-center line-clamp-2 transition-colors duration-300 mt-2
              ${badge.unlocked ? "text-gray-900" : "text-gray-500"}
            `}
              onMouseEnter={() => isTextTruncated && setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              {badge.title}
            </h3>

            {/* Progress Bar (for locked badges) */}
            {!badge.unlocked && badge.progress > 0 && (
              <div className="mt-1">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full bg-gradient-to-r ${rarityGradient} transition-all duration-500`}
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 text-center mt-1">
                  {badge.progress}%
                </div>
              </div>
            )}

            {/* Badge Status - Bottom section */}
            <div className="flex items-center justify-center mt-2">
              <span
                className={`
                text-xs px-2 py-1 rounded-full font-medium capitalize
                ${badge.rarity === "common" && "bg-gray-100 text-gray-600"}
                ${badge.rarity === "rare" && "bg-blue-100 text-blue-600"}
                ${badge.rarity === "epic" && "bg-purple-100 text-purple-600"}
                ${badge.rarity === "legendary" && "bg-yellow-100 text-yellow-600"}
              `}
              >
                {badge.rarity}
              </span>
            </div>
          </div>
        </div>

        {/* Lock overlay for locked badges */}
        {!badge.unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-20 rounded-xl">
            <LucideIcons.Lock className="text-gray-400" size={16} />
          </div>
        )}
      </button>

      {/* Tooltip for truncated text */}
      {showTooltip && isTextTruncated && (
        <div className="absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          {badge.title}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
}
