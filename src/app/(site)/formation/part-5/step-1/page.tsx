"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
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
import { form1023Part5CompensationAndOtherFinancialArrangementsStep1Schema } from "~/lib/formation/validation/part-5/schemas";
import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// TODO
// Update schemas

type FormValues = z.infer<
  typeof form1023Part5CompensationAndOtherFinancialArrangementsStep1Schema
>;

export default function FormationPart5Step1Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(
      form1023Part5CompensationAndOtherFinancialArrangementsStep1Schema,
    ),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { input1, input2, input3, input4, input5, input6, input7 } = values;

    const url = "/api/formation/part-5/step-1";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input1,
          input2,
          input3,
          input4,
          input5,
          input6,
          input7,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 5 step 1 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-5/step-2");
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
          Compensation
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
              name="input1"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Do you or will you compensate officers, directors, or
                    trustees, or do or will you have highest compensated
                    employees, or highest compensated independent contractors?
                    <span className="mt-1.5 block">
                      If &quot;No,&quot; continue to Line 2.
                    </span>
                  </FormDescription>
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
            <p className="text-sm text-muted-foreground">
              In establishing compensation for your officers, directors,
              trustees, highest compensated employees, and highest compensated
              independent contractors:
            </p>
            <div className="ml-6">
              <FormField
                control={form.control}
                name="input2"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription>
                      Do or will the individuals that approve compensation
                      arrangements follow a conflict of interest policy?
                    </FormDescription>
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
                name="input3"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className="mt-2">
                      Do or will you approve compensation arrangements in
                      advance of paying compensation?
                    </FormDescription>
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
                name="input4"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className="mt-2">
                      Do or will you document in writing the date and terms of
                      approved compensation arrangements?
                    </FormDescription>
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
                name="input5"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className="mt-2">
                      Do or will you record in writing the decision made by each
                      individual who decided or voted on compensation
                      arrangements?
                    </FormDescription>
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
                name="input6"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className="mt-2">
                      Do or will you approve compensation arrangements based on
                      information about compensation paid by similarly situated
                      taxable or tax-exempt organizations for similar services,
                      current compensation surveys compiled by independent
                      firms, or actual written offers from similarly situated
                      organizations?
                    </FormDescription>
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
                name="input7"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className="mt-2">
                      Do or will you record in writing both the information on
                      which you relied to base your decision and its source?
                    </FormDescription>
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
                name="input8"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className="mt-2">
                      Do or will you have any other practices you use to set
                      reasonable compensation?
                      <span className="mt-1.5 block">
                        If &quot;Yes,&quot; describe these practices.
                      </span>
                    </FormDescription>
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
                name="input8Explanation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pt-2">
                      Reasonable Compensation Practices
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe these reasonable compensation practices..."
                        className="resize-none text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between">
              <Button
                asChild
                type="button"
                className="w-1/4 min-w-[92px] gap-3 focus-visible:ring-ringPrimary"
                disabled={isLoading}
              >
                <Link href="/formation/part-4/step-17" className="text-base">
                  <MoveLeft aria-hidden="true" />
                  <span className="sr-only">Previous Step</span>
                  Prev
                </Link>
              </Button>
              <Button
                type="submit"
                className="w-1/4 min-w-[92px] gap-3 focus-visible:ring-ringPrimary"
                disabled={isLoading}
              >
                Next
                <MoveRight aria-hidden="true" />
                <span className="sr-only">Next Step</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
