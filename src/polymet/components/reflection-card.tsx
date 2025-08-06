import React, { useState } from "react";
import { Link2Icon, MoreHorizontalIcon } from "lucide-react";

interface ReflectionCardProps {
  id: string;
  title: string;
  date: string;
  stage: "Stage 1" | "Stage 2" | "Stage 3" | "Stage 4" | "Stage 5" | "Unguided";
  preview: string;
  viewMode?: "card" | "list";
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const stageColors = {
  "Stage 1": "bg-sky-100 text-sky-700",
  "Stage 2": "bg-sky-100 text-sky-700",
  "Stage 3": "bg-indigo-100 text-indigo-700",
  "Stage 4": "bg-indigo-100 text-indigo-700",
  "Stage 5": "bg-purple-100 text-purple-700",
  Unguided: "bg-gray-100 text-gray-600",
};

export default function ReflectionCard({
  id,
  title,
  date,
  stage,
  preview,
  viewMode = "card",
  onEdit,
  onDelete,
}: ReflectionCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleTouchStart = () => {
    const timer = setTimeout(() => {
      setShowMenu(true);
      // Add haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, 500);
    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleEdit = () => {
    onEdit?.(id);
    setShowMenu(false);
  };

  const handleDelete = () => {
    onDelete?.(id);
    setShowMenu(false);
  };

  if (viewMode === "list") {
    return (
      <div className="relative">
        <div
          className="bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 ease-out min-h-[44px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
          data-testid={`reflection-card-${id}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-base font-semibold text-gray-900 truncate">
                  {title}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${stageColors[stage]}`}
                >
                  {stage}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">{date}</p>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {preview}
              </p>
            </div>
            <div className="flex items-center space-x-2 ml-3">
              <button
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                disabled
                title="Future feature"
              >
                <Link2Icon size={16} />
              </button>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MoreHorizontalIcon size={16} />
              </button>
            </div>
          </div>
        </div>

        {showMenu && (
          <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]">
            <button
              onClick={handleEdit}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 ease-out h-full min-h-[128px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        data-testid={`reflection-card-${id}`}
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-900 leading-tight flex-1 min-w-0 pr-2">
            {title}
          </h3>
          <button
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            disabled
            title="Future feature"
          >
            <Link2Icon size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-gray-600">{date}</p>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${stageColors[stage]}`}
          >
            {stage}
          </span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
          {preview}
        </p>

        <button
          onClick={() => setShowMenu(!showMenu)}
          className="absolute top-2 right-8 p-1 text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
        >
          <MoreHorizontalIcon size={16} />
        </button>
      </div>

      {showMenu && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]">
          <button
            onClick={handleEdit}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
