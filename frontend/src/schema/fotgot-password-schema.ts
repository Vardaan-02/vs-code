import * as z from "zod"

export const forgotpasswordSchema = z.object({
  email: z.string().min(1, "Email or username is required"),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotpasswordSchema>

