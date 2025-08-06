import React from "react";

interface StageFilterProps {
  selectedStage: string;
  onStageSelect: (stage: string) => void;
}

const stages = [
  { id: "all", label: "All" },
  { id: "stage-1", label: "Stage 1" },
  { id: "stage-2", label: "Stage 2" },
  { id: "stage-3", label: "Stage 3" },
  { id: "stage-4", label: "Stage 4" },
  { id: "stage-5", label: "Stage 5" },
  { id: "unguided", label: "Unguided" },
];

export default function StageFilter({
  selectedStage,
  onStageSelect,
}: StageFilterProps) {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      {stages.map((stage) => {
        const isSelected = selectedStage === stage.id;

        return (
          <button
            key={stage.id}
            onClick={() => onStageSelect(stage.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ease-out
              ${
                isSelected
                  ? "bg-sky-500 text-white shadow-md"
                  : "bg-white/80 text-gray-600 border border-gray-200 hover:bg-white hover:border-gray-300"
              }
            `}
            style={{ minHeight: "44px" }}
          >
            {stage.label}
          </button>
        );
      })}
    </div>
  );
}
