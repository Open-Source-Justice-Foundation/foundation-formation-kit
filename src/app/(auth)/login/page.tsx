"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function UserAuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { email, password } = values;

    await signIn("credentials", {
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
          <Link href="/" className="flex items-center justify-center gap-2">
            <Image
              src="/images/logos/logo.svg"
              width={25}
              height={25}
              alt="Sign In Logo"
              unoptimized={true}
            />
            <span className="text-base font-bold tracking-normal text-logo-foreground sm:text-xl">
              Foundation Formation Kit
            </span>
          </Link>
        </CardTitle>
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
                        disabled={isLoading}
                        placeholder="email..."
                        className="text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
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
                    <FormLabel>Enter your password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="password..."
                        className="text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
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
