import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-component";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot password to your account",
};

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot Password ? 
          </h1>
          <p className="text-sm text-muted-foreground">
            No worries, Enter you Email we will send you a email.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
