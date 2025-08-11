import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),

    email: z.string().email({ message: "Invalid email format" }),

    password: z
      .string()
      .min(3, { message: "Password must be at least 3 characters long" }),

    role: z.enum(["admin", "user"], {
      required_error: "Role is required",
    }),

    phone: z.string().optional(),

    isActive: z.boolean().optional(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(3, { message: "Password is required" }),
  }),
});

export const UserValidation = {
  userValidationSchema,
  loginValidationSchema,
};
