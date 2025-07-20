import type { LoaderFunctionArgs } from "react-router";
import { QueryClient } from "@tanstack/react-query";
import { fetchNews } from "../../utils/api";
import {
  CATEGORY_MAPPING,
  getSourcesForCategory,
} from "../../utils/categoryMapping";
import type { NewsSource } from "../../types/news.types";

export const categoryLoader = async ({
  params,
  context,
}: LoaderFunctionArgs) => {
  const queryClient = context as QueryClient;
  const category = params.category || location.pathname.slice(1);

  if (!category || !CATEGORY_MAPPING[category]) {
    throw new Response("Category not found", { status: 404 });
  }

  const sources = getSourcesForCategory(category);

  const promises = sources.slice(0, 3).map((source) => {
    const sourceCategory = CATEGORY_MAPPING[category][source as NewsSource];
    if (!sourceCategory) return null;

    return queryClient.prefetchQuery({
      queryKey: ["news", source, sourceCategory],
      queryFn: () => fetchNews(source as NewsSource, sourceCategory),
      staleTime: 1000 * 60 * 5,
    });
  });

  await Promise.allSettled(promises.filter(Boolean));

  return { category };
};
