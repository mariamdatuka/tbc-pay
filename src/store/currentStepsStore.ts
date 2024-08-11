import { create } from "zustand";

interface StepsState {
  currentStep: number;
  completedSteps: number[];
  nextStep: () => void;
  prevStep: () => void;
  markStepComplete: (step: number) => void;
}

const useStepsStore = create<StepsState>((set) => ({
  currentStep: 0,
  completedSteps: [],
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  markStepComplete: (step: number) =>
    set((state) => ({
      completedSteps: [...state.completedSteps, step],
    })),
}));

export default useStepsStore;
