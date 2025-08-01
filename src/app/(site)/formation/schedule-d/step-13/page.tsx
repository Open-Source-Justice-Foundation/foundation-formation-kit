"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Textarea } from "~/components/ui/textarea";
import { FormationNavigationButtons } from "~/features/formation/components/FormationNavigationButtons";
import { form1023ScheduleDStep13Schema } from "~/lib/formation/validation/schedule-d/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof form1023ScheduleDStep13Schema>;

export default function FormationScheduleDStep13Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023ScheduleDStep13Schema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const {
      radioInput1,
      textAreaInput1,
      textAreaInput2,
      textAreaInput3,
      radioInput2,
      textAreaInput4,
    } = values;

    const url = "/api/formation/schedule-d/step-13";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          radioInput1,
          textAreaInput1,
          textAreaInput2,
          textAreaInput3,
          radioInput2,
          textAreaInput4,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation schedule D step 13 response status: ${response?.status}`,
        );
      }

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
    <Card className="flex w-[360px] flex-col border max-[444px]:mx-6 max-[444px]:w-[88%] sm:w-[425px] md:border-0">
      <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
        <CardTitle className="text-base sm:text-xl md:text-2xl">
          Distribution of Assets
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="radioInput1"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Do you distribute at least 85% of your annual net income or
                    3.5% of the aggregate fair market value of all of your
                    non-exempt-use assets (whichever is greater) to your
                    supported organization(s)?
                  </FormDescription>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    If &quot;No,&quot; explain.
                  </p>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem
                            value="Yes"
                            className="focus-visible:ring-ringPrimary"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal sm:text-base">
                          Yes
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem
                            value="No"
                            className="focus-visible:ring-ringPrimary"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal sm:text-base">
                          No
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="textAreaInput1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distribution of Assets</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain your distributions of assets to your supported organizations..."
                      className="resize-none text-sm focus-visible:ring-ringPrimary"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="textAreaInput2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Annual Contribution to Each Supported Organization
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your annual contribution to each supported organization..."
                      className="resize-none text-sm focus-visible:ring-ringPrimary"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    How much do you contribute annually to each supported
                    organization?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="textAreaInput3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Total Annual Revenue of Each Supported Organization
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the total annual revenue of each supported organization..."
                      className="resize-none text-sm focus-visible:ring-ringPrimary"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    What is the total annual revenue of each supported
                    organization?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="radioInput2"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Do you or the supported organization(s) earmark your funds
                    for support of a particular program or activity?
                  </FormDescription>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    If &quot;Yes,&quot; explain.
                  </p>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem
                            value="Yes"
                            className="focus-visible:ring-ringPrimary"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal sm:text-base">
                          Yes
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem
                            value="No"
                            className="focus-visible:ring-ringPrimary"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal sm:text-base">
                          No
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="textAreaInput4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Support of a Particular Program or Activity
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain your support of a particular program or activity..."
                      className="resize-none text-sm focus-visible:ring-ringPrimary"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormationNavigationButtons
              prevHref="/formation/schedule-d/step-12"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
