export interface ReflectionEntry {
  id: string;
  title: string;
  date: string;
  stage: "Stage 1" | "Stage 2" | "Stage 3" | "Stage 4" | "Stage 5" | "Unguided";
  preview: string;
  content: string;
  createdAt: string;
}

export const REFLECTION_ENTRIES: ReflectionEntry[] = [
  {
    id: "1",
    title: "Breaking Through My Comfort Zone",
    date: "Dec 15, 2023",
    stage: "Stage 2",
    preview:
      "Today I finally took that leap I've been avoiding for months. The fear was real, but so was the growth that came after...",
    content:
      "Today I finally took that leap I've been avoiding for months. The fear was real, but so was the growth that came after. I've been putting off having that difficult conversation with my manager about my career goals, and today I finally did it.\n\nThe anticipation was worse than the actual conversation. My manager was actually very receptive and we're now planning a development path that aligns with my aspirations. It's amazing how our minds can build up scenarios that are far worse than reality.\n\nKey takeaway: Fear is often just False Evidence Appearing Real. The stories we tell ourselves about potential negative outcomes rarely match what actually happens.",
    createdAt: "2023-12-15T14:30:00Z",
  },
  {
    id: "2",
    title: "Small Wins Add Up",
    date: "Dec 12, 2023",
    stage: "Stage 1",
    preview:
      "Celebrating the tiny victories today. Sometimes progress isn't about giant leaps but consistent small steps forward...",
    content:
      "Celebrating the tiny victories today. Sometimes progress isn't about giant leaps but consistent small steps forward. I completed my morning routine for the 7th day in a row - meditation, journaling, and a 20-minute walk.\n\nIt might seem small, but these habits are becoming the foundation of my day. I notice I'm more centered, more intentional with my choices, and less reactive to stress.\n\nProgress isn't always dramatic. Sometimes it's just showing up consistently, day after day, building the person you want to become one small action at a time.",
    createdAt: "2023-12-12T09:15:00Z",
  },
  {
    id: "3",
    title: "Mindset Shift Moment",
    date: "Dec 10, 2023",
    stage: "Stage 3",
    preview:
      "Had a profound realization about how I've been limiting myself. The stories we tell ourselves really do shape our reality...",
    content:
      "Had a profound realization about how I've been limiting myself. The stories we tell ourselves really do shape our reality. I caught myself saying 'I'm not good at public speaking' and realized I've been reinforcing this belief for years.\n\nBut when I looked at the evidence, I realized this story isn't based on facts - it's based on one embarrassing moment in high school that I've let define me for over a decade.\n\nI'm choosing to rewrite this narrative. Instead of 'I'm not good at public speaking,' I'm adopting 'I'm developing my public speaking skills.' It's a small shift in language but a massive shift in possibility.",
    createdAt: "2023-12-10T16:45:00Z",
  },
  {
    id: "4",
    title: "Random Thoughts",
    date: "Dec 8, 2023",
    stage: "Unguided",
    preview:
      "Just writing to clear my head today. Sometimes the best insights come when we're not trying to be profound...",
    content:
      "Just writing to clear my head today. Sometimes the best insights come when we're not trying to be profound. My mind has been scattered lately with all the holiday preparations and year-end work deadlines.\n\nWriting helps me process. There's something about getting thoughts out of my head and onto paper (or screen) that creates clarity. It's like decluttering my mental space.\n\nNo big revelations today, just grateful for this practice of reflection. Even the mundane entries serve a purpose.",
    createdAt: "2023-12-08T20:22:00Z",
  },
  {
    id: "5",
    title: "Embracing Vulnerability",
    date: "Dec 5, 2023",
    stage: "Stage 4",
    preview:
      "Opened up to a friend about my struggles today. Vulnerability is scary but it's also where connection happens...",
    content:
      "Opened up to a friend about my struggles today. Vulnerability is scary but it's also where connection happens. I've been carrying this weight of perfectionism, trying to appear like I have everything figured out.\n\nToday I admitted to Sarah that I've been struggling with imposter syndrome at work. Instead of judgment, I received understanding and support. She shared her own similar experiences.\n\nBrené Brown was right - vulnerability is the birthplace of courage, creativity, and change. When we show up authentically, we give others permission to do the same.",
    createdAt: "2023-12-05T18:10:00Z",
  },
  {
    id: "6",
    title: "The Power of Saying No",
    date: "Dec 3, 2023",
    stage: "Stage 2",
    preview:
      "Declined a social invitation today and felt guilty at first, but then realized it was exactly what I needed...",
    content:
      "Declined a social invitation today and felt guilty at first, but then realized it was exactly what I needed. I've been overcommitting lately and feeling stretched thin.\n\nSaying no to this party meant saying yes to rest, to recharging, to being present with my family. It's a boundary I'm learning to set more consistently.\n\nNo is a complete sentence. I don't need to justify my need for downtime or explain why I'm prioritizing my well-being.",
    createdAt: "2023-12-03T15:30:00Z",
  },
  {
    id: "7",
    title: "Gratitude Practice",
    date: "Nov 30, 2023",
    stage: "Stage 1",
    preview:
      "Ending November with reflection on what I'm grateful for. It's been a month of growth and challenges...",
    content:
      "Ending November with reflection on what I'm grateful for. It's been a month of growth and challenges, but mostly growth.\n\nGrateful for:\n- The courage to start this reflection practice\n- Friends who listen without trying to fix\n- Small moments of joy in everyday life\n- The opportunity to learn and grow from mistakes\n- My health and the health of my loved ones\n\nGratitude shifts perspective. Even on difficult days, there's always something to appreciate.",
    createdAt: "2023-11-30T21:45:00Z",
  },
  {
    id: "8",
    title: "Learning from Failure",
    date: "Nov 28, 2023",
    stage: "Stage 3",
    preview:
      "Made a mistake at work today that felt devastating in the moment, but I'm trying to see it as a learning opportunity...",
    content:
      "Made a mistake at work today that felt devastating in the moment, but I'm trying to see it as a learning opportunity. I sent an email to the wrong client with sensitive information.\n\nMy initial reaction was shame and panic. But after talking it through with my supervisor, we turned it into a process improvement discussion. We're now implementing better safeguards to prevent similar mistakes.\n\nFailure isn't the opposite of success - it's part of success. Every mistake is data that helps us improve our systems and processes.",
    createdAt: "2023-11-28T17:20:00Z",
  },
  {
    id: "9",
    title: "Finding Balance",
    date: "Nov 25, 2023",
    stage: "Stage 5",
    preview:
      "Reflecting on work-life balance and what it actually means to me. It's not about perfect equilibrium...",
    content:
      "Reflecting on work-life balance and what it actually means to me. It's not about perfect equilibrium - some days work needs more attention, other days personal life takes priority.\n\nBalance is more like a dance than a static state. It's about being intentional with my energy and attention, making conscious choices about where to invest my time.\n\nI'm learning to be present wherever I am instead of feeling guilty about where I'm not. When I'm at work, I'm fully at work. When I'm with family, I'm fully with family.",
    createdAt: "2023-11-25T12:15:00Z",
  },
  {
    id: "10",
    title: "Weekend Reflections",
    date: "Nov 22, 2023",
    stage: "Unguided",
    preview:
      "Quiet Saturday morning thoughts. Sometimes the most profound insights come in the stillness...",
    content:
      "Quiet Saturday morning thoughts. Sometimes the most profound insights come in the stillness. No agenda today, just sitting with my coffee and watching the world wake up outside my window.\n\nThere's something sacred about these unstructured moments. No goals to achieve, no problems to solve, just being present with whatever arises.\n\nI'm learning to value these spaces between the doing. They're not empty time - they're fertile ground for creativity and insight.",
    createdAt: "2023-11-22T08:30:00Z",
  },
];

export const getReflectionsByStage = (stage: string): ReflectionEntry[] => {
  if (stage === "all") return REFLECTION_ENTRIES;

  const stageMap: Record<string, string> = {
    "stage-1": "Stage 1",
    "stage-2": "Stage 2",
    "stage-3": "Stage 3",
    "stage-4": "Stage 4",
    "stage-5": "Stage 5",
    unguided: "Unguided",
  };

  const targetStage = stageMap[stage];
  return REFLECTION_ENTRIES.filter((entry) => entry.stage === targetStage);
};

export const getReflectionsByDateRange = (
  startDate: string | null,
  endDate: string | null
): ReflectionEntry[] => {
  if (!startDate && !endDate) return REFLECTION_ENTRIES;

  return REFLECTION_ENTRIES.filter((entry) => {
    const entryDate = new Date(entry.createdAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return entryDate >= start && entryDate <= end;
    } else if (start) {
      return entryDate >= start;
    } else if (end) {
      return entryDate <= end;
    }

    return true;
  });
};
