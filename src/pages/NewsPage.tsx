import { Link, useParams } from "react-router";
import ErrorMessage from "../components/common/ErrorMessage";
import { NEWS_CATEGORIES, type NewsSource } from "../types/news.types";
import Loading from "../components/common/Loading";
import { useNews } from "../hooks/useNews";
import NewsList from "../components/news/NewsList";

export default function NewsPage() {
  const { source, category } = useParams<{
    source: NewsSource;
    category: string;
  }>();

  if (!source || !category) {
    return <ErrorMessage message="Invalid news source or category" />;
  }
  const { data, isLoading, error } = useNews(source, category);
  const categories = NEWS_CATEGORIES[source] || [];

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message="Failed to load news" />;
  if (!data?.success || !data?.data)
    return <ErrorMessage message="No data available" />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize mb-4">
          {source} - {category}
        </h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/${source}/${cat}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                cat === category
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {data.data.posts.length > 0 ? (
        <NewsList
          posts={data.data.posts.map((post) => ({
            ...post,
            source,
            category,
          }))}
        />
      ) : (
        <p className="text-gray-500 text-center py-8">
          Tidak ada berita untuk kategori ini
        </p>
      )}
    </div>
  );
}
