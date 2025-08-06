import React, { useState, useEffect } from "react";
import { ShareIcon, SettingsIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import GradientBackground from "@/polymet/components/gradient-background";
import VisionEditor from "@/polymet/components/vision-editor";
import MoodboardGrid from "@/polymet/components/moodboard-grid";
import VisionTimeline from "@/polymet/components/vision-timeline";
import AISuggestionModal from "@/polymet/components/ai-suggestion-modal";
import ExportOptions from "@/polymet/components/export-options";
import {
  MOCK_FUTURE_SELF_BOARD,
  getCurrentRevision,
  calculateBoardCompletion,
  shouldShowAISuggestion,
  getRelevantAIInsights,
  VisionRevision,
  MoodboardAsset,
} from "@/polymet/data/future-self-board-data";
import { getStageById } from "@/polymet/data/stage-tracks-data";

export default function FutureSelfBoard() {
  const [board, setBoard] = useState(MOCK_FUTURE_SELF_BOARD);
  const [activeRevisionId, setActiveRevisionId] = useState(
    getCurrentRevision(board).id
  );
  const [isTimelineCollapsed, setIsTimelineCollapsed] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const currentRevision = getCurrentRevision(board);
  const completionPercentage = calculateBoardCompletion(board);
  const showAISuggestion = shouldShowAISuggestion(board);
  const currentStage = currentRevision.stageId || 1;
  const aiInsights = getRelevantAIInsights(currentStage);

  // Auto-save handler
  const handleContentChange = (newContent: string) => {
    setIsAutoSaving(true);

    // Simulate API call delay
    setTimeout(() => {
      const updatedRevision: VisionRevision = {
        ...currentRevision,
        content: newContent,
        createdAt: new Date().toISOString(),
      };

      const updatedBoard = {
        ...board,
        revisions: board.revisions.map((rev) =>
          rev.id === currentRevision.id ? updatedRevision : rev
        ),
        lastUpdated: new Date().toISOString(),
      };

      setBoard(updatedBoard);
      setIsAutoSaving(false);
    }, 1000);
  };

  // Moodboard handlers
  const handleAddAsset = (type: "image" | "quote" | "note") => {
    const newAsset: MoodboardAsset = {
      id: `asset-${Date.now()}`,
      type,
      src:
        type === "image"
          ? `https://picsum.photos/seed/${Date.now()}/400/300`
          : "",
      text: type !== "image" ? `New ${type} content...` : undefined,
      createdAt: new Date().toISOString(),
      position: { x: 0, y: 0 },
      size: "medium",
    };

    setBoard((prev) => ({
      ...prev,
      moodboard: [...prev.moodboard, newAsset],
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleEditAsset = (assetId: string) => {
    console.log("Edit asset:", assetId);
    // Would open edit modal in real implementation
  };

  const handleDeleteAsset = (assetId: string) => {
    setBoard((prev) => ({
      ...prev,
      moodboard: prev.moodboard.filter((asset) => asset.id !== assetId),
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Timeline handlers
  const handleRevisionSelect = (revisionId: string) => {
    setActiveRevisionId(revisionId);
  };

  const handleCompareRevisions = (revision1Id: string, revision2Id: string) => {
    console.log("Compare revisions:", revision1Id, revision2Id);
    // Would open comparison view in real implementation
  };

  // AI suggestion handlers
  const handleApplySuggestion = (suggestion: string) => {
    const currentContent = currentRevision.content;
    const enhancedContent = `${currentContent}\n\n## AI Enhancement\n${suggestion}`;
    handleContentChange(enhancedContent);
    setIsAIModalOpen(false);
  };

  // Export handler
  const handleExport = async (
    format: "png" | "pdf" | "letter",
    options?: any
  ) => {
    console.log(`Exporting as ${format}`, options);
    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <GradientBackground variant="blue">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link
                  to="/stage-tracks"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  ← Back to Stages
                </Link>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Future-Self Board
                  </h1>
                  <p className="text-sm text-gray-500">
                    {completionPercentage}% complete • Stage {currentStage}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {showAISuggestion && (
                  <button
                    onClick={() => setIsAIModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 animate-pulse"
                  >
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    AI Insight
                  </button>
                )}

                <button
                  onClick={() => setIsExportModalOpen(true)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-colors"
                  title="Export & Share"
                >
                  <ShareIcon size={20} />
                </button>

                <button
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-colors"
                  title="Board Settings"
                >
                  <SettingsIcon size={20} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Timeline Sidebar */}
          <VisionTimeline
            revisions={board.revisions}
            activeRevisionId={activeRevisionId}
            onRevisionSelect={handleRevisionSelect}
            onCompareRevisions={handleCompareRevisions}
            isCollapsed={isTimelineCollapsed}
            onToggleCollapse={() =>
              setIsTimelineCollapsed(!isTimelineCollapsed)
            }
          />

          {/* Main Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="max-w-6xl mx-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Vision Editor */}
                <div className="lg:col-span-2">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6">
                    <VisionEditor
                      content={currentRevision.content}
                      onContentChange={handleContentChange}
                      isAutoSaving={isAutoSaving}
                      showAISuggestion={showAISuggestion}
                      onAISuggestionClick={() => setIsAIModalOpen(true)}
                    />
                  </div>
                </div>

                {/* Moodboard */}
                <div className="lg:col-span-2">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6">
                    <MoodboardGrid
                      assets={board.moodboard}
                      onAddAsset={handleAddAsset}
                      onEditAsset={handleEditAsset}
                      onDeleteAsset={handleDeleteAsset}
                      isEditing={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AISuggestionModal
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          insights={aiInsights}
          currentStage={currentStage}
          completionPercentage={completionPercentage}
          onApplySuggestion={handleApplySuggestion}
        />

        <ExportOptions
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          boardTitle={board.title}
          completionPercentage={completionPercentage}
          onExport={handleExport}
        />
      </div>
    </GradientBackground>
  );
}
