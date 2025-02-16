import SignUpForm from "@/components/auth/sign-up-component";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Form",
  description: "Make a account",
};

export default function Page() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to V Code
          </h1>
          <p className="text-sm text-muted-foreground">
            Create a account to enter the world of programming.
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
