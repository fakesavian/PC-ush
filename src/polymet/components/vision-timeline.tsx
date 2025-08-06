import React, { useState } from "react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ClockIcon,
  EyeIcon,
  GitCompareIcon,
  StarIcon,
} from "lucide-react";
import { VisionRevision } from "@/polymet/data/future-self-board-data";

interface VisionTimelineProps {
  revisions: VisionRevision[];
  activeRevisionId: string;
  onRevisionSelect: (revisionId: string) => void;
  onCompareRevisions?: (revision1Id: string, revision2Id: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface TimelineItemProps {
  revision: VisionRevision;
  isActive: boolean;
  isLatest: boolean;
  onClick: () => void;
  onCompare?: () => void;
}

function TimelineItem({
  revision,
  isActive,
  isLatest,
  onClick,
  onCompare,
}: TimelineItemProps) {
  const getStageColor = (stageId: number | null) => {
    if (!stageId) return "bg-gray-400";

    const colors = {
      1: "bg-green-500",
      2: "bg-teal-500",
      3: "bg-blue-500",
      4: "bg-purple-500",
      5: "bg-yellow-500",
    };
    return colors[stageId as keyof typeof colors] || "bg-gray-400";
  };

  const getStageLabel = (stageId: number | null) => {
    if (!stageId) return "Unguided";
    return `Stage ${stageId}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getPreviewText = (content: string) => {
    // Extract first meaningful line after title
    const lines = content.split("\n").filter((line) => line.trim());
    const contentLine = lines.find(
      (line) => !line.startsWith("#") && line.trim().length > 0
    );
    return contentLine
      ? contentLine.substring(0, 80) + "..."
      : "No preview available";
  };

  return (
    <div
      className={`relative p-4 border-l-4 cursor-pointer transition-all duration-200 ${
        isActive
          ? "border-l-sky-500 bg-sky-50 shadow-sm"
          : "border-l-gray-200 hover:border-l-gray-300 hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      {/* Timeline dot */}
      <div
        className={`absolute -left-2 top-6 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
          isActive ? "bg-sky-500" : "bg-gray-300"
        }`}
      >
        {isLatest && (
          <StarIcon size={8} className="text-white absolute top-0.5 left-0.5" />
        )}
      </div>

      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getStageColor(revision.stageId)}`}
            >
              {getStageLabel(revision.stageId)}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <ClockIcon size={12} />

              {formatDate(revision.createdAt)}
            </span>
            {isLatest && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                Current
              </span>
            )}
          </div>

          {/* Progress */}
          <div className="mb-2">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Completion</span>
              <span>{revision.completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-sky-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${revision.completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Preview */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {getPreviewText(revision.content)}
          </p>

          {/* AI Suggestions count */}
          {revision.aiSuggestions && revision.aiSuggestions.length > 0 && (
            <div className="mt-2 text-xs text-purple-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              {revision.aiSuggestions.length} AI insights available
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // View full revision
            }}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white rounded transition-colors"
            title="View full revision"
          >
            <EyeIcon size={14} />
          </button>
          {onCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCompare();
              }}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white rounded transition-colors"
              title="Compare with current"
            >
              <GitCompareIcon size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VisionTimeline({
  revisions,
  activeRevisionId,
  onRevisionSelect,
  onCompareRevisions,
  isCollapsed = false,
  onToggleCollapse,
}: VisionTimelineProps) {
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>(
    []
  );

  const sortedRevisions = [...revisions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleRevisionClick = (revisionId: string) => {
    if (compareMode) {
      if (selectedForComparison.includes(revisionId)) {
        setSelectedForComparison(
          selectedForComparison.filter((id) => id !== revisionId)
        );
      } else if (selectedForComparison.length < 2) {
        const newSelection = [...selectedForComparison, revisionId];
        setSelectedForComparison(newSelection);

        if (newSelection.length === 2 && onCompareRevisions) {
          onCompareRevisions(newSelection[0], newSelection[1]);
          setCompareMode(false);
          setSelectedForComparison([]);
        }
      }
    } else {
      onRevisionSelect(revisionId);
    }
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    setSelectedForComparison([]);
  };

  if (isCollapsed) {
    return (
      <div className="bg-white border-r border-gray-200">
        <button
          onClick={onToggleCollapse}
          className="w-full p-4 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border-r border-gray-200 w-80 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Vision History</h3>
          <button
            onClick={onToggleCollapse}
            className="p-1 text-gray-500 hover:text-gray-700 rounded transition-colors"
          >
            <ChevronDownIcon size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-gray-500">
            {revisions.length} revision{revisions.length !== 1 ? "s" : ""}
          </span>

          <button
            onClick={toggleCompareMode}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              compareMode
                ? "bg-purple-100 text-purple-700"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            {compareMode ? "Cancel Compare" : "Compare"}
          </button>
        </div>

        {compareMode && (
          <div className="mt-2 text-xs text-purple-600 bg-purple-50 p-2 rounded">
            Select 2 revisions to compare ({selectedForComparison.length}/2)
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          {sortedRevisions.map((revision, index) => (
            <TimelineItem
              key={revision.id}
              revision={revision}
              isActive={
                compareMode
                  ? selectedForComparison.includes(revision.id)
                  : revision.id === activeRevisionId
              }
              isLatest={index === 0}
              onClick={() => handleRevisionClick(revision.id)}
              onCompare={
                onCompareRevisions
                  ? () => {
                      if (revision.id !== activeRevisionId) {
                        onCompareRevisions(activeRevisionId, revision.id);
                      }
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {sortedRevisions[0]?.completionPercentage || 0}%
            </div>
            <div className="text-xs text-gray-500">Current Progress</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {Math.ceil(
                (Date.now() -
                  new Date(revisions[0]?.createdAt || Date.now()).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}
            </div>
            <div className="text-xs text-gray-500">Days Since Start</div>
          </div>
        </div>
      </div>
    </div>
  );
}
