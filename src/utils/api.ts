import type { NewsResponse, NewsSource } from "../types/news.types";

const API_BASE_URL = "https://api-berita-indonesia.vercel.app";

export const fetchNews = async (
  source: NewsSource,
  category: string
): Promise<NewsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${source}/${category}/`);

    if (!response.ok) {
      console.error(
        `Failed to fetch ${source}/${category}: ${response.status}`
      );
      return {
        success: false,
        message: `Failed to fetch news: ${response.statusText}`,
        data: {
          link: "",
          description: "",
          title: "",
          image: "",
          posts: [],
        },
      };
    }

    const data = await response.json();

    if (!data.data || !data.data.posts) {
      console.error(`Invalid response structure from ${source}/${category}`);
      return {
        success: false,
        message: "Invalid response structure",
        data: {
          link: "",
          description: "",
          title: "",
          image: "",
          posts: [],
        },
      };
    }

    return data as NewsResponse;
  } catch (error) {
    console.error(`Error fetching ${source}/${category}:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      data: {
        link: "",
        description: "",
        title: "",
        image: "",
        posts: [],
      },
    };
  }
};
