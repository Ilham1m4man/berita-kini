import { useQueries } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Loading from "../components/common/Loading";
import NewsCard from "../components/news/NewsCard";
import NewsPopularCard from "../components/news/NewsPopularCard";
import type { NewsPost, NewsSource } from "../types/news.types";
import { fetchNews } from "../utils/api";
import {
  CATEGORY_LABELS,
  HOMEPAGE_FETCH_STRATEGY,
} from "../utils/categoryMapping";

export const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const postsPerPage = 8;

  const queries = useQueries({
    queries: HOMEPAGE_FETCH_STRATEGY.map(({ source, category }) => ({
      queryKey: ["news", source, category],
      queryFn: () => fetchNews(source as NewsSource, category),
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 30,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);

  const allPosts = useMemo(() => {
    const postsMap = new Map<
      string,
      NewsPost & { source: string; category: string; categoryLabel?: string }
    >();

    queries.forEach((query, index) => {
      if (query.data?.success && query.data?.data?.posts) {
        const { source, category } = HOMEPAGE_FETCH_STRATEGY[index];
        query.data.data.posts.forEach((post) => {
          if (!postsMap.has(post.link)) {
            postsMap.set(post.link, {
              ...post,
              source,
              category,
              categoryLabel: CATEGORY_LABELS[category] || "Terbaru",
            });
          }
        });
      }
    });

    return Array.from(postsMap.values()).sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
  }, [queries]);

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return allPosts.slice(5);

    return allPosts
      .slice(5)
      .filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [allPosts, searchTerm]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const sliderPosts = allPosts.slice(0, 5);
  const featuredPost = sliderPosts[currentSlide];
  const popularNews = useMemo(() => {
    if (allPosts.length < 8) return [];

    return allPosts
      .slice(5)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }, [allPosts.length >= 8]);
  const gridPosts = currentPosts;

  console.log(popularNews);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderPosts.length) % sliderPosts.length
    );
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <section className="relative bg-transparent mb-32">
        {featuredPost && (
          <div>
            <div className="flex items-center justify-between max-h-[420px] overflow-hidden">
              <div className="flex flex-col justify-between items-stretch w-2/5 min-h-[420px]">
                <h2 className="text-base font-semibold text-text-secondary mb-4">
                  Headline
                </h2>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 line-clamp-3 text-dark-700">
                  {featuredPost.title}
                </h1>
                <p className="text-gray-600 mb-4 line-clamp-4">
                  {featuredPost.description}
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.625 6.04248C9.625 5.92645 9.67109 5.81517 9.75314 5.73312C9.83519 5.65107 9.94647 5.60498 10.0625 5.60498H10.9375C11.0535 5.60498 11.1648 5.65107 11.2469 5.73312C11.3289 5.81517 11.375 5.92645 11.375 6.04248V6.91748C11.375 7.03351 11.3289 7.14479 11.2469 7.22684C11.1648 7.30889 11.0535 7.35498 10.9375 7.35498H10.0625C9.94647 7.35498 9.83519 7.30889 9.75314 7.22684C9.67109 7.14479 9.625 7.03351 9.625 6.91748V6.04248Z"
                      fill="#828282"
                    />
                    <path
                      d="M3.0625 0.35498C3.17853 0.35498 3.28981 0.401074 3.37186 0.483121C3.45391 0.565168 3.5 0.676448 3.5 0.79248V1.22998H10.5V0.79248C10.5 0.676448 10.5461 0.565168 10.6281 0.483121C10.7102 0.401074 10.8215 0.35498 10.9375 0.35498C11.0535 0.35498 11.1648 0.401074 11.2469 0.483121C11.3289 0.565168 11.375 0.676448 11.375 0.79248V1.22998H12.25C12.7141 1.22998 13.1592 1.41435 13.4874 1.74254C13.8156 2.07073 14 2.51585 14 2.97998V12.605C14 13.0691 13.8156 13.5142 13.4874 13.8424C13.1592 14.1706 12.7141 14.355 12.25 14.355H1.75C1.28587 14.355 0.840752 14.1706 0.512563 13.8424C0.184375 13.5142 0 13.0691 0 12.605V2.97998C0 2.51585 0.184375 2.07073 0.512563 1.74254C0.840752 1.41435 1.28587 1.22998 1.75 1.22998H2.625V0.79248C2.625 0.676448 2.67109 0.565168 2.75314 0.483121C2.83519 0.401074 2.94647 0.35498 3.0625 0.35498ZM0.875 3.85498V12.605C0.875 12.837 0.967187 13.0596 1.13128 13.2237C1.29538 13.3878 1.51794 13.48 1.75 13.48H12.25C12.4821 13.48 12.7046 13.3878 12.8687 13.2237C13.0328 13.0596 13.125 12.837 13.125 12.605V3.85498H0.875Z"
                      fill="#828282"
                    />
                  </svg>

                  <time className="text-sm text-text-secondary">
                    {formatDate(featuredPost.pubDate)}
                  </time>
                </div>
                <a
                  href={featuredPost.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-brand hover:text-blue-700 font-medium flex gap-2 items-center group py-1"
                >
                  Baca Selengkapnya
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:fill-blue-700"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.0001 2.85498C14.0001 2.72237 13.9475 2.5952 13.8537 2.50143C13.7599 2.40766 13.6328 2.35498 13.5001 2.35498H7.50014C7.36753 2.35498 7.24036 2.40766 7.14659 2.50143C7.05282 2.5952 7.00014 2.72237 7.00014 2.85498C7.00014 2.98759 7.05282 3.11477 7.14659 3.20853C7.24036 3.3023 7.36753 3.35498 7.50014 3.35498H12.2931L2.14614 13.501C2.09966 13.5475 2.06278 13.6027 2.03762 13.6634C2.01246 13.7241 1.99951 13.7892 1.99951 13.855C1.99951 13.9207 2.01246 13.9858 2.03762 14.0466C2.06278 14.1073 2.09966 14.1625 2.14614 14.209C2.19263 14.2555 2.24782 14.2923 2.30856 14.3175C2.3693 14.3427 2.4344 14.3556 2.50014 14.3556C2.56589 14.3556 2.63099 14.3427 2.69173 14.3175C2.75247 14.2923 2.80766 14.2555 2.85414 14.209L13.0001 4.06198V8.85498C13.0001 8.98759 13.0528 9.11477 13.1466 9.20853C13.2404 9.3023 13.3675 9.35498 13.5001 9.35498C13.6328 9.35498 13.7599 9.3023 13.8537 9.20853C13.9475 9.11477 14.0001 8.98759 14.0001 8.85498V2.85498Z"
                      fill="#0090FF"
                      className="group-hover:fill-blue-700"
                    />
                  </svg>
                </a>
              </div>
              {featuredPost.thumbnail ? (
                <img
                  src={featuredPost.thumbnail}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover min-h-[420px] max-h-[420px] max-w-[640px] rounded-[20px]"
                />
              ) : (
                <div className="w-full h-full min-h-[420px] max-h-[420px] max-w-[640px] rounded-[20px] bg-gray-200 flex items-center justify-center">
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
            </div>

            <div className="flex items-center justify-center mt-11 gap-6">
              <button
                onClick={prevSlide}
                className="p-2 bg-transparent cursor-pointer"
                aria-label="Previous slide"
              >
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-180"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.791913 0.361249C0.838359 0.314686 0.893534 0.277743 0.954279 0.252537C1.01502 0.22733 1.08015 0.214355 1.14591 0.214355C1.21168 0.214355 1.2768 0.22733 1.33755 0.252537C1.39829 0.277743 1.45347 0.314686 1.49991 0.361249L7.49991 6.36125C7.54648 6.40769 7.58342 6.46287 7.60863 6.52362C7.63383 6.58436 7.64681 6.64948 7.64681 6.71525C7.64681 6.78102 7.63383 6.84614 7.60863 6.90688C7.58342 6.96763 7.54648 7.0228 7.49991 7.06925L1.49991 13.0692C1.40603 13.1631 1.27869 13.2159 1.14591 13.2159C1.01314 13.2159 0.8858 13.1631 0.791913 13.0692C0.698026 12.9754 0.645281 12.848 0.645281 12.7152C0.645281 12.5825 0.698026 12.4551 0.791913 12.3612L6.43891 6.71525L0.791913 1.06925C0.74535 1.0228 0.708407 0.967628 0.6832 0.906883C0.657994 0.846138 0.64502 0.781017 0.64502 0.715249C0.64502 0.649482 0.657994 0.584361 0.6832 0.523616C0.708407 0.462871 0.74535 0.407695 0.791913 0.361249Z"
                    fill="#828282"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-6">
                <span className="text-sm text-gray-600">
                  {currentSlide + 1}
                </span>
                <span className="text-sm text-gray-400">dari</span>
                <span className="text-sm text-gray-600">
                  {sliderPosts.length}
                </span>
              </div>

              <button
                onClick={nextSlide}
                className="p-2 bg-transparent cursor-pointer"
                aria-label="Next slide"
              >
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.791913 0.361249C0.838359 0.314686 0.893534 0.277743 0.954279 0.252537C1.01502 0.22733 1.08015 0.214355 1.14591 0.214355C1.21168 0.214355 1.2768 0.22733 1.33755 0.252537C1.39829 0.277743 1.45347 0.314686 1.49991 0.361249L7.49991 6.36125C7.54648 6.40769 7.58342 6.46287 7.60863 6.52362C7.63383 6.58436 7.64681 6.64948 7.64681 6.71525C7.64681 6.78102 7.63383 6.84614 7.60863 6.90688C7.58342 6.96763 7.54648 7.0228 7.49991 7.06925L1.49991 13.0692C1.40603 13.1631 1.27869 13.2159 1.14591 13.2159C1.01314 13.2159 0.8858 13.1631 0.791913 13.0692C0.698026 12.9754 0.645281 12.848 0.645281 12.7152C0.645281 12.5825 0.698026 12.4551 0.791913 12.3612L6.43891 6.71525L0.791913 1.06925C0.74535 1.0228 0.708407 0.967628 0.6832 0.906883C0.657994 0.846138 0.64502 0.781017 0.64502 0.715249C0.64502 0.649482 0.657994 0.584361 0.6832 0.523616C0.708407 0.462871 0.74535 0.407695 0.791913 0.361249Z"
                    fill="#828282"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="mb-32 w-full">
        <div className="flex gap-4 mb-8">
          <span className="border-text-brand border-2 rounded-full"></span>
          <h2 className="font-bold text-black text-2xl">Berita Terpopuler</h2>
        </div>
        <div className="flex w-full items-center gap-8 pt-3">
          {popularNews.map((post, index) =>
            index === 1 ? (
              <>
                <div className="w-px h-[100px] bg-gray-300" />
                <NewsPopularCard
                  key={`${post.link}-${index}`}
                  idx={index}
                  post={post as NewsPost & { source: string; category: string }}
                />
                <div className="w-px h-[100px] bg-gray-300" />
              </>
            ) : (
              <NewsPopularCard
                key={`${post.link}-${index}`}
                idx={index}
                post={post as NewsPost & { source: string; category: string }}
              />
            )
          )}
        </div>
      </section>

      <section className="mb-44 w-full">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <span className="border-text-brand border-2 rounded-full"></span>
            <h2 className="font-bold text-black text-2xl">
              Rekomendasi Untuk Anda
            </h2>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Cari disini..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:border-primary-500"
            />
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <path
                d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                stroke="#828282"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {searchTerm && filteredPosts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Tidak ada hasil untuk pencarian "{searchTerm}"
          </div>
        ) : (
          <div className="flex flex-wrap w-full justify-between">
            {gridPosts.map((post, index) => (
              <NewsCard key={`${post.link}-${index}`} post={post} />
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mb-8">
            <div className="text-text-primary">
              Showing {(currentPage - 1) * postsPerPage + 1} to{" "}
              {Math.min(currentPage * postsPerPage, filteredPosts.length)} of{" "}
              {filteredPosts.length} results
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 cursor-pointer text-text-secondary hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                ← Previous
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`px-3 py-2 cursor-pointer rounded-lg min-h-[40px] min-w-[40px] ${
                    currentPage === 1
                      ? "bg-primary-500 text-white"
                      : "text-text-secondary hover:bg-gray-100"
                  }`}
                >
                  1
                </button>

                {totalPages > 1 && (
                  <button
                    onClick={() => setCurrentPage(2)}
                    className={`px-3 py-2 cursor-pointer rounded-lg min-h-[40px] min-w-[40px] ${
                      currentPage === 2
                        ? "bg-primary-500 text-white"
                        : "text-text-secondary hover:bg-gray-100"
                    }`}
                  >
                    2
                  </button>
                )}

                {currentPage > 4 && totalPages > 6 && (
                  <span className="px-2 text-gray-400">...</span>
                )}

                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  if (
                    pageNum > 2 &&
                    pageNum < totalPages - 1 &&
                    pageNum >= currentPage - 1 &&
                    pageNum <= currentPage + 1
                  ) {
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 cursor-pointer rounded-lg min-h-[40px] min-w-[40px] ${
                          currentPage === pageNum
                            ? "bg-primary-500 text-white"
                            : "text-text-secondary hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  return null;
                })}

                {currentPage < totalPages - 3 && totalPages > 6 && (
                  <span className="px-2 text-gray-400">...</span>
                )}

                {totalPages > 2 && (
                  <button
                    onClick={() => setCurrentPage(totalPages - 1)}
                    className={`px-3 py-2 cursor-pointer rounded-lg min-h-[40px] min-w-[40px] ${
                      currentPage === totalPages - 1
                        ? "bg-primary-500 text-white"
                        : "text-text-secondary hover:bg-gray-100"
                    }`}
                  >
                    {totalPages - 1}
                  </button>
                )}

                {totalPages > 1 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-3 py-2 cursor-pointer rounded-lg min-h-[40px] min-w-[40px] ${
                      currentPage === totalPages
                        ? "bg-primary-500 text-white"
                        : "text-text-secondary hover:bg-gray-100"
                    }`}
                  >
                    {totalPages}
                  </button>
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 cursor-pointer text-text-secondary hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="grid place-items-center mb-36">
        <img
          src="./SEAL.png"
          alt=""
          className="object-contain min-w-full min-h-full mb-6"
        />
        <div className="flex gap-4">
          <svg
            width="10"
            height="10"
            viewBox="0 0 5 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.37878" cy="2.43042" r="2.37878" fill="#ADB5BD" />
          </svg>
          <svg
            width="10"
            height="10"
            viewBox="0 0 5 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.37878" cy="2.43042" r="2.37878" fill="#136EF0" />
          </svg>
          <svg
            width="10"
            height="10"
            viewBox="0 0 5 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.37878" cy="2.43042" r="2.37878" fill="#ADB5BD" />
          </svg>
        </div>
      </section>
    </div>
  );
};
