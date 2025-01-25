import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.jsx";
import ContextApi from "./utils/ContextApi/ContextApi.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextApi>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider
            router={router}
            future={{ v7_startTransition: true }}
          />
        </HelmetProvider>
      </QueryClientProvider>
    </ContextApi>
  </StrictMode>
);
