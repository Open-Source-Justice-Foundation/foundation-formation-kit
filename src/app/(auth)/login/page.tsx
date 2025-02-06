"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string(),
});

export default function UserAuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { email } = values;

    await signIn("credentials", {
      email,
      redirect: true,
      callbackUrl: "/",
    });
  }

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="flex w-full flex-col space-y-4 text-left">
        <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
        <p className="text-sm text-muted-foreground">
          <Link
            href="/register"
            className="font-semibold text-blue-500 dark:text-blue-400"
          >
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
          <Button type="submit" disabled={isLoading}>
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
}
