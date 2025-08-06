import React from "react";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  title: string;
  message: string;
  time: string;
  icon: React.ReactNode;
  isRead?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function NotificationCard({
  title,
  message,
  time,
  icon,
  isRead = false,
  onClick,
  className,
}: NotificationCardProps) {
  return (
    <div
      className={cn(
        "flex p-4 rounded-xl bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-colors",
        !isRead && "border-l-4 border-sky-500",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-100 text-sky-600 mr-3 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3
            className={cn(
              "font-medium",
              isRead ? "text-gray-700" : "text-gray-900"
            )}
          >
            {title}
          </h3>
          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
            {time}
          </span>
        </div>
        <p
          className={cn(
            "text-sm line-clamp-2",
            isRead ? "text-gray-500" : "text-gray-700"
          )}
        >
          {message}
        </p>
      </div>
      {!isRead && (
        <div className="w-2 h-2 rounded-full bg-sky-500 ml-2 mt-1 flex-shrink-0"></div>
      )}
    </div>
  );
}
