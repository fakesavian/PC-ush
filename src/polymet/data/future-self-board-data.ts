// Future-Self Board Data - Mock data for vision tracking and evolution

export interface VisionRevision {
  id: string;
  stageId: 1 | 2 | 3 | 4 | 5 | null;
  content: string; // markdown
  createdAt: string; // ISO
  completionPercentage: number;
  aiSuggestions?: string[];
}

export interface MoodboardAsset {
  id: string;
  type: "image" | "quote" | "note";
  src: string;
  text?: string;
  createdAt: string;
  position: { x: number; y: number };
  size: "small" | "medium" | "large";
}

export interface FutureSelfBoard {
  id: string;
  title: string;
  revisions: VisionRevision[];
  moodboard: MoodboardAsset[];
  lastUpdated: string;
  shareSettings: {
    isPublic: boolean;
    allowComments: boolean;
  };
}

export interface AIInsight {
  id: string;
  type: "pattern" | "suggestion" | "milestone";
  content: string;
  confidence: number;
  stageRelevant: number[];
  createdAt: string;
}

// Mock data
export const MOCK_VISION_REVISIONS: VisionRevision[] = [
  {
    id: "rev-1",
    stageId: 1,
    content: `# My Future Self Vision

I see myself as someone who **embraces authenticity** in every aspect of life. 

## Personal Growth
- Living with intention and purpose
- Making decisions from a place of self-awareness
- Building meaningful relationships based on genuine connection

## Professional Life  
- Leading with empathy and wisdom
- Creating work that aligns with my values
- Inspiring others through my authentic presence

## Daily Practices
- Morning meditation and reflection
- Journaling to process experiences
- Regular connection with nature`,
    createdAt: "2023-12-01T08:00:00Z",
    completionPercentage: 25,
    aiSuggestions: [
      "Consider adding specific metrics for measuring authenticity",
      "What does 'meaningful relationships' look like in practice?",
      "How will you know when you're living with intention?",
    ],
  },
  {
    id: "rev-2",
    stageId: 2,
    content: `# My Future Self Vision (Updated)

I see myself as someone who **embraces authenticity** while understanding the deeper patterns that shaped me.

## Personal Growth
- Living with intention and purpose, rooted in self-understanding
- Making decisions from awareness of my conditioning and true desires
- Building meaningful relationships through vulnerability and genuine connection
- **NEW**: Healing generational patterns and breaking cycles of limitation

## Professional Life
- Leading with empathy, wisdom, and emotional intelligence
- Creating work that serves both my growth and others' transformation
- Inspiring others through my authentic presence and shared journey
- **NEW**: Mentoring others who are discovering their authentic path

## Daily Practices
- Morning meditation with focus on inner child healing
- Journaling to process experiences and track pattern shifts
- Regular connection with nature as spiritual practice
- **NEW**: Weekly therapy sessions for continued growth`,
    createdAt: "2023-12-15T10:30:00Z",
    completionPercentage: 45,
    aiSuggestions: [
      "Your vision shows deeper self-awareness - consider adding community elements",
      "How might your healing journey inform your professional mission?",
      "What boundaries will support this authentic way of being?",
    ],
  },
  {
    id: "rev-3",
    stageId: 3,
    content: `# My Future Self Vision (Integration Phase)

I am becoming someone who **embodies authenticity** through integrated daily practices and transformed relationships.

## Personal Growth
- Living with clear intention, backed by consistent aligned action
- Making decisions from deep self-trust and values alignment  
- Maintaining meaningful relationships through healthy boundaries and open communication
- Actively healing generational patterns while honoring my lineage
- **NEW**: Teaching others about authentic living through my example

## Professional Life
- Leading teams with emotional intelligence and inclusive practices
- Creating transformational programs that blend personal and professional development
- Building a sustainable business model aligned with my values
- Mentoring emerging leaders in authentic leadership
- **NEW**: Speaking at conferences about the intersection of authenticity and success

## Daily Practices
- 20-minute morning meditation with gratitude and intention setting
- Evening journaling focused on integration and celebration
- Weekly nature immersion for spiritual renewal
- Monthly therapy sessions for maintenance and growth
- **NEW**: Bi-weekly coaching sessions to support others' journeys

## Relationships & Community
- **NEW**: Hosting monthly gatherings for conscious community building
- **NEW**: Maintaining 3-4 deep friendships with regular meaningful connection
- **NEW**: Dating with authenticity and clear communication of values`,
    createdAt: "2024-01-02T14:15:00Z",
    completionPercentage: 70,
    aiSuggestions: [
      "Your vision shows beautiful integration - consider legacy elements",
      "How will you measure the impact of your authentic leadership?",
      "What systems will sustain this way of being during challenging times?",
    ],
  },
];

export const MOCK_MOODBOARD_ASSETS: MoodboardAsset[] = [
  {
    id: "asset-1",
    type: "image",
    src: "https://picsum.photos/seed/nature1/400/300",
    createdAt: "2023-12-01T09:00:00Z",
    position: { x: 0, y: 0 },
    size: "medium",
  },
  {
    id: "asset-2",
    type: "quote",
    src: "",
    text: "The privilege of a lifetime is to become who you truly are. - Carl Jung",
    createdAt: "2023-12-01T09:15:00Z",
    position: { x: 1, y: 0 },
    size: "large",
  },
  {
    id: "asset-3",
    type: "note",
    src: "",
    text: "Remember: Authenticity isn't about perfection. It's about being real with yourself and others, even when it's uncomfortable.",
    createdAt: "2023-12-02T16:30:00Z",
    position: { x: 0, y: 1 },
    size: "small",
  },
  {
    id: "asset-4",
    type: "image",
    src: "https://picsum.photos/seed/meditation/300/400",
    createdAt: "2023-12-15T11:00:00Z",
    position: { x: 2, y: 0 },
    size: "medium",
  },
  {
    id: "asset-5",
    type: "quote",
    src: "",
    text: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it. - Rumi",
    createdAt: "2023-12-20T14:45:00Z",
    position: { x: 1, y: 1 },
    size: "medium",
  },
  {
    id: "asset-6",
    type: "note",
    src: "",
    text: "Integration insight: When I stopped trying to be who I thought I should be, I started becoming who I actually am. The relief was immediate.",
    createdAt: "2024-01-02T15:00:00Z",
    position: { x: 2, y: 1 },
    size: "large",
  },
];

export const MOCK_AI_INSIGHTS: AIInsight[] = [
  {
    id: "insight-1",
    type: "pattern",
    content:
      "Your vision revisions show increasing specificity around community and relationships. This suggests growing confidence in your interpersonal authenticity.",
    confidence: 0.85,
    stageRelevant: [2, 3],
    createdAt: "2023-12-20T10:00:00Z",
  },
  {
    id: "insight-2",
    type: "suggestion",
    content:
      "Consider adding elements about how you'll handle setbacks or challenges to your authentic way of being. Resilience planning could strengthen your vision.",
    confidence: 0.78,
    stageRelevant: [3, 4],
    createdAt: "2024-01-02T16:00:00Z",
  },
  {
    id: "insight-3",
    type: "milestone",
    content:
      "Congratulations! Your latest revision shows 70% completion markers. You're moving from understanding to active integration.",
    confidence: 0.92,
    stageRelevant: [3],
    createdAt: "2024-01-02T16:30:00Z",
  },
];

export const MOCK_FUTURE_SELF_BOARD: FutureSelfBoard = {
  id: "board-1",
  title: "My Authentic Future Self",
  revisions: MOCK_VISION_REVISIONS,
  moodboard: MOCK_MOODBOARD_ASSETS,
  lastUpdated: "2024-01-02T16:30:00Z",
  shareSettings: {
    isPublic: false,
    allowComments: true,
  },
};

// Helper functions
export const getCurrentRevision = (board: FutureSelfBoard): VisionRevision => {
  return board.revisions[board.revisions.length - 1];
};

export const getRevisionsByStage = (
  board: FutureSelfBoard,
  stageId: number
): VisionRevision[] => {
  return board.revisions.filter((rev) => rev.stageId === stageId);
};

export const calculateBoardCompletion = (board: FutureSelfBoard): number => {
  const currentRevision = getCurrentRevision(board);
  return currentRevision?.completionPercentage || 0;
};

export const getRelevantAIInsights = (stageId: number): AIInsight[] => {
  return MOCK_AI_INSIGHTS.filter((insight) =>
    insight.stageRelevant.includes(stageId)
  ).sort((a, b) => b.confidence - a.confidence);
};

export const shouldShowAISuggestion = (board: FutureSelfBoard): boolean => {
  const currentRevision = getCurrentRevision(board);
  const lastUpdate = new Date(board.lastUpdated);
  const daysSinceUpdate =
    (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);

  // Show AI suggestion if it's been 3+ days since last update or completion increased by 20%+
  return (
    daysSinceUpdate >= 3 || (currentRevision?.completionPercentage || 0) >= 60
  );
};
