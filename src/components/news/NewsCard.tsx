import type { NewsPost } from "../../types/news.types";
import { CATEGORY_LABELS } from "../../utils/categoryMapping";

interface NewsCardProps {
  post: NewsPost & { source: string; category: string };
}

const NewsCard = ({ post }: NewsCardProps) => {
  const categoryLabel = CATEGORY_LABELS[post.category] || post.category;

  return (
    <article className="bg-transparent h-full flex flex-col gap-4 min-h-[358px] max-w-[276px] max-h-[358px]">
      {post.thumbnail ? (
        <div className="relative">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover rounded-xl min-h-[197px] min-w-[276px] max-h-[197px] max-w-[276px]"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        </div>
      ) : (
        <div className="w-full h-full grid place-items-center bg-gray-5 min-h-[197px] min-w-[276px] max-h-[197px] max-w-[276px] rounded-xl">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
              fill="#9CA3AF"
            />
            <circle cx="8.5" cy="8.5" r="1.5" fill="#9CA3AF" />
          </svg>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <h3 className="font-bold text-base mb-2 min-h-[78px] line-clamp-3 hover:text-primary-500 transition-colors">
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            {post.title}
          </a>
        </h3>

        <div className="text-xs text-gray-500 flex items-center gap-3">
          <p className="text-text-brand text-sm font-semibold">
            {categoryLabel}
          </p>
          <svg
            width="5"
            height="5"
            viewBox="0 0 5 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.37878" cy="2.43042" r="2.37878" fill="#D9D9D9" />
          </svg>

          {new Date(post.pubDate).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
