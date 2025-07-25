import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { CATEGORIES } from "../../utils/categoryMapping";

export default function Header() {
  const location = useLocation().pathname;

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky px-20 py-4 ${
        isScrolled ? "bg-primary-500" : "bg-white"
      } top-0 z-50 flex justify-between items-center max-w-screen border-b-1 border-gray-2 transition-colors duration-300`}
    >
      <Link
        to={"/"}
        className={`flex items-center gap-3 font-bold ${
          isScrolled ? "text-white" : "text-dark-800"
        }`}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.8789 7.53563L25.5504 5.86418C28.8327 2.58188 34.1763 2.50064 37.4775 5.76403C38.7284 7.00333 39.5597 8.60334 39.8546 10.3393C40.1494 12.0753 39.893 13.86 39.1215 15.4428C38.7514 16.1989 38.6267 17.0517 38.7647 17.8821C38.9029 18.7125 39.2968 19.479 39.8917 20.0746C40.9857 18.9782 41.8527 17.6769 42.4435 16.2453C43.0343 14.8136 43.3374 13.2795 43.3352 11.7307C43.3329 10.182 43.0257 8.64878 42.4308 7.21879C41.8359 5.78878 40.9651 4.49001 39.8681 3.39665C35.252 -1.19344 27.7592 -1.1021 23.1559 3.50089L7.22418 19.4322L5.91444 18.1225C2.57648 14.7845 2.5552 9.3283 5.95205 6.04966C7.20941 4.83979 8.81132 4.05 10.5367 3.7893C12.262 3.5286 14.0257 3.80984 15.5844 4.5942C16.2959 4.95878 17.1043 5.08919 17.8943 4.96684C18.6843 4.84448 19.4154 4.47561 19.9833 3.9129L20.0239 3.87249C20.0365 3.85994 20.0465 3.845 20.0534 3.82854C20.0602 3.8121 20.0638 3.79445 20.0638 3.77664C20.0638 3.75882 20.0602 3.74118 20.0534 3.72473C20.0465 3.70829 20.0365 3.69335 20.0239 3.68078C17.8311 1.54308 14.8927 0.342344 11.8303 0.332636C8.76795 0.32293 5.82192 1.50502 3.61563 3.62877C-1.13695 8.21672 -1.11997 15.846 3.55115 20.5172L19.4782 36.4442L17.7863 38.1361C14.504 41.4184 9.1602 41.4996 5.85921 38.2362C4.60834 36.997 3.77708 35.3969 3.48219 33.661C3.18731 31.925 3.44359 30.1403 4.21505 28.5574C4.58517 27.8013 4.70991 26.9485 4.57186 26.1183C4.4338 25.2878 4.03982 24.5212 3.44498 23.9256C2.35109 25.0222 1.48396 26.3233 0.893109 27.7549C0.30226 29.1867 -0.000718777 30.7206 0.00147669 32.2696C0.00367217 33.8183 0.310998 35.3515 0.905906 36.7814C1.50081 38.2115 2.37164 39.5103 3.46862 40.6036C8.08451 45.1939 15.5776 45.1028 20.1808 40.4996L36.1332 24.547L37.4479 25.8616C40.7302 29.1439 40.8114 34.4875 37.548 37.7885C36.3088 39.0396 34.7087 39.8707 32.9727 40.1658C31.2368 40.4607 29.4521 40.2043 27.8692 39.4327C27.1129 39.0624 26.2596 38.9375 25.429 39.0759C24.5983 39.2141 23.8315 39.6085 23.2359 40.2038C24.3324 41.2978 25.6336 42.165 27.0652 42.7558C28.497 43.3467 30.0309 43.6497 31.5798 43.6475C33.1286 43.6452 34.6618 43.3378 36.0917 42.7429C37.5218 42.148 38.8206 41.2772 39.9139 40.1802C44.5042 35.5643 44.4129 28.0713 39.8099 23.4683L23.8789 7.53563ZM21.8565 34.0648L9.60316 21.8114L21.4998 9.91504L33.7531 22.1684L21.8565 34.0648Z"
            fill={isScrolled ? "#FFFFFF" : "#0090FF"}
          />
        </svg>
        Berita Kini
      </Link>
      <nav>
        <ul className="flex items-center justify-evenly gap-8 font-medium">
          {CATEGORIES.map((category, idx) => {
            return (
              <li key={idx}>
                <Link
                  to={category === "beranda" ? "/" : `/${category}`}
                  className={`${
                    location === `/${category === "beranda" ? "" : category}`
                      ? isScrolled
                        ? "text-white"
                        : "text-text-brand"
                      : isScrolled
                      ? "text-gray-200"
                      : "text-gray-400"
                  } transition-colors duration-300 capitalize`}
                >
                  {category}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <button className="md:hidden">
        <svg
          className={`w-6 h-6 ${isScrolled ? "text-white" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>
  );
}
