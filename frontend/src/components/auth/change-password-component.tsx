"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ChangePasswordFormValues,
  changePasswordSchema,
} from "@/schema/change-password-schema";
import { PasswordInput } from "../ui/password-input";
import { useHandleChangePassword } from "@/mutations/auth/change-password";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function ChangePasswordForm() {
  const { token } = useSelector((state: RootState) => state.accessToken);

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("newPassword");

  const { mutateAsync, isPending, error } = useHandleChangePassword();

  function onSubmit(data: ChangePasswordFormValues) {
    mutateAsync({
      oldPassword: data.password,
      newPassword: data.newPassword,
      token,
    });
    form.setValue("password", "");
    form.setValue("newPassword", "");
    form.setValue("confirmPassword", "");
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your old password" {...field} />
                  </FormControl>
                  <FormMessage />
                  {error?.message.toLowerCase().includes("wrong") && (
                    <div className="text-sm font-medium text-destructive">
                      Email does not exist
                    </div>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} password={password} />
                  </FormControl>
                  <FormMessage />
                  {error?.message.toLowerCase().includes("password") && (
                    <p className="text-sm font-medium text-destructive">
                      {error?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your new password" {...field} />
                  </FormControl>
                  <FormMessage />
                  {error?.message.toLowerCase().includes("password") && (
                    <div className="text-sm font-medium text-destructive">
                      Passwords do not match
                    </div>
                  )}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={cn("w-full")}
              disabled={isPending}
              variant={"success"}
            >
              {isPending ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-2 items-center justify-center cursor-not-allowed"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Changing Password...
                </motion.div>
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-muted-foreground">
          Want to login?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
