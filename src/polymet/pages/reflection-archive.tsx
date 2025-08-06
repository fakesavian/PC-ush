import React, { useState, useMemo } from "react";
import {
  ArrowLeftIcon,
  LayoutGridIcon,
  ListIcon,
  CalendarIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import GradientBackground from "@/polymet/components/gradient-background";
import ReflectionCard from "@/polymet/components/reflection-card";
import StageFilter from "@/polymet/components/stage-filter";
import DateRangeModal from "@/polymet/components/date-range-modal";
import {
  REFLECTION_ENTRIES,
  getReflectionsByStage,
  getReflectionsByDateRange,
} from "@/polymet/data/reflection-entries";

export default function ReflectionArchive() {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [selectedStage, setSelectedStage] = useState("all");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  // Filter reflections based on stage and date range
  const filteredReflections = useMemo(() => {
    let filtered = getReflectionsByStage(selectedStage);

    if (startDate || endDate) {
      filtered = getReflectionsByDateRange(startDate, endDate).filter(
        (entry) => {
          if (selectedStage === "all") return true;

          const stageMap: Record<string, string> = {
            "stage-1": "Stage 1",
            "stage-2": "Stage 2",
            "stage-3": "Stage 3",
            "stage-4": "Stage 4",
            "stage-5": "Stage 5",
            unguided: "Unguided",
          };

          return entry.stage === stageMap[selectedStage];
        }
      );
    }

    return filtered;
  }, [selectedStage, startDate, endDate]);

  const handleDateRangeSelect = (start: string | null, end: string | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleEdit = (id: string) => {
    console.log("Edit reflection:", id);
    // TODO: Navigate to edit page
  };

  const handleDelete = (id: string) => {
    console.log("Delete reflection:", id);
    // TODO: Implement delete functionality
  };

  const hasDateFilter = startDate || endDate;

  return (
    <GradientBackground
      variant="blue"
      className="flex flex-col min-h-screen overflow-auto"
      data-testid="reflection-archive-page"
    >
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-200/50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Link
              to="/progress-dashboard"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
            >
              <ArrowLeftIcon size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Reflection Archive
              </h1>
              <p className="text-sm text-gray-500">
                {filteredReflections.length} reflection
                {filteredReflections.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("card")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "card"
                  ? "bg-sky-100 text-sky-600"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              }`}
            >
              <LayoutGridIcon size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-sky-100 text-sky-600"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ListIcon size={20} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 pb-3 space-y-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsDateModalOpen(true)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                hasDateFilter
                  ? "bg-sky-500 text-white border-sky-500"
                  : "bg-white/80 text-gray-600 border-gray-200 hover:bg-white hover:border-gray-300"
              }`}
              style={{ minHeight: "44px" }}
            >
              <CalendarIcon size={16} />

              <span className="text-sm font-medium">
                {hasDateFilter ? "Date Filter Active" : "Filter by Date"}
              </span>
            </button>

            {hasDateFilter && (
              <button
                onClick={() => handleDateRangeSelect(null, null)}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Clear dates
              </button>
            )}
          </div>

          <StageFilter
            selectedStage={selectedStage}
            onStageSelect={setSelectedStage}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4">
        {filteredReflections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <CalendarIcon size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reflections found
            </h3>
            <p className="text-gray-500 max-w-sm">
              Try adjusting your filters or create your first reflection to get
              started.
            </p>
          </div>
        ) : (
          <div
            className={`
            ${
              viewMode === "card"
                ? "grid grid-cols-1 sm:grid-cols-2 gap-4 pb-safe"
                : "space-y-3 pb-safe"
            }
          `}
          >
            {filteredReflections.map((reflection) => (
              <ReflectionCard
                key={reflection.id}
                id={reflection.id}
                title={reflection.title}
                date={reflection.date}
                stage={reflection.stage}
                preview={reflection.preview}
                viewMode={viewMode}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Date Range Modal */}
      <DateRangeModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        onDateRangeSelect={handleDateRangeSelect}
        startDate={startDate}
        endDate={endDate}
      />
    </GradientBackground>
  );
}
