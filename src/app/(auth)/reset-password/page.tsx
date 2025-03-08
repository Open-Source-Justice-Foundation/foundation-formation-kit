"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { AuthCardHomeButton } from "~/features/auth";
import { resetPasswordSchema } from "~/lib/auth/validation/schemas";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { password, passwordConfirmation } = values;

    const url = "/api/auth/reset-password";
    let resetPasswordResponse: Response = new Response();

    try {
      resetPasswordResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          passwordConfirmation,
        }),
      });

      if (resetPasswordResponse.status !== 200) {
        throw new Error(
          `Reset password response status: ${resetPasswordResponse.status}`,
        );
      }

      // TODO
      // Redirect user to sign in page on successful reset
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      toast.error("Reset password error");
    }
    setIsLoading(false);
  }

  return (
    <Card className="flex w-[360px] flex-col sm:w-[425px]">
      <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
        <CardTitle>
          <AuthCardHomeButton />
        </CardTitle>
        <CardDescription>
          🚧 Under construction, accounts may be deleted and not work 🚧
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="focus-visible:ring-ringPrimary"
              disabled={isLoading}
            >
              Reset password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
