import type { NewsPost } from "../../types/news.types";
import NewsCard from "./NewsCard";

interface NewsListProps {
  posts: Array<NewsPost & { source: string; category: string }>;
}

export default function NewsList({ posts }: NewsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {posts.map((post, index) => (
        <NewsCard key={`${post.link}-${index}`} post={post} />
      ))}
    </div>
  );
}