import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDataSchema } from "../lib/Schema";
import Input from "../components/Input";
import { FormData } from "../types";
import useStepsStore from "../store/currentStepsStore";

type Inputs = z.infer<typeof UserDataSchema>;

const steps = [
  {
    name: "სახელი",
    field: "username",
  },
  {
    name: "პაროლი",
    field: "password",
  },
  {
    name: "ელ-ფოსტა",
    field: "email",
  },
  {
    name: "დასასრული",
  },
];

const FormFill = () => {
  const { currentStep, nextStep, prevStep } = useStepsStore((state) => ({
    currentStep: state.currentStep,
    nextStep: state.nextStep,
    prevStep: state.prevStep,
  }));

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
      nextStep();
    }
  };

  const prevInput = () => {
    if (currentStep > 0) {
      prevStep();
    }
  };

  const onSubmit = (data: FormData) => {
    reset();
    console.log(data);
  };

  return (
    <>
      <section className="flex flex-col items-center gap-8">
        <div className="flex gap-20">
          {steps?.map((item, i) => (
            <div key={i} className={`step-item`}>
              <div className="step">{i + 1}</div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
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
            {currentStep === 3 && <h1>Thank u</h1>}
            <div className="flex items-center justify-between mt-12">
              <button onClick={prevInput} disabled={currentStep === 0}>
                back
              </button>
              <button
                onClick={nextInput}
                disabled={currentStep === steps.length - 1}
              >
                next
              </button>
            </div>
          </form>
        </FormProvider>
      </section>
    </>
  );
};

export default FormFill;
