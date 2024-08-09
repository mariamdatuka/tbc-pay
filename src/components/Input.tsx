import { useFormContext } from "react-hook-form";
import { InputProps } from "../types";

const Input: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  label,
  error,
  id,
  value,
}) => {
  const { register } = useFormContext();
  return (
    <>
      <div className="relative flex flex-col mt-3 lg:mt-2 w-[310px] sm:w-[500px]">
        <label htmlFor={name} className="text-base text-darkBlue mt-4 mb-2 ">
          {label}
        </label>
        <input
          className="bg-mainBlue p-4 gap-2 rounded-lg  text-sm focus:outline-none"
          {...register(name)}
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
        />
        <p className="text-sm text-mainBlue absolute -bottom-[26px] ">
          {error}
        </p>
      </div>
    </>
  );
};

export default Input;
