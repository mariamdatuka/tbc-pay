import { create } from "zustand";

interface StepsState {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
}

const useStepsStore = create<StepsState>((set) => ({
  currentStep: 0,
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
}));

export default useStepsStore;
