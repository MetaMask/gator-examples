import { createContext, useCallback, useState } from "react";

type ChangeStep = (step: number) => void;

export const StepContext = createContext<{
  step: number;
  changeStep: ChangeStep;
}>({
  step: 1,
  changeStep: () => {},
});

export const StepProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState(1);

  const changeStep = useCallback(
    (step: number) => {
      setStep(step);
    },
    []
  );

  return (
    <StepContext.Provider value={{ step, changeStep }}>
      {children}
    </StepContext.Provider>
  );
};
