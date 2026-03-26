import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { AppProvider } from "@/providers/AppProvider.tsx";
import { GatorProvider } from "@/providers/GatorProvider";
import { StepProvider } from "@/providers/StepProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <StepProvider>
        <GatorProvider>
          <App />
        </GatorProvider>
      </StepProvider>
    </AppProvider>
  </StrictMode>,
);
