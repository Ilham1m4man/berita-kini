import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    ErrorBoundary: ErrorPage ,
    children: [
      {
        index: true,
        lazy: async () => {
          const { HomePage } = await import("../pages/HomePage");
          return { Component: HomePage };
        },
      },
      {
        path: "kesehatan",
        lazy: async () => {
          const { CategoryPage } = await import("../pages/CategoryPage");
          return { Component: CategoryPage };
        },
      },
      {
        path: "otomotif",
        lazy: async () => {
          const { CategoryPage } = await import("../pages/CategoryPage");
          return { Component: CategoryPage };
        },
      },
      {
        path: "politik",
        lazy: async () => {
          const { CategoryPage } = await import("../pages/CategoryPage");
          return { Component: CategoryPage };
        },
      },
      {
        path: "olahraga",
        lazy: async () => {
          const { CategoryPage } = await import("../pages/CategoryPage");
          return { Component: CategoryPage };
        },
      },
      {
        path: "nasional",
        lazy: async () => {
          const { CategoryPage } = await import("../pages/CategoryPage");
          return { Component: CategoryPage };
        },
      },
      {
        path: "internasional",
        lazy: async () => {
          const { CategoryPage } = await import("../pages/CategoryPage");
          return { Component: CategoryPage };
        },
      },
    ],
  },
]);


export default router;
