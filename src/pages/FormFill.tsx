import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../components/Input";
import { FormData } from "../types";
import { useState } from "react";

const FormFill = () => {
  const [formStep, setFormStep] = useState<number>(1);
  const steps = ["სახელი", "პაროლი", "ელ-ფოსტა", "დასასრული"];

  const handlePrevInput = () => {
    setFormStep((prev) => prev - 1);
  };
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
    formState: { errors, isDirty },
    handleSubmit,
  } = methods;

  console.log(errors);
  const handleNextInput = () => {
    setFormStep((prev) => prev + 1);
  };
  const onSubmit = (data: FormData) => {
    setFormStep((prev) => prev + 1);
    console.log(data);
  };

  const renderButtons = () => {
    if (formStep > 3) {
      return undefined;
    } else if (formStep === 2) {
      return (
        <>
          <button
            className="rounded-lg border border-lightGrey text-grey bg- px-4 py-3 text-sm"
            type="button"
            onClick={handlePrevInput}
          >
            უკან
          </button>
          <button
            disabled={!errors}
            onClick={handleNextInput}
            type="button"
            className="bg-mainBlue text-white text-sm rounded-lg px-4 py-3 hover:opacity-75 ease-in-out duration-300 transition-all"
          >
            შემდეგი
          </button>
        </>
      );
    } else if (formStep === 3) {
      return (
        <>
          <button
            className="rounded-lg border border-lightGrey text-grey bg- px-4 py-3 text-sm"
            type="button"
            onClick={handlePrevInput}
          >
            უკან
          </button>
          <button
            type="submit"
            className="bg-mainBlue text-white text-sm rounded-lg px-4 py-3 hover:opacity-75 ease-in-out duration-300 transition-all"
          >
            დასრულება
          </button>
        </>
      );
    } else {
      return (
        <button
          disabled={Object.keys(errors).length > 0 || !isDirty}
          onClick={handleNextInput}
          type="button"
          className="bg-mainBlue text-white text-sm rounded-lg px-4 py-3 hover:opacity-75 ease-in-out duration-300 transition-all"
        >
          შემდეგი
        </button>
      );
    }
  };

  return (
    <>
      <section className="flex flex-col items-center gap-8">
        <div className="flex gap-20">
          {steps?.map((item, i) => (
            <div key={i} className={`step-item`}>
              <div className="step">{i + 1}</div>
              <p>{item}</p>
            </div>
          ))}
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formStep === 1 && (
              <Input
                name="username"
                placeholder="სახელი"
                type="text"
                label="სახელი"
                error={errors.username?.message}
              />
            )}
            {formStep === 2 && (
              <Input
                name="password"
                placeholder="პაროლი"
                type="password"
                label="პაროლი"
                error={errors.password?.message}
              />
            )}
            {formStep === 3 && (
              <Input
                name="email"
                placeholder="ელ-ფოსტა"
                type="email"
                label="ელ-ფოსტა"
                error={errors.email?.message}
              />
            )}
            <div className="flex items-center justify-between mt-12">
              {renderButtons()}
            </div>
          </form>
        </FormProvider>
      </section>
    </>
  );
};

export default FormFill;
