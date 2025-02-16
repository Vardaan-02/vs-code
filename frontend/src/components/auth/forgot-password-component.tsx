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
  ForgotPasswordFormValues,
  forgotpasswordSchema,
} from "@/schema/fotgot-password-schema";
import { useHandleForgotPassword } from "@/mutations/auth/forgot-password";

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotpasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync, isPending, error } = useHandleForgotPassword();

  function onSubmit(data: ForgotPasswordFormValues) {
    mutateAsync(data);
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                  {error?.message.toLowerCase().includes("user") && (
                    <div className="text-sm font-medium text-destructive">
                      Email does not exist
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
                  Sending Email...
                </motion.div>
              ) : (
                "Send Email"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
