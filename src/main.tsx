import "primereact/resources/themes/soho-dark/theme.css";
import "primeicons/primeicons.css";
import "../node_modules/primeflex/primeflex.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/query-client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </PrimeReactProvider>
  </StrictMode>
);
