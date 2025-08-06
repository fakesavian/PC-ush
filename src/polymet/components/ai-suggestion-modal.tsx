import React, { useState } from "react";
import {
  XIcon,
  SparklesIcon,
  LightbulbIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "lucide-react";
import { AIInsight } from "@/polymet/data/future-self-board-data";

interface AISuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  insights: AIInsight[];
  currentStage: number;
  completionPercentage: number;
  onApplySuggestion?: (suggestion: string) => void;
}

interface InsightCardProps {
  insight: AIInsight;
  onApply: () => void;
}

function InsightCard({ insight, onApply }: InsightCardProps) {
  const getTypeIcon = () => {
    switch (insight.type) {
      case "milestone":
        return <CheckCircleIcon size={16} className="text-green-500" />;

      case "suggestion":
        return <LightbulbIcon size={16} className="text-blue-500" />;

      case "pattern":
        return <TrendingUpIcon size={16} className="text-purple-500" />;

      default:
        return <SparklesIcon size={16} className="text-gray-500" />;
    }
  };

  const getTypeColor = () => {
    switch (insight.type) {
      case "milestone":
        return "bg-green-50 border-green-200";
      case "suggestion":
        return "bg-blue-50 border-blue-200";
      case "pattern":
        return "bg-purple-50 border-purple-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getTypeLabel = () => {
    switch (insight.type) {
      case "milestone":
        return "Milestone Achievement";
      case "suggestion":
        return "Improvement Suggestion";
      case "pattern":
        return "Pattern Recognition";
      default:
        return "AI Insight";
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getTypeColor()}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{getTypeIcon()}</div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-900">
              {getTypeLabel()}
            </span>
            <span className="text-xs text-gray-500">
              {Math.round(insight.confidence * 100)}% confidence
            </span>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            {insight.content}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Relevant to stages: {insight.stageRelevant.join(", ")}
            </span>

            {insight.type === "suggestion" && (
              <button
                onClick={onApply}
                className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Apply
                <ArrowRightIcon size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AISuggestionModal({
  isOpen,
  onClose,
  insights,
  currentStage,
  completionPercentage,
  onApplySuggestion,
}: AISuggestionModalProps) {
  const [activeTab, setActiveTab] = useState<
    "all" | "suggestions" | "patterns" | "milestones"
  >("all");

  if (!isOpen) return null;

  const filteredInsights = insights
    .filter((insight) => {
      if (activeTab === "all") return true;
      if (activeTab === "suggestions") return insight.type === "suggestion";
      if (activeTab === "patterns") return insight.type === "pattern";
      if (activeTab === "milestones") return insight.type === "milestone";
      return true;
    })
    .sort((a, b) => b.confidence - a.confidence);

  const handleApplySuggestion = (suggestion: string) => {
    onApplySuggestion?.(suggestion);
    // Could also close modal or show confirmation
  };

  const tabs = [
    { id: "all", label: "All Insights", count: insights.length },
    {
      id: "suggestions",
      label: "Suggestions",
      count: insights.filter((i) => i.type === "suggestion").length,
    },
    {
      id: "patterns",
      label: "Patterns",
      count: insights.filter((i) => i.type === "pattern").length,
    },
    {
      id: "milestones",
      label: "Milestones",
      count: insights.filter((i) => i.type === "milestone").length,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <SparklesIcon size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  AI Insights
                </h2>
                <p className="text-sm text-gray-500">
                  Stage {currentStage} • {completionPercentage}% complete
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XIcon size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id
                        ? "bg-sky-100 text-sky-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {filteredInsights.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SparklesIcon size={24} className="text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">
                  No insights available
                </h3>
                <p className="text-sm text-gray-500">
                  Continue working on your vision to unlock AI-powered insights
                  and suggestions.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInsights.map((insight) => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                    onApply={() => handleApplySuggestion(insight.content)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-500">
              AI insights are generated based on your progress and content
              patterns
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Refresh insights
                  console.log("Refreshing AI insights...");
                }}
                className="px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600 transition-colors"
              >
                Refresh Insights
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
