import type { NewsSource } from "../../types/news.types";
import { useNews } from "../../hooks/useNews";
import NewsList from "./NewsList";
import Loading from "../common/Loading";

interface NewsSectionProps {
  source: NewsSource;
  category: string;
  showTitle?: boolean;
}

const NewsSection = ({
  source,
  category,
  showTitle = false,
}: NewsSectionProps) => {
  const { data, isLoading, error } = useNews(source, category);

  if (isLoading) return <Loading />;

  if (
    error ||
    !data?.success ||
    !data?.data?.posts ||
    data.data.posts.length === 0
  ) {
    if (showTitle) {
      return (
        <section>
          <h2 className="text-2xl font-semibold capitalize mb-4 pb-2 border-b border-dark-50">
            {source}
          </h2>
          <p className="text-gray-500 py-4">
            Tidak ada berita dari {source} untuk kategori ini
          </p>
        </section>
      );
    }
    return null;
  }

  const postsWithSourceAndCategory = data.data.posts.map((post) => ({
    ...post,
    source,
    category,
  }));

  return (
    <section>
      {showTitle && (
        <h2 className="text-2xl font-semibold capitalize mb-4 pb-2 border-b border-dark-50">
          {source}
        </h2>
      )}
      <NewsList posts={postsWithSourceAndCategory} />
    </section>
  );
};

export default NewsSection;
