import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email({ message: "Invalid email format" }),

    password: z
      .string({ required_error: "Password is required" })
      .trim()
      .min(3, { message: "Password must be at least 3 characters long" }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
};
