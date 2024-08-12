import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDataSchema } from "../lib/schema";
import Input from "../components/Input";
import useStepsStore from "../store/currentStepsStore";
import { steps } from "../steps";
import Stepper from "../components/Stepper";
type Inputs = z.infer<typeof UserDataSchema>;

const FormFill = () => {
  const { currentStep, nextStep, prevStep, markStepComplete } = useStepsStore(
    (state) => ({
      currentStep: state.currentStep,
      nextStep: state.nextStep,
      prevStep: state.prevStep,
      markStepComplete: state.markStepComplete,
    })
  );

  const methods = useForm<Inputs>({
    resolver: zodResolver(UserDataSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
    mode: "all",
  });

  const {
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = methods;

  const nextInput = async () => {
    const inputField = steps[currentStep].field as
      | "username"
      | "password"
      | "email";

    const isValid = await trigger(inputField);

    if (!isValid) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(onSubmit)();
      }
      markStepComplete(currentStep);
      nextStep();
    }
  };

  const prevInput = () => {
    if (currentStep > 0) {
      prevStep();
    }
  };

  const onSubmit = (data: Inputs) => {
    reset();
    console.log(data);
  };

  return (
    <>
      <section className="flex flex-col items-center gap-8">
        <Stepper />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 0 && (
              <Input
                name="username"
                placeholder="სახელი"
                type="text"
                label="სახელი"
                error={errors.username?.message}
              />
            )}
            {currentStep === 1 && (
              <Input
                name="password"
                placeholder="პაროლი"
                type="password"
                label="პაროლი"
                error={errors.password?.message}
              />
            )}
            {currentStep === 2 && (
              <Input
                name="email"
                placeholder="ელ-ფოსტა"
                type="email"
                label="ელ-ფოსტა"
                error={errors.email?.message}
              />
            )}
            {currentStep === 3 && (
              <h1 className="text-darkBlue font-semibold text-xl">
                წარმატებით შესრულდა!
              </h1>
            )}
            <div
              className={`${
                currentStep === 3 ? "hidden" : "flex"
              } items-center justify-between mt-12`}
            >
              <button
                type="button"
                onClick={prevInput}
                disabled={currentStep === 0}
                className={`px-4 py-3 text-darkBlue rounded-lg border border-lightGrey hover:opacity-75 ease-in-out duration-300 transition-all ${
                  currentStep === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                უკან
              </button>
              <button
                className="px-4 py-3 text-white rounded-lg bg-mainBlue cursor-pointer hover:opacity-75 ease-in-out duration-300 transition-all"
                onClick={nextInput}
                type="button"
              >
                შემდეგი
              </button>
            </div>
          </form>
        </FormProvider>
      </section>
    </>
  );
};

export default FormFill;
