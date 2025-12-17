import "primereact/resources/themes/soho-dark/theme.css";
import "primeicons/primeicons.css";
import "../node_modules/primeflex/primeflex.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter } from "react-router-dom";
import App from "./app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrimeReactProvider>
  </StrictMode>
);
