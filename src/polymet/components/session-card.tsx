import React from "react";
import { cn } from "@/lib/utils";
import { CalendarIcon, ClockIcon, VideoIcon } from "lucide-react";

interface SessionCardProps {
  coachName: string;
  coachAvatar: string;
  date: string;
  time: string;
  duration: string;
  topic?: string;
  isUpcoming?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function SessionCard({
  coachName,
  coachAvatar,
  date,
  time,
  duration,
  topic,
  isUpcoming = false,
  onClick,
  className,
}: SessionCardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow",
        isUpcoming && "border-l-4 border-teal-500",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <img
          src={coachAvatar}
          alt={coachName}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
        />

        <div className="ml-3">
          <h3 className="font-medium text-gray-900">{coachName}</h3>
          {topic && <p className="text-sm text-gray-600">{topic}</p>}
        </div>
        {isUpcoming && (
          <span className="ml-auto text-xs font-medium px-2 py-1 bg-teal-100 text-teal-700 rounded-full">
            Upcoming
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="flex items-center">
          <CalendarIcon size={16} className="text-gray-500 mr-2" />

          <span className="text-sm text-gray-700">{date}</span>
        </div>
        <div className="flex items-center">
          <ClockIcon size={16} className="text-gray-500 mr-2" />

          <span className="text-sm text-gray-700">{time}</span>
        </div>
      </div>

      <div className="mt-2 flex items-center">
        <div className="flex items-center">
          <VideoIcon size={16} className="text-gray-500 mr-2" />

          <span className="text-sm text-gray-700">{duration} session</span>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        {isUpcoming ? (
          <>
            <button className="flex-1 py-2 bg-teal-500 text-white rounded-full text-sm font-medium hover:bg-teal-600 transition-colors">
              Join Session
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
              Reschedule
            </button>
          </>
        ) : (
          <button className="w-full py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium hover:bg-sky-200 transition-colors">
            Book Again
          </button>
        )}
      </div>
    </div>
  );
}
