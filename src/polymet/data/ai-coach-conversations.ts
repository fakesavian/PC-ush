export interface Message {
  id: string;
  content: string;
  isAi: boolean;
  timestamp: string;
}

export interface Conversation {
  id: string;
  coachId: string;
  coachName: string;
  messages: Message[];
  lastActive: string;
}

export const AI_COACH_CONVERSATIONS: Conversation[] = [
  {
    id: "fitbot-convo",
    coachId: "1",
    coachName: "FitBot",
    lastActive: "2023-06-15T14:30:00",
    messages: [
      {
        id: "msg1",
        content:
          "Hi there! I'm FitBot, your AI fitness coach. How can I help you today?",
        isAi: true,
        timestamp: "2:30 PM",
      },
      {
        id: "msg2",
        content:
          "I want to start a new workout routine focused on strength training.",
        isAi: false,
        timestamp: "2:31 PM",
      },
      {
        id: "msg3",
        content:
          "That's great! Strength training is excellent for building muscle, increasing metabolism, and improving overall health. How many days per week can you commit to working out?",
        isAi: true,
        timestamp: "2:32 PM",
      },
      {
        id: "msg4",
        content: "I can commit to 3-4 days per week.",
        isAi: false,
        timestamp: "2:33 PM",
      },
      {
        id: "msg5",
        content:
          "Perfect! For a 3-4 day strength training routine, I recommend a split that focuses on different muscle groups each day. Here's a simple plan to get you started:\n\nDay 1: Upper Body (Chest, Back, Shoulders, Arms)\n- Push-ups: 3 sets of 10-12 reps\n- Dumbbell rows: 3 sets of 10-12 reps per arm\n- Overhead press: 3 sets of 10-12 reps\n- Bicep curls: 3 sets of 10-12 reps\n\nDay 2: Lower Body (Legs, Core)\n- Squats: 3 sets of 12-15 reps\n- Lunges: 3 sets of 10 reps per leg\n- Glute bridges: 3 sets of 15 reps\n- Planks: 3 sets, hold for 30-60 seconds\n\nDay 3: Rest or light cardio\n\nDay 4: Full Body\n- Deadlifts: 3 sets of 8-10 reps\n- Bench press or push-ups: 3 sets of 10-12 reps\n- Pull-ups or assisted pull-ups: 3 sets of 6-8 reps\n- Russian twists: 3 sets of 15 reps per side\n\nHow does this sound? Would you like me to adjust anything based on your preferences or available equipment?",
        isAi: true,
        timestamp: "2:35 PM",
      },
    ],
  },
  {
    id: "mindful-convo",
    coachId: "2",
    coachName: "MindfulAI",
    lastActive: "2023-06-14T09:15:00",
    messages: [
      {
        id: "msg1",
        content:
          "Welcome to MindfulAI. I'm here to help you develop a meditation practice that works for you. How are you feeling today?",
        isAi: true,
        timestamp: "9:15 AM",
      },
      {
        id: "msg2",
        content: "I'm feeling stressed about work and having trouble sleeping.",
        isAi: false,
        timestamp: "9:16 AM",
      },
      {
        id: "msg3",
        content:
          "I'm sorry to hear you're feeling stressed. Meditation can definitely help with both stress management and sleep quality. Would you like to try a short guided meditation for stress relief now, or would you prefer some techniques specifically for better sleep?",
        isAi: true,
        timestamp: "9:17 AM",
      },
      {
        id: "msg4",
        content: "I'd like some techniques for better sleep please.",
        isAi: false,
        timestamp: "9:18 AM",
      },
      {
        id: "msg5",
        content:
          "Great choice! Here are some effective meditation techniques for better sleep:\n\n1. Body Scan Meditation: Lie down in a comfortable position and slowly bring attention to each part of your body, from toes to head, relaxing each area as you go.\n\n2. 4-7-8 Breathing: Inhale quietly through your nose for 4 seconds, hold your breath for 7 seconds, then exhale completely through your mouth for 8 seconds. Repeat 3-4 times before bed.\n\n3. Visualization: Imagine yourself in a peaceful, safe place like a beach or forest. Engage all your senses - what do you see, hear, smell, and feel in this place?\n\nWould you like me to guide you through one of these techniques now?",
        isAi: true,
        timestamp: "9:20 AM",
      },
    ],
  },
  {
    id: "productivity-convo",
    coachId: "3",
    coachName: "ProductivityPro",
    lastActive: "2023-06-13T16:45:00",
    messages: [
      {
        id: "msg1",
        content:
          "Hello! I'm ProductivityPro, your AI productivity coach. I can help you manage your time better, build effective habits, and achieve your goals. What would you like to work on today?",
        isAi: true,
        timestamp: "4:45 PM",
      },
      {
        id: "msg2",
        content:
          "I have trouble focusing on tasks and often procrastinate. Any tips?",
        isAi: false,
        timestamp: "4:46 PM",
      },
      {
        id: "msg3",
        content:
          'Procrastination and focus issues are very common challenges! Here are some evidence-based strategies that might help:\n\n1. Try the Pomodoro Technique: Work for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer 15-30 minute break.\n\n2. Use implementation intentions: Instead of saying "I\'ll work on my project today," say "At 10am, I\'ll sit at my desk and work on my project for 1 hour."\n\n3. Make tasks smaller: Break down large tasks into smaller, more manageable steps.\n\n4. Remove distractions: Put your phone in another room, use website blockers, or work in a quiet environment.\n\nWhich of these would you like to explore further?',
        isAi: true,
        timestamp: "4:48 PM",
      },
    ],
  },
  {
    id: "nutri-convo",
    coachId: "4",
    coachName: "NutriCoach",
    lastActive: "2023-06-12T12:20:00",
    messages: [
      {
        id: "msg1",
        content:
          "Hi there! I'm NutriCoach, your AI nutrition assistant. I can help you develop healthy eating habits, plan meals, and reach your nutrition goals. How can I assist you today?",
        isAi: true,
        timestamp: "12:20 PM",
      },
      {
        id: "msg2",
        content:
          "I want to eat healthier but I don't have much time to cook. Any suggestions?",
        isAi: false,
        timestamp: "12:21 PM",
      },
      {
        id: "msg3",
        content:
          "I completely understand the time challenge! Here are some quick and healthy meal ideas for busy people:\n\n1. Meal prep on weekends: Spend 1-2 hours preparing basics like grilled chicken, roasted vegetables, and cooked grains that you can mix and match throughout the week.\n\n2. One-pot or sheet pan meals: Throw protein, vegetables, and a starch on a sheet pan with olive oil and seasonings. Roast at 400°F for about 20-30 minutes.\n\n3. Healthy convenience foods: Stock up on pre-washed salad greens, canned beans, frozen vegetables, rotisserie chicken, and pre-cooked grains.\n\n4. Simple formula meals: Follow the template of protein + vegetable + healthy carb for balanced meals without recipes.\n\nWould you like specific quick recipe ideas or more meal prep tips?",
        isAi: true,
        timestamp: "12:23 PM",
      },
    ],
  },
];
