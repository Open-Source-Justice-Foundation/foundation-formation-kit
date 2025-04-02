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
import { legalNameSchema } from "~/lib/formation/validation/schemas";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof legalNameSchema>;

export default function FormationStep4Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(legalNameSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { firstName, lastName } = values;

    const url = "/api/formation/step-5";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation step 5 response status: ${response?.status}`,
        );
      }

      // TODO
      // Update this to a formation complete page
      router.push("/dashboard");
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      toast.error("Submission error");
      setIsLoading(false);
    }
  }

  return (
    <Card className="flex w-[360px] flex-col border-0 sm:w-[425px]">
      <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
        <CardTitle>Step 5</CardTitle>
        <CardDescription>
          🚧 Under construction, applications may be deleted and not work 🚧
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
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
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className={
                        "text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
                      }
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button
                asChild
                type="button"
                className="w-1/4 gap-3 focus-visible:ring-ringPrimary"
                disabled={isLoading}
              >
                <Link href="/formation/step-4" className="text-base">
                  <MoveLeft aria-hidden="true" />
                  <span className="sr-only">{"Previous Step"}</span>
                  Prev
                </Link>
              </Button>
              <Button
                type="submit"
                className="w-1/4 gap-3 focus-visible:ring-ringPrimary"
                disabled={isLoading}
              >
                Finish
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
