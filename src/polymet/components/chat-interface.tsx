import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import MessageBubble from "@/polymet/components/message-bubble";
import ChatInput from "@/polymet/components/chat-input";

export interface Message {
  id: string;
  content: string;
  isAi: boolean;
  timestamp: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isAiTyping?: boolean;
  className?: string;
  aiName?: string;
}

export default function ChatInterface({
  messages,
  onSendMessage,
  isAiTyping = false,
  className,
  aiName = "AI Coach",
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping]);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              content={message.content}
              isAi={message.isAi}
              timestamp={message.timestamp}
            />
          ))}

          {isAiTyping && (
            <div className="flex items-center">
              <div className="max-w-[80%] rounded-2xl rounded-bl-none bg-white px-4 py-3">
                <div className="mb-1 flex items-center">
                  <span className="text-xs font-medium text-indigo-500">
                    {aiName} is typing
                  </span>
                </div>
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 p-4">
        <ChatInput
          onSend={onSendMessage}
          disabled={isAiTyping}
          placeholder={
            isAiTyping ? `${aiName} is typing...` : "Type your message..."
          }
        />
      </div>
    </div>
  );
}
