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
import { CardHomeButton } from "~/features/auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

const FormSchema = z.object({
  email: z.string(),
  password: z.string(),
  // .min(8, { message: "Password must be at least 8 characters" }),
});

type FormData = z.infer<typeof FormSchema>;

export default function UserAuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: FormData) {
    setIsLoading(true);
    const { email, password } = values;

    signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  }

  return (
    <Card className="flex w-[360px] flex-col sm:w-[425px]">
      <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
        <CardTitle>
          <CardHomeButton />
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
                        placeholder="email..."
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
                        placeholder="password..."
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
                disabled={isLoading}
                className="focus-visible:ring-ringPrimary"
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
