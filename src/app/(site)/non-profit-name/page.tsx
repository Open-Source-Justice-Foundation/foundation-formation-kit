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
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  nonProfitName: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NonProfitNamePage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nonProfitName: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { nonProfitName } = values;

    console.log("nonProfitName", nonProfitName);

    // TODO
    // Zod validation will check non-profit name format

    setIsLoading(false);
  }

  return (
    <Card className="flex w-[360px] flex-col sm:w-[425px]">
      <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
        <CardTitle>Non-profit Name</CardTitle>
        <CardDescription>
          🚧 Under construction, applications may be deleted and not work 🚧
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="flex flex-col gap-5">
          <Form {...form}>
            <form
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="nonProfitName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Non-profit Name</FormLabel>
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
              <Button
                type="submit"
                className="focus-visible:ring-ringPrimary"
                disabled={isLoading}
              >
                Next
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
