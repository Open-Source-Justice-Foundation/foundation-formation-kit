"use client";

import { Suspense, useState } from "react";

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
import {
  AuthCardHomeButton,
  AuthSignInPageErrorMessages,
} from "~/features/auth";
import { signInSchema } from "~/lib/auth/validation/schemas";
import { EyeIcon, EyeOffIcon, Github } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setShowPassword(false);
    const { email, password } = values;

    const url = "/api/auth/login";
    let loginResponse: Response = new Response();

    try {
      loginResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (loginResponse?.status !== 200) {
        throw new Error(`Login response status: ${loginResponse?.status}`);
      }

      const emailSignInResponse = await signIn("resend", {
        email,
        redirect: true,
        redirectTo: "/dashboard",
      });

      if (emailSignInResponse !== undefined && !emailSignInResponse?.ok) {
        throw new Error(
          `Email sign in response status: ${emailSignInResponse?.status}`,
        );
      }
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      toast.error("Login error");
      setIsLoading(false);
    }
  }

  async function oAuthSignIn(provider: string) {
    setIsLoading(true);

    try {
      const oAuthSignInResponse = await signIn(provider, {
        redirect: true,
        redirectTo: "/dashboard",
      });

      if (oAuthSignInResponse !== undefined && !oAuthSignInResponse?.ok) {
        throw new Error(
          `OAuth sign in response status: ${oAuthSignInResponse?.status}`,
        );
      }
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      toast.error("Login error");
      setIsLoading(false);
    }
  }

  return (
    <>
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
            <Link
              href="/register"
              className="text-sm font-semibold text-link-foreground"
            >
              Create an account
            </Link>
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
                      <FormLabel className="flex justify-between">
                        Password
                        <Link
                          href="/reset-password"
                          className="text-link-foreground"
                          tabIndex={-1}
                        >
                          Forgot your password?
                        </Link>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className={
                              "hide-password-toggle pr-10 text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
                            }
                            autoComplete="current-password"
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowPassword((prev) => !prev)}
                            disabled={isLoading}
                          >
                            {showPassword ? (
                              <EyeOffIcon aria-hidden="true" />
                            ) : (
                              <EyeIcon aria-hidden="true" />
                            )}
                            <span className="sr-only">
                              {showPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        </div>
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
                  Login
                </Button>
              </form>
            </Form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-3 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="flex gap-x-1"
              disabled={isLoading}
              onClick={() => oAuthSignIn("github")}
            >
              <Github aria-hidden="true" />
              Login with GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
      <Suspense fallback={<></>}>
        <AuthSignInPageErrorMessages />
      </Suspense>
    </>
  );
}
