import React from "react";
import { cn } from "@/lib/utils";
import { StarIcon, MessageCircleIcon } from "lucide-react";

interface CoachProfileCardProps {
  name: string;
  title: string;
  avatar: string;
  rating?: number;
  specialties?: string[];
  isAvailable?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function CoachProfileCard({
  name,
  title,
  avatar,
  rating = 0,
  specialties = [],
  isAvailable = false,
  onClick,
  className,
}: CoachProfileCardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
          />

          {isAvailable && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            {rating > 0 && (
              <div className="flex items-center">
                <StarIcon
                  size={16}
                  className="text-yellow-500 fill-yellow-500 mr-1"
                />

                <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>

      {specialties.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-sky-50 text-sky-700 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-between">
        <button className="flex items-center justify-center px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium hover:bg-sky-200 transition-colors">
          View Profile
        </button>
        <button className="flex items-center justify-center px-4 py-2 bg-sky-500 text-white rounded-full text-sm font-medium hover:bg-sky-600 transition-colors">
          <MessageCircleIcon size={16} className="mr-1" />
          Message
        </button>
      </div>
    </div>
  );
}
