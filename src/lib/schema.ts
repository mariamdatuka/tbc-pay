import { z } from "zod";

export const UserDataSchema = z.object({
  username: z
    .string()
    .min(4, { message: "მინიმუმ 4 ასო" })
    .max(50, { message: "მაქსიმუმ 50 ასო" }),
  password: z
    .string()
    .min(8, { message: "მინიმუმ 8 სიმბოლო" })
    .max(20, { message: "მაქსიმუმ 20 სიმბოლო" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "მხოლოდ ლათინური ასოები და ციფრები" })
    .regex(/(?=.*[A-Z])/, { message: "მინიმუმ 1 დიდი ასო" })
    .regex(/(?=.*\d)/, { message: "მინიმუმ 1 ციფრი" }),
  email: z.string().email({ message: "მიუთითეთ ელ-ფოსტა" }),
});
