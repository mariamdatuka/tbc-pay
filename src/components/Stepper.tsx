import { steps } from "../steps";
import useStepsStore from "../store/currentStepsStore";
const Stepper = () => {
  const { currentStep, completedSteps } = useStepsStore((state) => ({
    currentStep: state.currentStep,
    completedSteps: state.completedSteps,
  }));
  return (
    <>
      <div className="flex gap-20">
        {steps?.map((item, i) => (
          <div key={i} className={`step-item `}>
            <div
              className={`step ${
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
