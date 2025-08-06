import React, { useState } from "react";
import {
  ShareIcon,
  DownloadIcon,
  ImageIcon,
  FileTextIcon,
  MailIcon,
  XIcon,
  CheckIcon,
  LoaderIcon,
} from "lucide-react";

interface ExportOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  boardTitle: string;
  completionPercentage: number;
  onExport?: (format: "png" | "pdf" | "letter", options?: any) => Promise<void>;
}

interface ExportOptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  format: "png" | "pdf" | "letter";
  isLoading: boolean;
  onSelect: () => void;
}

function ExportOptionCard({
  icon,
  title,
  description,
  format,
  isLoading,
  onSelect,
}: ExportOptionCardProps) {
  return (
    <button
      onClick={onSelect}
      disabled={isLoading}
      className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center">
          {isLoading ? (
            <LoaderIcon size={20} className="text-sky-500 animate-spin" />
          ) : (
            icon
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </button>
  );
}

export default function ExportOptions({
  isOpen,
  onClose,
  boardTitle,
  completionPercentage,
  onExport,
}: ExportOptionsProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExport = async (
    format: "png" | "pdf" | "letter",
    options?: any
  ) => {
    setLoadingStates((prev) => ({ ...prev, [format]: true }));
    setExportSuccess(null);

    try {
      await onExport?.(format, options);
      setExportSuccess(format);

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setExportSuccess(null);
      }, 3000);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [format]: false }));
    }
  };

  const exportOptions = [
    {
      format: "png" as const,
      icon: <ImageIcon size={20} className="text-sky-500" />,

      title: "Visual Board (PNG)",
      description:
        "Export your complete vision board as a high-resolution image perfect for sharing on social media or printing.",
    },
    {
      format: "pdf" as const,
      icon: <FileTextIcon size={20} className="text-sky-500" />,

      title: "Complete Report (PDF)",
      description:
        "Generate a comprehensive PDF document including your vision text, moodboard, and progress timeline.",
    },
    {
      format: "letter" as const,
      icon: <MailIcon size={20} className="text-sky-500" />,

      title: "Future Self Letter",
      description:
        "Create a personalized letter from your current self to your future self, perfect for time capsule reflection.",
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
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                <ShareIcon size={20} className="text-sky-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Export & Share
                </h2>
                <p className="text-sm text-gray-500">{boardTitle}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XIcon size={20} />
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Vision Completion</span>
              <span className="font-medium">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Success Message */}
          {exportSuccess && (
            <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <CheckIcon size={16} className="text-green-600" />

              <span className="text-sm text-green-700">
                {exportSuccess.toUpperCase()} exported successfully!
              </span>
            </div>
          )}

          {/* Export Options */}
          <div className="p-6 space-y-3">
            {exportOptions.map((option) => (
              <ExportOptionCard
                key={option.format}
                icon={option.icon}
                title={option.title}
                description={option.description}
                format={option.format}
                isLoading={loadingStates[option.format] || false}
                onSelect={() => handleExport(option.format)}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 pb-6">
            <div className="text-xs text-gray-500 text-center">
              Your vision board will be exported with your current progress and
              content. Personal information is kept private unless you choose to
              share.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
