import { StepContext } from "@/providers/StepProvider";
import { useContext } from "react";

export function useStepContext() {
  const context = useContext(StepContext);

  if (!context) {
    throw new Error(
      "useStepContext must be used within the scope of StepContextProvider"
    );
  }

  return context;
}
