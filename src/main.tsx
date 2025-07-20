import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import router from "./router/router.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { inject } from '@vercel/analytics';

inject(); 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000*60*5,
      retry: 1,
      refetchOnWindowFocus: false,
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
