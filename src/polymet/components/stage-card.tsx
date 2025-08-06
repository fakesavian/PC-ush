import {
  StageData,
  getCurrentPetEvolution,
} from "@/polymet/data/stage-tracks-data";
import { LockIcon } from "lucide-react";

interface StageCardProps {
  stage: StageData;
  onClick: () => void;
  className?: string;
}

export default function StageCard({
  stage,
  onClick,
  className = "",
}: StageCardProps) {
  const currentPet = getCurrentPetEvolution(stage.progress);

  return (
    <div
      className={`relative bg-white rounded-xl p-4 shadow-sm border-2 transition-all duration-200 cursor-pointer hover:shadow-md active:scale-95 ${
        stage.isUnlocked
          ? "border-gray-200 hover:border-gray-300"
          : "border-gray-100 opacity-60"
      } ${className}`}
      onClick={stage.isUnlocked ? onClick : undefined}
      style={{ borderColor: stage.isUnlocked ? `${stage.color}20` : undefined }}
    >
      {/* Lock Overlay */}
      {!stage.isUnlocked && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
          <div className="text-center">
            <LockIcon size={24} className="text-gray-400 mx-auto mb-2" />

            <p className="text-xs text-gray-500 font-medium">
              Complete previous stage
            </p>
          </div>
        </div>
      )}

      {/* Stage Content */}
      <div className="space-y-3">
        {/* Pet Evolution Display */}
        <div className="flex items-center justify-between">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${stage.color}15` }}
          >
            {stage.illustration}
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 font-medium">
              Level {stage.petLevel}
            </div>
            <div className="text-lg">{currentPet.emoji}</div>
          </div>
        </div>

        {/* Stage Info */}
        <div>
          <h3 className="font-bold text-lg text-gray-900 mb-1">
            Stage {stage.stageNumber}
          </h3>
          <h4 className="font-semibold text-sm text-gray-700 mb-1">
            {stage.title}
          </h4>
          <p className="text-xs text-gray-600 line-clamp-2">{stage.subtitle}</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 font-medium">Progress</span>
            <span className="text-xs font-bold" style={{ color: stage.color }}>
              {stage.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${stage.progress}%`,
                backgroundColor: stage.color,
              }}
            />
          </div>
        </div>

        {/* Completion Status */}
        {stage.completedAt && (
          <div className="flex items-center gap-1 pt-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />

            <span className="text-xs text-green-600 font-medium">
              Completed
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
