import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../components/Input";
import { FormData } from "../types";
import { useState } from "react";

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
  const [previousStep, setPreviousStep] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);

  console.log(previousStep);
  const userDataSchema = yup.object({
    username: yup
      .string()
      .required("მიუთითეთ სახელი")
      .min(4, "მინიმუმ 4 ასო")
      .max(50, "მაქსიმუმ 50 ასო"),
    password: yup
      .string()
      .required("მიუთითეთ პაროლი")
      .matches(/^[a-zA-Z0-9]+$/, "მხოლოდ ლათინური ასოები და ციფრები")
      .min(8, "მინიმუმ 8 სიმბოლო")
      .max(20, "მაქსიმუმ 20 სიმბოლო")
      .matches(/(?=.*[A-Z])/, "მინიმუმ 1 დიდი ასო")
      .matches(/(?=.*\d)/, "მინიმუმ 1 ციფრი"),
    email: yup.string().required("მიუთითეთ ელ-ფოსტა").email("არასწორი ფორმატი"),
  });

  const methods = useForm({
    resolver: yupResolver(userDataSchema),
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
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };
  const onSubmit = (data: FormData) => {
    reset();
    console.log(data);
  };
  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
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
            <div className="flex items-center justify-between mt-12">
              <button onClick={prev} disabled={currentStep === 0}>
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
