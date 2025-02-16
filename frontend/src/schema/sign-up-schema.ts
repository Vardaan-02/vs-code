import * as z from "zod";

export const signUpSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    name: z.string().min(1, "Name is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
