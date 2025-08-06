// Stage Tracks Data - Mock data for the transformation journey

export interface StageData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stageNumber: 1 | 2 | 3 | 4 | 5;
  isUnlocked: boolean;
  progress: number; // 0-100
  petLevel: number; // 1-5
  petType: "plant" | "pet";
  illustration: string;
  color: string;
  exercises: Exercise[];
  prompts: DailyPrompt[];
  checkIns: CheckIn[];
  audio?: AudioContent[];
  completedAt?: Date;
}

export interface Exercise {
  id: string;
  title: string;
  type: "worksheet" | "reflection" | "practice";
  isCompleted: boolean;
  estimatedMinutes: number;
  content: string;
  attachments?: string[];
}

export interface DailyPrompt {
  id: string;
  question: string;
  day: number;
  isCompleted: boolean;
  userResponse?: string;
  completedAt?: Date;
}

export interface CheckIn {
  id: string;
  title: string;
  frequency: "daily" | "weekly" | "milestone";
  questions: string[];
  isCompleted: boolean;
  responses?: Record<string, string>;
}

export interface AudioContent {
  id: string;
  title: string;
  duration: string;
  url: string;
  isCompleted: boolean;
  transcript?: string;
}

export interface PetEvolution {
  level: number;
  name: string;
  emoji: string;
  description: string;
  unlockedAt: number; // progress percentage
}

export const PET_EVOLUTIONS: PetEvolution[] = [
  {
    level: 1,
    name: "Seedling",
    emoji: "🌱",
    description: "Your journey begins with a tiny seed of potential",
    unlockedAt: 0,
  },
  {
    level: 2,
    name: "Sprout",
    emoji: "🌿",
    description: "First signs of growth and understanding emerge",
    unlockedAt: 25,
  },
  {
    level: 3,
    name: "Young Tree",
    emoji: "🌳",
    description: "Strong foundations support continued growth",
    unlockedAt: 50,
  },
  {
    level: 4,
    name: "Mature Tree",
    emoji: "🌲",
    description: "Wisdom and strength guide your transformation",
    unlockedAt: 75,
  },
  {
    level: 5,
    name: "Flourishing Oak",
    emoji: "🌰",
    description: "Full mastery achieved, ready to nurture others",
    unlockedAt: 100,
  },
];

export const STAGE_TRACKS_DATA: StageData[] = [
  {
    id: "stage-1",
    title: "Awareness",
    subtitle: "Discovering Your Patterns",
    description:
      "Begin your transformation by understanding your current patterns, beliefs, and behaviors that shape your daily experience.",
    stageNumber: 1,
    isUnlocked: true,
    progress: 100,
    petLevel: 2,
    petType: "plant",
    illustration: "🌱",
    color: "hsl(142, 76%, 36%)",
    exercises: [
      {
        id: "ex-1-1",
        title: "Personal Pattern Assessment",
        type: "worksheet",
        isCompleted: true,
        estimatedMinutes: 30,
        content:
          "Identify recurring patterns in your thoughts, emotions, and behaviors.",
      },
      {
        id: "ex-1-2",
        title: "Values Clarification Exercise",
        type: "reflection",
        isCompleted: true,
        estimatedMinutes: 20,
        content: "Discover what truly matters to you at your core.",
      },
      {
        id: "ex-1-3",
        title: "Mindfulness Foundation Practice",
        type: "practice",
        isCompleted: true,
        estimatedMinutes: 15,
        content: "Learn basic mindfulness techniques for self-observation.",
      },
    ],

    prompts: [
      {
        id: "prompt-1-1",
        question:
          "What patterns do you notice in your daily reactions to stress?",
        day: 1,
        isCompleted: true,
        userResponse:
          "I tend to avoid difficult conversations and procrastinate on important tasks.",
        completedAt: new Date("2023-12-01"),
      },
      {
        id: "prompt-1-2",
        question: "When do you feel most authentic and true to yourself?",
        day: 2,
        isCompleted: true,
        userResponse:
          "When I'm helping others solve problems or creating something new.",
        completedAt: new Date("2023-12-02"),
      },
    ],

    checkIns: [
      {
        id: "checkin-1-1",
        title: "Weekly Awareness Check",
        frequency: "weekly",
        questions: [
          "What new patterns did you notice this week?",
          "How did mindfulness practice affect your daily experience?",
        ],

        isCompleted: true,
        responses: {
          patterns: "I noticed I'm more reactive in the mornings before coffee",
          mindfulness: "It helped me pause before reacting to emails",
        },
      },
    ],

    completedAt: new Date("2023-12-07"),
  },
  {
    id: "stage-2",
    title: "Understanding",
    subtitle: "Exploring Root Causes",
    description:
      "Dive deeper into the why behind your patterns. Understand the origins of your beliefs and how they influence your choices.",
    stageNumber: 2,
    isUnlocked: true,
    progress: 75,
    petLevel: 2,
    petType: "plant",
    illustration: "🌿",
    color: "hsl(173, 58%, 39%)",
    exercises: [
      {
        id: "ex-2-1",
        title: "Belief System Mapping",
        type: "worksheet",
        isCompleted: true,
        estimatedMinutes: 45,
        content: "Map out your core beliefs and their origins.",
      },
      {
        id: "ex-2-2",
        title: "Childhood Influence Reflection",
        type: "reflection",
        isCompleted: true,
        estimatedMinutes: 30,
        content: "Explore how early experiences shaped your current worldview.",
      },
      {
        id: "ex-2-3",
        title: "Emotional Archaeology",
        type: "practice",
        isCompleted: false,
        estimatedMinutes: 25,
        content:
          "Practice identifying and understanding the layers of your emotional responses.",
      },
    ],

    prompts: [
      {
        id: "prompt-2-1",
        question:
          "What belief about yourself would you like to question or explore?",
        day: 8,
        isCompleted: true,
        userResponse:
          "I believe I'm not good enough to pursue my creative dreams.",
        completedAt: new Date("2023-12-08"),
      },
      {
        id: "prompt-2-2",
        question:
          "How do your family dynamics still influence your relationships today?",
        day: 9,
        isCompleted: false,
      },
    ],

    checkIns: [
      {
        id: "checkin-2-1",
        title: "Understanding Progress Check",
        frequency: "weekly",
        questions: [
          "What insights surprised you this week?",
          "Which beliefs are you ready to challenge?",
        ],

        isCompleted: false,
      },
    ],
  },
  {
    id: "stage-3",
    title: "Integration",
    subtitle: "Applying New Insights",
    description:
      "Take your newfound understanding and begin integrating healthier patterns and beliefs into your daily life.",
    stageNumber: 3,
    isUnlocked: true,
    progress: 25,
    petLevel: 3,
    petType: "plant",
    illustration: "🌳",
    color: "hsl(217, 91%, 60%)",
    exercises: [
      {
        id: "ex-3-1",
        title: "Daily Habit Redesign",
        type: "worksheet",
        isCompleted: true,
        estimatedMinutes: 40,
        content: "Design new daily habits that align with your authentic self.",
      },
      {
        id: "ex-3-2",
        title: "Boundary Setting Practice",
        type: "practice",
        isCompleted: false,
        estimatedMinutes: 30,
        content: "Learn to set healthy boundaries in relationships and work.",
      },
      {
        id: "ex-3-3",
        title: "Values-Based Decision Making",
        type: "reflection",
        isCompleted: false,
        estimatedMinutes: 20,
        content:
          "Practice making decisions based on your core values rather than external expectations.",
      },
    ],

    prompts: [
      {
        id: "prompt-3-1",
        question:
          "What's one small change you can make today that aligns with your authentic self?",
        day: 15,
        isCompleted: false,
      },
      {
        id: "prompt-3-2",
        question: "Where in your life do you need stronger boundaries?",
        day: 16,
        isCompleted: false,
      },
    ],

    checkIns: [
      {
        id: "checkin-3-1",
        title: "Integration Milestone",
        frequency: "milestone",
        questions: [
          "What new habits are becoming natural?",
          "How are others responding to your changes?",
        ],

        isCompleted: false,
      },
    ],

    audio: [
      {
        id: "audio-3-1",
        title: "Guided Integration Meditation",
        duration: "15 min",
        url: "/audio/integration-meditation.mp3",
        isCompleted: false,
        transcript: "A guided meditation to help integrate new insights...",
      },
    ],
  },
  {
    id: "stage-4",
    title: "Transformation",
    subtitle: "Embodying Change",
    description:
      "Fully embody your transformation as new patterns become second nature and you step into your authentic power.",
    stageNumber: 4,
    isUnlocked: false,
    progress: 0,
    petLevel: 3,
    petType: "plant",
    illustration: "🌲",
    color: "hsl(262, 83%, 58%)",
    exercises: [
      {
        id: "ex-4-1",
        title: "Authentic Leadership Assessment",
        type: "worksheet",
        isCompleted: false,
        estimatedMinutes: 35,
        content: "Assess your growth in leading from authenticity.",
      },
      {
        id: "ex-4-2",
        title: "Resilience Building Practice",
        type: "practice",
        isCompleted: false,
        estimatedMinutes: 25,
        content: "Strengthen your ability to bounce back from challenges.",
      },
    ],

    prompts: [
      {
        id: "prompt-4-1",
        question: "How has your relationship with yourself changed?",
        day: 22,
        isCompleted: false,
      },
    ],

    checkIns: [
      {
        id: "checkin-4-1",
        title: "Transformation Review",
        frequency: "weekly",
        questions: [
          "What aspects of your old self are you ready to release?",
          "How are you showing up differently in the world?",
        ],

        isCompleted: false,
      },
    ],
  },
  {
    id: "stage-5",
    title: "Mastery",
    subtitle: "Sharing Your Gifts",
    description:
      "Reach mastery by sharing your transformation with others and becoming a source of inspiration and guidance.",
    stageNumber: 5,
    isUnlocked: false,
    progress: 0,
    petLevel: 3,
    petType: "plant",
    illustration: "🌰",
    color: "hsl(43, 96%, 56%)",
    exercises: [
      {
        id: "ex-5-1",
        title: "Mentorship Preparation",
        type: "worksheet",
        isCompleted: false,
        estimatedMinutes: 50,
        content: "Prepare to guide others on their transformation journey.",
      },
    ],

    prompts: [
      {
        id: "prompt-5-1",
        question: "How can you share your transformation to help others?",
        day: 29,
        isCompleted: false,
      },
    ],

    checkIns: [
      {
        id: "checkin-5-1",
        title: "Mastery Celebration",
        frequency: "milestone",
        questions: [
          "What wisdom would you share with someone starting this journey?",
          "How will you continue growing?",
        ],

        isCompleted: false,
      },
    ],
  },
];

// Helper functions
export const getStageById = (id: string): StageData | undefined => {
  return STAGE_TRACKS_DATA.find((stage) => stage.id === id);
};

export const getUnlockedStages = (): StageData[] => {
  return STAGE_TRACKS_DATA.filter((stage) => stage.isUnlocked);
};

export const getCurrentPetEvolution = (progress: number): PetEvolution => {
  const evolution = PET_EVOLUTIONS.slice()
    .reverse()
    .find((pet) => progress >= pet.unlockedAt);
  return evolution || PET_EVOLUTIONS[0];
};

export const getOverallProgress = (): number => {
  const totalStages = STAGE_TRACKS_DATA.length;
  const completedStages = STAGE_TRACKS_DATA.filter(
    (stage) => stage.completedAt
  ).length;
  const currentProgress = STAGE_TRACKS_DATA.reduce(
    (sum, stage) => sum + stage.progress,
    0
  );
  return Math.round(currentProgress / totalStages);
};
