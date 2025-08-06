import React, { useState, useEffect, useRef } from "react";
import { SaveIcon, SparklesIcon } from "lucide-react";

interface VisionEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onSave?: () => void;
  isAutoSaving?: boolean;
  placeholder?: string;
  showAISuggestion?: boolean;
  onAISuggestionClick?: () => void;
}

export default function VisionEditor({
  content,
  onContentChange,
  onSave,
  isAutoSaving = false,
  placeholder = "Describe your future self...",
  showAISuggestion = false,
  onAISuggestionClick,
}: VisionEditorProps) {
  const [localContent, setLocalContent] = useState(content);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [localContent]);

  // Debounced save
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      if (localContent !== content) {
        onContentChange(localContent);
        setLastSaved(new Date());
      }
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [localContent, content, onContentChange]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalContent(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle markdown shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault();
          insertMarkdown("**", "**");
          break;
        case "i":
          e.preventDefault();
          insertMarkdown("*", "*");
          break;
        case "s":
          e.preventDefault();
          onSave?.();
          break;
      }
    }

    // Handle tab for indentation
    if (e.key === "Tab") {
      e.preventDefault();
      insertMarkdown("  ", "");
    }
  };

  const insertMarkdown = (before: string, after: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = localContent.substring(start, end);
    const newText =
      localContent.substring(0, start) +
      before +
      selectedText +
      after +
      localContent.substring(end);

    setLocalContent(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const formatLastSaved = () => {
    if (!lastSaved) return "";
    const now = new Date();
    const diff = now.getTime() - lastSaved.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Saved just now";
    if (minutes === 1) return "Saved 1 minute ago";
    return `Saved ${minutes} minutes ago`;
  };

  return (
    <div className="relative">
      {/* Editor Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">
            Your Future Self Vision
          </h3>
          {showAISuggestion && (
            <button
              onClick={onAISuggestionClick}
              className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 animate-pulse"
            >
              <SparklesIcon size={12} />
              AI Insight
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          {isAutoSaving && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Saving...
            </div>
          )}
          {lastSaved && !isAutoSaving && (
            <div className="flex items-center gap-1">
              <SaveIcon size={12} className="text-green-500" />

              {formatLastSaved()}
            </div>
          )}
        </div>
      </div>

      {/* Markdown Toolbar */}
      <div className="flex items-center gap-1 mb-3 p-2 bg-gray-50 rounded-lg">
        <button
          onClick={() => insertMarkdown("# ", "")}
          className="px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
          title="Heading (# )"
        >
          H1
        </button>
        <button
          onClick={() => insertMarkdown("## ", "")}
          className="px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
          title="Subheading (## )"
        >
          H2
        </button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button
          onClick={() => insertMarkdown("**", "**")}
          className="px-2 py-1 text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
          title="Bold (Ctrl+B)"
        >
          B
        </button>
        <button
          onClick={() => insertMarkdown("*", "*")}
          className="px-2 py-1 text-xs italic text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
          title="Italic (Ctrl+I)"
        >
          I
        </button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button
          onClick={() => insertMarkdown("- ", "")}
          className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
          title="Bullet List"
        >
          •
        </button>
        <button
          onClick={() => insertMarkdown("1. ", "")}
          className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
          title="Numbered List"
        >
          1.
        </button>
      </div>

      {/* Text Editor */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={localContent}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full min-h-[300px] p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent font-mono text-sm leading-relaxed"
          style={{
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            lineHeight: "1.6",
          }}
        />

        {/* Character count */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white px-2 py-1 rounded">
          {localContent.length} characters
        </div>
      </div>

      {/* Markdown Help */}
      <div className="mt-2 text-xs text-gray-500">
        <span className="font-medium">Shortcuts:</span> Ctrl+B (bold), Ctrl+I
        (italic), Ctrl+S (save), Tab (indent)
      </div>
    </div>
  );
}
