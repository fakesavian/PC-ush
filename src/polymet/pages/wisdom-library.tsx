import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchIcon, BookmarkIcon } from "lucide-react";
import GradientBackground from "@/polymet/components/gradient-background";
import ArticleCard from "@/polymet/components/article-card";
import ArticleCategoryFilter from "@/polymet/components/article-category-filter";
import { WISDOM_ARTICLES } from "@/polymet/data/wisdom-articles";

export default function WisdomLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [showBookmarked, setShowBookmarked] = useState(false);

  // Extract unique categories from articles
  const categories = Array.from(
    new Set(WISDOM_ARTICLES.map((article) => article.category))
  );

  // Handle bookmark toggle
  const handleBookmark = (id: string) => {
    setBookmarkedArticles((prev) =>
      prev.includes(id)
        ? prev.filter((articleId) => articleId !== id)
        : [...prev, id]
    );
  };

  // Filter articles based on search, category, and bookmarked status
  const filteredArticles = WISDOM_ARTICLES.filter((article) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by category
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;

    // Filter by bookmarked status if showing bookmarked only
    const matchesBookmarked = showBookmarked
      ? bookmarkedArticles.includes(article.id)
      : true;

    return matchesSearch && matchesCategory && matchesBookmarked;
  });

  // Get featured articles
  const featuredArticles = WISDOM_ARTICLES.filter(
    (article) => article.isFeatured
  );

  return (
    <GradientBackground variant="lavender" className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Pocket Wisdom</h1>
          <Link
            to="/progress-dashboard"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="relative mb-4">
            <SearchIcon
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-between items-center">
            <ArticleCategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <button
              onClick={() => setShowBookmarked(!showBookmarked)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                showBookmarked
                  ? "bg-sky-100 text-sky-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <BookmarkIcon size={16} />

              <span>Saved</span>
            </button>
          </div>
        </div>

        {/* Featured Articles Section (only show if not filtering) */}
        {!showBookmarked &&
          selectedCategory === "All" &&
          searchQuery === "" && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Featured Wisdom</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    description={article.description}
                    category={article.category}
                    readTime={article.readTime}
                    publishedAt={article.publishedAt}
                    imageUrl={article.imageUrl}
                    isFeatured={true}
                    isBookmarked={bookmarkedArticles.includes(article.id)}
                    onBookmark={handleBookmark}
                  />
                ))}
              </div>
            </div>
          )}

        {/* All Articles or Filtered Results */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {showBookmarked
              ? "Saved Articles"
              : selectedCategory !== "All"
                ? `${selectedCategory} Articles`
                : "All Articles"}
          </h2>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  description={article.description}
                  category={article.category}
                  readTime={article.readTime}
                  publishedAt={article.publishedAt}
                  imageUrl={article.imageUrl}
                  isBookmarked={bookmarkedArticles.includes(article.id)}
                  onBookmark={handleBookmark}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {showBookmarked
                  ? "You haven't saved any articles yet."
                  : "No articles found matching your criteria."}
              </p>
            </div>
          )}
        </div>
      </div>
    </GradientBackground>
  );
}
