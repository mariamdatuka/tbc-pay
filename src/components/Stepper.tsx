import { steps } from "../steps";
import useStepsStore from "../store/currentStepsStore";
const Stepper = () => {
  const { currentStep, completedSteps } = useStepsStore((state) => ({
    currentStep: state.currentStep,
    completedSteps: state.completedSteps,
  }));
  return (
    <>
      <div className="flex flex-wrap gap-12 md:gap-20">
        {steps?.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border border-lightGrey ${
                completedSteps.includes(i)
                  ? "bg-green"
                  : currentStep === i && i === steps.length - 1
                  ? "bg-green"
                  : currentStep === i
                  ? "bg-mainBlue"
                  : ""
              }`}
            >
              {i + 1}
            </div>
            <p className="text-darkBlue">{item.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stepper;
