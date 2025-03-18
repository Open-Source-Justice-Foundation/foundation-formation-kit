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
import { usePasswordConfirmation } from "~/lib/auth/hooks/usePasswordConfirmation";
import { registerSchema } from "~/lib/auth/validation/schemas";
import { EyeIcon, EyeOffIcon, Github } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const {
    watch,
    setError,
    clearErrors,
    formState: { isSubmitted },
  } = form;

  const watchPassword = watch("password");
  const watchPasswordConfirmation = watch("passwordConfirmation");

  usePasswordConfirmation(
    isSubmitted,
    watchPassword,
    watchPasswordConfirmation,
    setError,
    clearErrors,
    "passwordConfirmation",
  );

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setShowPassword(false);
    setShowPasswordConfirmation(false);
    const { email, password, passwordConfirmation } = values;

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
          passwordConfirmation,
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

      if (emailSignInResponse !== undefined && !emailSignInResponse?.ok) {
        throw new Error(
          `Email sign in response status: ${emailSignInResponse?.status}`,
        );
      }
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      toast.error("Registration error");
      setIsLoading(false);
    }
  }

  async function oAuthSignIn(provider: string) {
    setIsLoading(true);

    try {
      const oAuthSignInResponse = await signIn(provider, {
        redirect: true,
        redirectTo: "/",
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
      toast.error("Registration error");
      setIsLoading(false);
    }
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
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className={
                            "hide-password-toggle pr-10 text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
                          }
                          autoComplete="new-password"
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
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPasswordConfirmation ? "text" : "password"}
                          className={
                            "hide-password-toggle pr-10 text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
                          }
                          autoComplete="new-password"
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() =>
                            setShowPasswordConfirmation((prev) => !prev)
                          }
                          disabled={isLoading}
                        >
                          {showPasswordConfirmation ? (
                            <EyeOffIcon aria-hidden="true" />
                          ) : (
                            <EyeIcon aria-hidden="true" />
                          )}
                          <span className="sr-only">
                            {showPasswordConfirmation
                              ? "Hide password"
                              : "Show password"}
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
                Create account
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
            Register with GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
