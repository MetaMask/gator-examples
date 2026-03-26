"use client";

import { createContext, useCallback, useState } from "react";

export const StepContext = createContext({
  step: 1,
  changeStep: (step: number) => {},
});

export const StepProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState(1);

  const changeStep = useCallback(
    (step: number) => {
      setStep(step);
    },
    [step]
  );

  return (
    <StepContext.Provider value={{ step, changeStep }}>
      {children}
    </StepContext.Provider>
  );
};
