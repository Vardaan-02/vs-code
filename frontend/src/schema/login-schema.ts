import * as z from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, "Email or username is required"),
  password: z.string().min(6, "Password must be at least 8 characters"),
})

export type LoginFormValues = z.infer<typeof loginSchema>

