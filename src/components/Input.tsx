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
      <div className="relative flex flex-col w-64 mt-10">
        <label htmlFor={name} className="text-base text-darkBlue mb-2">
          {label}
        </label>
        <input
          className="p-4 rounded-lg border border-lightGrey text-sm focus:outline-none"
          {...register(name)}
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
        />
        <p className="text-xs text-red absolute -bottom-[26px] ">{error}</p>
      </div>
    </>
  );
};

export default Input;
