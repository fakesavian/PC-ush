import { useState } from "react";
import { Link } from "react-router-dom";
import {
  STAGE_TRACKS_DATA,
  getOverallProgress,
  getCurrentPetEvolution,
} from "@/polymet/data/stage-tracks-data";
import GradientBackground from "@/polymet/components/gradient-background";
import StageCard from "@/polymet/components/stage-card";
import StageView from "@/polymet/components/stage-view";
import ProgressCelebration from "@/polymet/components/progress-celebration";
import CircularProgress from "@/polymet/components/circular-progress";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function StageTracks() {
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);
  const [celebrationState, setCelebrationState] = useState({
    isVisible: false,
    progress: 0,
    stageColor: "",
  });

  const overallProgress = getOverallProgress();
  const currentPet = getCurrentPetEvolution(overallProgress);
  const selectedStage = STAGE_TRACKS_DATA.find(
    (stage) => stage.id === selectedStageId
  );

  const handleStageClick = (stageId: string) => {
    setSelectedStageId(stageId);
  };

  const handleStageViewClose = () => {
    setSelectedStageId(null);
  };

  const handleProgressUpdate = (progress: number, color: string) => {
    setCelebrationState({
      isVisible: true,
      progress,
      stageColor: color,
    });
  };

  const handleCelebrationComplete = () => {
    setCelebrationState((prev) => ({ ...prev, isVisible: false }));
  };

  const completedStages = STAGE_TRACKS_DATA.filter(
    (stage) => stage.completedAt
  ).length;
  const unlockedStages = STAGE_TRACKS_DATA.filter(
    (stage) => stage.isUnlocked
  ).length;

  return (
    <GradientBackground variant="blue" className="min-h-screen">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <Link
              to="/progress-dashboard"
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Transformation Tracks
              </h1>
              <p className="text-sm text-gray-600">
                Your journey through 5 stages of growth
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CircularProgress
              progress={overallProgress}
              size={50}
              strokeWidth={4}
              color="hsl(217, 91%, 60%)"
            />

            <div className="text-center">
              <div className="text-2xl">{currentPet.emoji}</div>
              <div className="text-xs text-gray-500 font-medium">
                Lv {Math.ceil(overallProgress / 20)}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="px-6 pb-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-yellow-500" />

                <span className="text-sm font-medium text-gray-700">
                  {completedStages} of 5 stages completed
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {unlockedStages} stages unlocked
              </div>
            </div>

            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Overall Progress</span>
                <span>{overallProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stage Grid */}
        <div className="flex-1 px-6 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {STAGE_TRACKS_DATA.map((stage) => (
              <StageCard
                key={stage.id}
                stage={stage}
                onClick={() => handleStageClick(stage.id)}
                className="h-full"
              />
            ))}
          </div>
        </div>

        {/* Pet Evolution Showcase */}
        <div className="px-6 pb-6">
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3 text-center">
              {currentPet.name}
            </h3>
            <p className="text-sm text-gray-600 text-center mb-3">
              {currentPet.description}
            </p>
            <div className="flex justify-center items-center gap-2">
              {STAGE_TRACKS_DATA.map((stage, index) => (
                <div
                  key={stage.id}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                    stage.progress > 0
                      ? "opacity-100 scale-100"
                      : "opacity-30 scale-75"
                  }`}
                  style={{
                    backgroundColor:
                      stage.progress > 0 ? `${stage.color}20` : "#f3f4f6",
                  }}
                >
                  {stage.illustration}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stage Detail View */}
      {selectedStage && (
        <StageView
          stage={selectedStage}
          isOpen={!!selectedStageId}
          onClose={handleStageViewClose}
        />
      )}

      {/* Progress Celebration */}
      <ProgressCelebration
        isVisible={celebrationState.isVisible}
        progress={celebrationState.progress}
        stageColor={celebrationState.stageColor}
        onComplete={handleCelebrationComplete}
      />
    </GradientBackground>
  );
}
