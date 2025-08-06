import { useState } from "react";
import {
  StageData,
  getCurrentPetEvolution,
} from "@/polymet/data/stage-tracks-data";
import CircularProgress from "@/polymet/components/circular-progress";
import {
  X,
  FileText,
  MessageSquare,
  CheckCircle,
  Headphones,
  ArrowRight,
} from "lucide-react";

interface StageViewProps {
  stage: StageData;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "worksheets" | "prompts" | "checkins" | "audio";

export default function StageView({ stage, isOpen, onClose }: StageViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("worksheets");
  const currentPet = getCurrentPetEvolution(stage.progress);

  if (!isOpen) return null;

  const tabs = [
    {
      id: "worksheets" as TabType,
      label: "Worksheets",
      icon: FileText,
      count: stage.exercises.length,
    },
    {
      id: "prompts" as TabType,
      label: "Daily Prompts",
      icon: MessageSquare,
      count: stage.prompts.length,
    },
    {
      id: "checkins" as TabType,
      label: "Check-ins",
      icon: CheckCircle,
      count: stage.checkIns.length,
    },
    ...(stage.audio
      ? [
          {
            id: "audio" as TabType,
            label: "Audio",
            icon: Headphones,
            count: stage.audio.length,
          },
        ]
      : []),
  ];

  const getNextIncompleteTask = () => {
    const incompleteExercise = stage.exercises.find((ex) => !ex.isCompleted);
    if (incompleteExercise)
      return { type: "exercise", item: incompleteExercise };

    const incompletePrompt = stage.prompts.find(
      (prompt) => !prompt.isCompleted
    );
    if (incompletePrompt) return { type: "prompt", item: incompletePrompt };

    const incompleteCheckIn = stage.checkIns.find(
      (checkIn) => !checkIn.isCompleted
    );
    if (incompleteCheckIn) return { type: "checkin", item: incompleteCheckIn };

    return null;
  };

  const nextTask = getNextIncompleteTask();

  const renderTabContent = () => {
    switch (activeTab) {
      case "worksheets":
        return (
          <div className="space-y-3">
            {stage.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                    exercise.isCompleted
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300"
                  }`}
                >
                  {exercise.isCompleted && (
                    <CheckCircle size={12} className="text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {exercise.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {exercise.content}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>{exercise.estimatedMinutes} min</span>
                    <span className="capitalize">{exercise.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "prompts":
        return (
          <div className="space-y-3">
            {stage.prompts.map((prompt) => (
              <div key={prompt.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                      prompt.isCompleted
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {prompt.isCompleted && (
                      <CheckCircle size={12} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      Day {prompt.day}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {prompt.question}
                    </p>
                    {prompt.userResponse && (
                      <div className="mt-2 p-2 bg-white rounded border">
                        <p className="text-sm text-gray-600 italic">
                          "{prompt.userResponse}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "checkins":
        return (
          <div className="space-y-3">
            {stage.checkIns.map((checkIn) => (
              <div key={checkIn.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                      checkIn.isCompleted
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {checkIn.isCompleted && (
                      <CheckCircle size={12} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {checkIn.title}
                    </h4>
                    <p className="text-xs text-gray-500 capitalize mb-2">
                      {checkIn.frequency}
                    </p>
                    <div className="space-y-1">
                      {checkIn.questions.map((question, index) => (
                        <p key={index} className="text-sm text-gray-700">
                          • {question}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "audio":
        return (
          <div className="space-y-3">
            {stage.audio?.map((audio) => (
              <div
                key={audio.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    audio.isCompleted
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300"
                  }`}
                >
                  {audio.isCompleted && (
                    <CheckCircle size={12} className="text-white" />
                  )}
                </div>
                <Headphones size={20} className="text-gray-400" />

                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{audio.title}</h4>
                  <p className="text-sm text-gray-600">{audio.duration}</p>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div
          className="relative p-6 pb-4"
          style={{ backgroundColor: `${stage.color}10` }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>

          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${stage.color}20` }}
                >
                  {stage.illustration}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Stage {stage.stageNumber}: {stage.title}
                  </h2>
                  <p className="text-sm text-gray-600">{stage.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CircularProgress
                progress={stage.progress}
                size={60}
                color={stage.color}
                strokeWidth={4}
              />

              <div className="text-center">
                <div className="text-2xl mb-1">{currentPet.emoji}</div>
                <div className="text-xs text-gray-500">
                  Level {stage.petLevel}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-current text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  style={{
                    borderBottomColor:
                      activeTab === tab.id ? stage.color : "transparent",
                    color: activeTab === tab.id ? stage.color : undefined,
                  }}
                >
                  <Icon size={16} />

                  {tab.label}
                  <span className="bg-gray-200 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">{renderTabContent()}</div>

        {/* Floating CTA */}
        {nextTask && (
          <div className="p-6 pt-4 border-t border-gray-200">
            <button
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-200 hover:shadow-lg active:scale-95"
              style={{ backgroundColor: stage.color }}
            >
              Continue Stage
              <ArrowRight size={16} />
            </button>
            <p className="text-center text-xs text-gray-500 mt-2">
              Next: {nextTask.item.title || "Complete remaining tasks"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
