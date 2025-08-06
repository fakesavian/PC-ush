import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon, InfoIcon } from "lucide-react";
import GradientBackground from "@/polymet/components/gradient-background";
import ChatInterface from "@/polymet/components/chat-interface";
import {
  AI_COACH_CONVERSATIONS,
  Message,
} from "@/polymet/data/ai-coach-conversations";

export default function AiCoachChat() {
  const { coachId = "1" } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [coachName, setCoachName] = useState("AI Coach");

  useEffect(() => {
    // Find the conversation for this coach
    const conversation = AI_COACH_CONVERSATIONS.find(
      (convo) => convo.coachId === coachId
    );

    if (conversation) {
      setMessages(conversation.messages);
      setCoachName(conversation.coachName);
    } else {
      // If no conversation exists, create a welcome message
      const welcomeMessage: Message = {
        id: "welcome",
        content: `Hi there! I'm your AI coach. How can I help you today?`,
        isAi: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([welcomeMessage]);
    }
  }, [coachId]);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      isAi: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsAiTyping(true);

    // Simulate AI response after a delay
    setTimeout(
      () => {
        const aiResponses: Record<string, string> = {
          "1": "Based on what you've shared, I recommend incorporating more compound exercises like squats and deadlifts into your routine. These movements engage multiple muscle groups and can help you build strength more efficiently. Would you like me to suggest a specific workout plan?",
          "2": "Mindfulness is about being present in the moment. Try this simple exercise: focus on your breath for just 2 minutes, noticing the sensation of air entering and leaving your body. When your mind wanders, gently bring your attention back to your breath. How does that feel?",
          "3": "To improve your focus, try creating a dedicated workspace free from distractions. Also, consider using the 2-minute rule: if a task takes less than 2 minutes, do it immediately rather than putting it off. Would you like more productivity tips?",
          "4": "Eating healthier doesn't have to be complicated. Start by adding one more serving of vegetables to your meals and drinking water instead of sugary beverages. Small, consistent changes often lead to the most sustainable results. What's one healthy change you could make today?",
          default:
            "Thank you for sharing. I'm here to support you on your journey. What specific aspect would you like guidance on next?",
        };

        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          content: aiResponses[coachId] || aiResponses.default,
          isAi: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsAiTyping(false);
      },
      1500 + Math.random() * 1000
    );
  };

  return (
    <GradientBackground variant="blue" className="flex h-full flex-col p-0">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white/80 p-4 backdrop-blur-sm">
        <Link
          to="/coaching-ai"
          className="flex items-center text-gray-700 hover:text-gray-900"
        >
          <ArrowLeftIcon size={20} className="mr-1" />

          <span className="text-sm font-medium">Back</span>
        </Link>

        <h1 className="text-lg font-bold text-gray-900">{coachName}</h1>

        <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
          <InfoIcon size={20} />
        </button>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden">
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          isAiTyping={isAiTyping}
          aiName={coachName}
        />
      </div>
    </GradientBackground>
  );
}
