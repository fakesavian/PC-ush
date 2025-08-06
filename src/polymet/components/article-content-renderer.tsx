import React from "react";
import { BookmarkIcon, BookmarkPlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleContentRendererProps {
  title: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio?: string;
  };
  publishedAt: string;
  readTime: string;
  category: string;
  isBookmarked?: boolean;
  onBookmark?: () => void;
}

export default function ArticleContentRenderer({
  title,
  content,
  author,
  publishedAt,
  readTime,
  category,
  isBookmarked = false,
  onBookmark,
}: ArticleContentRendererProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Simple markdown renderer for headings, paragraphs, and lists
  const renderMarkdown = (markdown: string) => {
    // Split content by line breaks
    const lines = markdown.split("\n");

    // Process each line
    return lines.map((line, index) => {
      // Skip empty lines
      if (line.trim() === "") {
        return <div key={index} className="my-2"></div>;
      }

      // Heading 1
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-2xl font-bold mt-6 mb-4">
            {line.substring(2)}
          </h1>
        );
      }

      // Heading 2
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-xl font-semibold mt-5 mb-3">
            {line.substring(3)}
          </h2>
        );
      }

      // Heading 3
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-lg font-medium mt-4 mb-2">
            {line.substring(4)}
          </h3>
        );
      }

      // Unordered list item
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 mb-1 list-disc">
            {line.substring(2)}
          </li>
        );
      }

      // Ordered list item (simple detection)
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={index} className="ml-6 mb-1 list-decimal">
            {line.substring(line.indexOf(".") + 2)}
          </li>
        );
      }

      // Bold text
      let processedLine = line;
      processedLine = processedLine.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
      );

      // Italic text
      processedLine = processedLine.replace(/\*(.*?)\*/g, "<em>$1</em>");

      // Default paragraph
      return (
        <p
          key={index}
          className="my-3 leading-relaxed text-gray-700"
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600 mb-3">
            {category}
          </span>
          <button
            onClick={onBookmark}
            className={cn(
              "flex items-center space-x-1 text-sm font-medium px-3 py-1.5 rounded-full transition-colors",
              isBookmarked
                ? "bg-sky-100 text-sky-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {isBookmarked ? (
              <>
                <BookmarkIcon size={16} className="fill-sky-500" />

                <span>Saved</span>
              </>
            ) : (
              <>
                <BookmarkPlusIcon size={16} />

                <span>Save</span>
              </>
            )}
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-3">{title}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>{readTime}</span>
          <span className="mx-2">•</span>
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="prose max-w-none">{renderMarkdown(content)}</div>

      <div className="mt-12 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-12 h-12 rounded-full"
          />

          <div>
            <h3 className="font-medium">{author.name}</h3>
            <p className="text-sm text-gray-600">{author.role}</p>
          </div>
        </div>
        {author.bio && (
          <p className="mt-3 text-sm text-gray-600 italic">{author.bio}</p>
        )}
      </div>
    </div>
  );
}
