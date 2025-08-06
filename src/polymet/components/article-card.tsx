import React from "react";
import { Link } from "react-router-dom";
import { BookmarkIcon, ClockIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedAt: string;
  imageUrl?: string;
  isFeatured?: boolean;
  isBookmarked?: boolean;
  onBookmark?: (id: string) => void;
}

export default function ArticleCard({
  id,
  title,
  description,
  category,
  readTime,
  publishedAt,
  imageUrl,
  isFeatured = false,
  isBookmarked = false,
  onBookmark,
}: ArticleCardProps) {
  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBookmark) {
      onBookmark(id);
    }
  };

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      to={`/wisdom/${id}`}
      className={cn(
        "block rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md",
        isFeatured ? "border-2 border-sky-200" : "border border-gray-100"
      )}
    >
      {imageUrl && (
        <div className="relative w-full h-40 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />

          {isFeatured && (
            <div className="absolute top-3 left-3 bg-sky-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            {category}
          </span>
          <button
            onClick={handleBookmark}
            className="text-gray-400 hover:text-sky-500 transition-colors"
          >
            <BookmarkIcon
              size={18}
              className={cn(isBookmarked ? "fill-sky-500 text-sky-500" : "")}
            />
          </button>
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center text-xs text-gray-500">
          <ClockIcon size={14} className="mr-1" />

          <span>{readTime}</span>
          <span className="mx-2">•</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}
