"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
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
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="flex w-full flex-col space-y-4 text-left">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image
            src="/images/logos/logo.svg"
            width={25}
            height={25}
            alt="Sign In Logo"
            unoptimized={true}
          />
          <span className="pr-4 text-xl font-bold text-logo-foreground">
            Foundation Formation Kit
          </span>
        </Link>
        <p className="text-sm text-muted-foreground">
          <Link href="/register" className="font-semibold text-link-foreground">
            Create an account
          </Link>
        </p>
      </div>

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
                    className="border-primary/60"
                    {...field}
                    disabled={isLoading}
                    placeholder="email..."
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
                    className="border-primary/60"
                    {...field}
                    disabled={isLoading}
                    placeholder="password..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
}
