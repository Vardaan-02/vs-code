"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

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
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/schema/reset-password-schema";
import { useHandleResetPassword } from "@/mutations/auth/reset-password";
import { PasswordInput } from "../ui/password-input";

export function ResetPasswordForm({ token }: { token: string }) {
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const password = form.watch("password");

  const { mutateAsync, isPending, error } = useHandleResetPassword();

  function onSubmit() {
    mutateAsync({ newPassword: password, token: token });
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
                  <FormLabel>Password</FormLabel>
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
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                  Sending Email...
                </motion.div>
              ) : (
                "Send Email"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
