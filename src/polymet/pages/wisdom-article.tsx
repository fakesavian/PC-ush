import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import GradientBackground from "@/polymet/components/gradient-background";
import ArticleContentRenderer from "@/polymet/components/article-content-renderer";
import { WISDOM_ARTICLES } from "@/polymet/data/wisdom-articles";

export default function WisdomArticle() {
  const { articleId = "1" } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);

  // Find the current article
  const currentArticle = WISDOM_ARTICLES.find(
    (article) => article.id === articleId
  );

  // Find the index of the current article
  const currentIndex = WISDOM_ARTICLES.findIndex(
    (article) => article.id === articleId
  );

  // Get previous and next articles
  const prevArticle =
    currentIndex > 0 ? WISDOM_ARTICLES[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < WISDOM_ARTICLES.length - 1
      ? WISDOM_ARTICLES[currentIndex + 1]
      : null;

  // Check if article is bookmarked
  useEffect(() => {
    // In a real app, this would be stored in a database or local storage
    // For this demo, we'll just check if the article is in our bookmarked array
    setIsBookmarked(bookmarkedArticles.includes(articleId));
  }, [articleId, bookmarkedArticles]);

  // Handle bookmark toggle
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setBookmarkedArticles((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  // If article not found, show error
  if (!currentArticle) {
    return (
      <GradientBackground variant="lavender" className="min-h-screen">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <Link
            to="/wisdom"
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeftIcon size={20} className="mr-2" />
            Back to Articles
          </Link>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/wisdom"
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              Browse All Articles
            </Link>
          </div>
        </div>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground variant="lavender" className="min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Back button */}
        <Link
          to="/wisdom"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeftIcon size={20} className="mr-2" />
          Back to Articles
        </Link>

        {/* Article content */}
        <ArticleContentRenderer
          title={currentArticle.title}
          content={currentArticle.content}
          author={currentArticle.author}
          publishedAt={currentArticle.publishedAt}
          readTime={currentArticle.readTime}
          category={currentArticle.category}
          isBookmarked={isBookmarked}
          onBookmark={handleBookmark}
        />

        {/* Navigation between articles */}
        <div className="mt-12 flex justify-between items-center border-t border-gray-200 pt-6">
          {prevArticle ? (
            <Link
              to={`/wisdom/${prevArticle.id}`}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeftIcon size={20} className="mr-1" />

              <div className="text-left">
                <div className="text-xs text-gray-500">Previous</div>
                <div className="text-sm font-medium">{prevArticle.title}</div>
              </div>
            </Link>
          ) : (
            <div></div>
          )}

          {nextArticle && (
            <Link
              to={`/wisdom/${nextArticle.id}`}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <div className="text-right">
                <div className="text-xs text-gray-500">Next</div>
                <div className="text-sm font-medium">{nextArticle.title}</div>
              </div>
              <ChevronRightIcon size={20} className="ml-1" />
            </Link>
          )}
        </div>
      </div>
    </GradientBackground>
  );
}
