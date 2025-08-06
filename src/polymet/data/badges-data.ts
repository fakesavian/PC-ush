import {
  REFLECTION_ENTRIES,
  ReflectionEntry,
} from "@/polymet/data/reflection-entries";
import {
  MOCK_TRANSACTIONS,
  Transaction,
  hasNoRecentFees,
} from "@/polymet/data/wallet-data";
import {
  STAGE_TRACKS_DATA,
  getOverallProgress,
} from "@/polymet/data/stage-tracks-data";

export interface Badge {
  id: string;
  type: "streak" | "milestone" | "surprise";
  title: string;
  description: string;
  icon: string; // Lucide icon name
  rarity: "common" | "rare" | "epic" | "legendary";
  criteria: {
    requirement: string;
    target: number;
    unit: string;
  };
  unlockMessage: string;
}

export interface UserBadge extends Badge {
  unlocked: boolean;
  dateUnlocked?: string; // ISO string
  progress: number; // 0-100
  currentValue: number;
}

// Badge definitions
export const BADGE_CATALOG: Badge[] = [
  // Streak Badges
  {
    id: "reflection-streak-3",
    type: "streak",
    title: "Reflection Rookie",
    description: "Complete 3 consecutive days of reflection",
    icon: "Calendar",
    rarity: "common",
    criteria: {
      requirement: "consecutive_reflections",
      target: 3,
      unit: "days",
    },
    unlockMessage: "You're building a powerful habit of self-reflection!",
  },
  {
    id: "reflection-streak-7",
    type: "streak",
    title: "Weekly Warrior",
    description: "Complete 7 consecutive days of reflection",
    icon: "Flame",
    rarity: "rare",
    criteria: {
      requirement: "consecutive_reflections",
      target: 7,
      unit: "days",
    },
    unlockMessage: "A full week of reflection - you're on fire!",
  },
  {
    id: "reflection-streak-30",
    type: "streak",
    title: "Mindful Master",
    description: "Complete 30 consecutive days of reflection",
    icon: "Crown",
    rarity: "legendary",
    criteria: {
      requirement: "consecutive_reflections",
      target: 30,
      unit: "days",
    },
    unlockMessage:
      "Incredible dedication! You've mastered the art of daily reflection.",
  },
  {
    id: "commitment-streak-7",
    type: "streak",
    title: "Promise Keeper",
    description: "Go 7 days without any commitment fees",
    icon: "Shield",
    rarity: "rare",
    criteria: {
      requirement: "no_fees_streak",
      target: 7,
      unit: "days",
    },
    unlockMessage: "Your word is your bond - excellent commitment!",
  },

  // Milestone Badges
  {
    id: "stage-1-complete",
    type: "milestone",
    title: "Self-Aware",
    description: "Complete Stage 1: Awareness",
    icon: "Eye",
    rarity: "common",
    criteria: {
      requirement: "stage_completion",
      target: 1,
      unit: "stage",
    },
    unlockMessage: "You've taken the first step toward transformation!",
  },
  {
    id: "stage-3-complete",
    type: "milestone",
    title: "Integration Expert",
    description: "Complete Stage 3: Integration",
    icon: "Puzzle",
    rarity: "epic",
    criteria: {
      requirement: "stage_completion",
      target: 3,
      unit: "stage",
    },
    unlockMessage:
      "You're successfully integrating new patterns into your life!",
  },
  {
    id: "stage-5-complete",
    type: "milestone",
    title: "Transformation Master",
    description: "Complete all 5 transformation stages",
    icon: "Trophy",
    rarity: "legendary",
    criteria: {
      requirement: "stage_completion",
      target: 5,
      unit: "stage",
    },
    unlockMessage:
      "Ultimate achievement! You've completed your transformation journey.",
  },
  {
    id: "total-reflections-50",
    type: "milestone",
    title: "Reflection Enthusiast",
    description: "Write 50 total reflections",
    icon: "BookOpen",
    rarity: "rare",
    criteria: {
      requirement: "total_reflections",
      target: 50,
      unit: "entries",
    },
    unlockMessage: "Your commitment to self-reflection is inspiring!",
  },

  // Surprise Badges
  {
    id: "consequence-free-week",
    type: "surprise",
    title: "Flawless Week",
    description: "Complete a full week without any commitment fees",
    icon: "Star",
    rarity: "epic",
    criteria: {
      requirement: "consequence_free_week",
      target: 1,
      unit: "week",
    },
    unlockMessage: "Perfect execution! You nailed every commitment this week.",
  },
  {
    id: "early-bird",
    type: "surprise",
    title: "Early Bird",
    description: "Complete 5 reflections before 8 AM",
    icon: "Sunrise",
    rarity: "rare",
    criteria: {
      requirement: "early_reflections",
      target: 5,
      unit: "entries",
    },
    unlockMessage: "The early bird catches the worm - and the badge!",
  },
  {
    id: "weekend-warrior",
    type: "surprise",
    title: "Weekend Warrior",
    description: "Complete reflections on 10 weekend days",
    icon: "Mountain",
    rarity: "rare",
    criteria: {
      requirement: "weekend_reflections",
      target: 10,
      unit: "days",
    },
    unlockMessage: "You don't take breaks from growth - even on weekends!",
  },
  {
    id: "comeback-kid",
    type: "surprise",
    title: "Comeback Kid",
    description: "Return to reflection after a 7+ day break",
    icon: "RotateCcw",
    rarity: "common",
    criteria: {
      requirement: "comeback_after_break",
      target: 7,
      unit: "days",
    },
    unlockMessage: "Welcome back! It takes courage to restart your journey.",
  },
  {
    id: "deep-thinker",
    type: "surprise",
    title: "Deep Thinker",
    description: "Write 5 reflections with over 500 words",
    icon: "Brain",
    rarity: "epic",
    criteria: {
      requirement: "long_reflections",
      target: 5,
      unit: "entries",
    },
    unlockMessage: "Your depth of reflection is truly remarkable!",
  },
];

// Helper functions for badge criteria
export const isReflectionStreak = (days: number): boolean => {
  const sortedEntries = REFLECTION_ENTRIES.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (sortedEntries.length < days) return false;

  const today = new Date();
  let consecutiveDays = 0;

  for (let i = 0; i < days; i++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - i);

    const hasEntryOnDate = sortedEntries.some((entry) => {
      const entryDate = new Date(entry.createdAt);
      return entryDate.toDateString() === targetDate.toDateString();
    });

    if (hasEntryOnDate) {
      consecutiveDays++;
    } else {
      break;
    }
  }

  return consecutiveDays >= days;
};

export const isConsequenceFreeWeek = (): boolean => {
  return hasNoRecentFees(MOCK_TRANSACTIONS, 7);
};

export const getEarlyReflectionsCount = (): number => {
  return REFLECTION_ENTRIES.filter((entry) => {
    const entryTime = new Date(entry.createdAt);
    return entryTime.getHours() < 8;
  }).length;
};

export const getWeekendReflectionsCount = (): number => {
  return REFLECTION_ENTRIES.filter((entry) => {
    const entryDate = new Date(entry.createdAt);
    const dayOfWeek = entryDate.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
  }).length;
};

export const hasCompletedStage = (stageNumber: number): boolean => {
  const stage = STAGE_TRACKS_DATA.find((s) => s.stageNumber === stageNumber);
  return stage ? stage.progress === 100 : false;
};

export const getLongReflectionsCount = (): number => {
  return REFLECTION_ENTRIES.filter((entry) => entry.content.length > 500)
    .length;
};

export const hasRecentComeback = (): boolean => {
  const sortedEntries = REFLECTION_ENTRIES.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (sortedEntries.length < 2) return false;

  const mostRecent = new Date(sortedEntries[0].createdAt);
  const secondMostRecent = new Date(sortedEntries[1].createdAt);

  const daysBetween = Math.floor(
    (mostRecent.getTime() - secondMostRecent.getTime()) / (1000 * 60 * 60 * 24)
  );

  return daysBetween >= 7;
};

export const getCurrentReflectionStreak = (): number => {
  const sortedEntries = REFLECTION_ENTRIES.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const today = new Date();
  let streak = 0;

  for (let i = 0; i < 365; i++) {
    // Check up to a year
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - i);

    const hasEntryOnDate = sortedEntries.some((entry) => {
      const entryDate = new Date(entry.createdAt);
      return entryDate.toDateString() === targetDate.toDateString();
    });

    if (hasEntryOnDate) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

export const getNoFeesStreak = (): number => {
  const sortedTransactions = MOCK_TRANSACTIONS.filter((tx) => tx.amount < 0) // Only fees
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  if (sortedTransactions.length === 0) return 30; // No fees ever = max streak

  const mostRecentFee = new Date(sortedTransactions[0].createdAt);
  const today = new Date();

  return Math.floor(
    (today.getTime() - mostRecentFee.getTime()) / (1000 * 60 * 60 * 24)
  );
};

// Generate user badges with current progress
export const generateUserBadges = (): UserBadge[] => {
  return BADGE_CATALOG.map((badge) => {
    let unlocked = false;
    let progress = 0;
    let currentValue = 0;
    let dateUnlocked: string | undefined;

    switch (badge.criteria.requirement) {
      case "consecutive_reflections":
        currentValue = getCurrentReflectionStreak();
        progress = Math.min(100, (currentValue / badge.criteria.target) * 100);
        unlocked = currentValue >= badge.criteria.target;
        break;

      case "no_fees_streak":
        currentValue = getNoFeesStreak();
        progress = Math.min(100, (currentValue / badge.criteria.target) * 100);
        unlocked = currentValue >= badge.criteria.target;
        break;

      case "stage_completion":
        const completedStages = STAGE_TRACKS_DATA.filter(
          (s) => s.progress === 100
        ).length;
        currentValue = completedStages;
        progress = Math.min(100, (currentValue / badge.criteria.target) * 100);
        unlocked = currentValue >= badge.criteria.target;
        break;

      case "total_reflections":
        currentValue = REFLECTION_ENTRIES.length;
        progress = Math.min(100, (currentValue / badge.criteria.target) * 100);
        unlocked = currentValue >= badge.criteria.target;
        break;

      case "consequence_free_week":
        unlocked = isConsequenceFreeWeek();
        progress = unlocked ? 100 : 0;
        currentValue = unlocked ? 1 : 0;
        break;

      case "early_reflections":
        currentValue = getEarlyReflectionsCount();
        progress = Math.min(100, (currentValue / badge.criteria.target) * 100);
        unlocked = currentValue >= badge.criteria.target;
        break;

      case "weekend_reflections":
        currentValue = getWeekendReflectionsCount();
        progress = Math.min(100, (currentValue / badge.criteria.target) * 100);
        unlocked = currentValue >= badge.criteria.target;
        break;

      case "comeback_after_break":
        unlocked = hasRecentComeback();
        progress = unlocked ? 100 : 0;
        currentValue = unlocked ? 1 : 0;
        break;

      case "long_reflections":
        currentValue = getLongReflectionsCount();
        progress = Math.min(100, (currentValue / badge.criteria.target) * 100);
        unlocked = currentValue >= badge.criteria.target;
        break;
    }

    // Set unlock date for unlocked badges (mock dates)
    if (unlocked) {
      const mockDate = new Date();
      mockDate.setDate(mockDate.getDate() - Math.floor(Math.random() * 30));
      dateUnlocked = mockDate.toISOString();
    }

    return {
      ...badge,
      unlocked,
      dateUnlocked,
      progress: Math.round(progress),
      currentValue,
    };
  });
};

// Filter helpers
export const filterBadgesByType = (
  badges: UserBadge[],
  type: Badge["type"] | "all"
): UserBadge[] => {
  if (type === "all") return badges;
  return badges.filter((badge) => badge.type === type);
};

export const getBadgeRarityColor = (rarity: Badge["rarity"]): string => {
  switch (rarity) {
    case "common":
      return "from-gray-400 to-gray-600";
    case "rare":
      return "from-blue-400 to-blue-600";
    case "epic":
      return "from-purple-400 to-purple-600";
    case "legendary":
      return "from-yellow-400 to-yellow-600";
    default:
      return "from-gray-400 to-gray-600";
  }
};

export const getBadgeRarityBorder = (rarity: Badge["rarity"]): string => {
  switch (rarity) {
    case "common":
      return "border-gray-300";
    case "rare":
      return "border-blue-300";
    case "epic":
      return "border-purple-300";
    case "legendary":
      return "border-yellow-300";
    default:
      return "border-gray-300";
  }
};

// Mock recent unlocks for demo
export const RECENT_UNLOCKS: string[] = ["reflection-streak-3", "early-bird"];
