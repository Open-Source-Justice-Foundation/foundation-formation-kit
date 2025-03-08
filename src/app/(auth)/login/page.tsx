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
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email address is required" })
    .max(255, { message: "Email address can be at most 255 characters" })
    .email({
      message: "Email address is invalid",
    })
    .trim(),
  password: z.string().nonempty({ message: "Password is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { email, password } = values;

    // TODO
    // Zod validation will check email format and password format
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
      toast.error("Login error");
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
              <Button
                type="submit"
                className="focus-visible:ring-ringPrimary"
                disabled={isLoading}
              >
                Sign in
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
