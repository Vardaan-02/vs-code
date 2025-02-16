import { ChangePasswordForm } from "@/components/auth/change-password-component";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chnage Password",
  description: "Change Password",
};

export default function ChangePasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] lg:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Change Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Here You can change your password
          </p>
        </div>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
