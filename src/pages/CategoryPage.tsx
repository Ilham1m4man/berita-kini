import { useState, Suspense, useEffect } from "react";
import { useLocation } from "react-router";
import {
  CATEGORY_MAPPING,
  getSourcesForCategory,
} from "../utils/categoryMapping";
import type { NewsSource } from "../types/news.types";
import NewsSection from "../components/news/NewsSection";
import Loading from "../components/common/Loading";
import ErrorBoundary from "../components/common/ErrorBoundary";

export const CategoryPage = () => {
  const location = useLocation();
  const category = location.pathname.slice(1);
  const sources = getSourcesForCategory(category);
  const [selectedSource, setSelectedSource] = useState<NewsSource | "all">(
    "all"
  );

  useEffect(() => {
    setSelectedSource("all");
  }, [category]);

  if (!CATEGORY_MAPPING[category]) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Kategori tidak ditemukan</h1>
        <a href="/" className="text-primary-500 hover:underline">
          Kembali ke beranda
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 capitalize">{category}</h1>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSource("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              selectedSource === "all"
                ? "bg-primary-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Semua Sumber
          </button>
          {sources.map((source) => (
            <button
              key={source}
              onClick={() => setSelectedSource(source)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer capitalize ${
                selectedSource === source
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {source}
            </button>
          ))}
        </div>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          {selectedSource === "all" ? (
            <div className="space-y-12">
              {sources.map((source) => {
                const sourceCategory = CATEGORY_MAPPING[category][source];
                if (!sourceCategory) return null;

                return (
                  <NewsSection
                    key={source}
                    source={source}
                    category={sourceCategory}
                    showTitle
                  />
                );
              })}
            </div>
          ) : (
            <NewsSection
              source={selectedSource}
              category={CATEGORY_MAPPING[category][selectedSource]!}
              showTitle={false}
            />
          )}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
