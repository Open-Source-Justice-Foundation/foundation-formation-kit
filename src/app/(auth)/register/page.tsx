"use client";

import { useEffect, useState } from "react";

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
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
  // .min(12, { message: "Password must be at least 12 characters" }),
  passwordConfirmation: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    reset({ email: "", password: "", passwordConfirmation: "" });
  }, [reset]);

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { email, password } = values;

    // TODO
    // Zod validation will check email format, password format, and if the password was confirmed
    const url = "/api/auth/register";
    let registerResponse: Response = new Response();

    try {
      registerResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (registerResponse?.status !== 201) {
        throw new Error(
          `Register response status: ${registerResponse?.status}`,
        );
      }

      const emailSignInResponse = await signIn("resend", {
        email,
        redirect: true,
        redirectTo: "/",
      });

      if (!emailSignInResponse?.ok) {
        throw new Error(
          `Email sign in response status: ${emailSignInResponse?.status}`,
        );
      }
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      toast.error("Registration error");
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
        <div className="flex flex-col gap-5">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-link-foreground">
              Sign in
            </Link>
          </p>
          <Form {...form}>
            <form
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
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
                Create account
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
