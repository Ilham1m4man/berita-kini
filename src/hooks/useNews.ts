import { useQuery } from "@tanstack/react-query";
import type { NewsSource } from "../types/news.types";
import { fetchNews } from "../utils/api";

export const useNews = (source: NewsSource, category: string) => {
  return useQuery({
    queryKey: ["news", source, category],
    queryFn: () => fetchNews(source, category),
    enabled: !!source && !!category,
  });
};
