import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MessageCircleIcon, ZapIcon } from "lucide-react";

interface AiCoachCardProps {
  id: string;
  name: string;
  description: string;
  avatar: string;
  responseTime?: string;
  specialties?: string[];
  className?: string;
}

export default function AiCoachCard({
  id,
  name,
  description,
  avatar,
  responseTime = "Instant",
  specialties = [],
  className,
}: AiCoachCardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="flex items-center">
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
          />

          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
            <ZapIcon size={14} className="text-white" />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <div className="flex items-center">
              <span className="text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                AI Coach
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>

      {specialties.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center text-xs text-gray-500">
        <ZapIcon size={14} className="mr-1 text-indigo-500" />

        <span>Response time: {responseTime}</span>
      </div>

      <div className="mt-4">
        <Link
          to={`/coaching-ai/${id}`}
          className="w-full flex items-center justify-center px-4 py-2.5 bg-indigo-500 text-white rounded-full text-sm font-medium hover:bg-indigo-600 transition-colors"
        >
          <MessageCircleIcon size={16} className="mr-1" />
          Start Conversation
        </Link>
      </div>
    </div>
  );
}
