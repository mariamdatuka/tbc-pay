import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../components/Input";
import { FormData } from "../types";

const FormFill = () => {
  const steps = ["სახელი", "პაროლი", "ელ-ფოსტა", "დასასრული"];
  const addCategorySchema = yup.object({
    username: yup.string().required("მიუთითეთ სახელი"),
    email: yup.string().required("მიუთითეთ ელ-ფოსტა"),
    password: yup.string().required("პაროლი არასწორია"),
  });

  const methods = useForm({
    resolver: yupResolver(addCategorySchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "all",
  });
  const {
    formState: { errors },
    handleSubmit,
    reset,
  } = methods;

  const onSubmit = (data: FormData) => {
    reset();
    console.log(data);
  };

  return (
    <>
      <div className="flex gap-20">
        {steps?.map((item, i) => (
          <div key={i} className={`step-item`}>
            <div className="step">1</div>
            <p>{item}</p>
          </div>
        ))}
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="username"
            placeholder="username"
            type="text"
            label="Username"
            error={errors.username?.message}
          />
        </form>
      </FormProvider>
    </>
  );
};

export default FormFill;
