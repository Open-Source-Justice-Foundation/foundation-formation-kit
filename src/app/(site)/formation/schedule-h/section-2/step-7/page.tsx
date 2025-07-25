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
import { form1023ScheduleHSection2Step7Schema } from "~/lib/formation/validation/schedule-h/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// TODO
// Update schemas
// Add other fields

type FormValues = z.infer<typeof form1023ScheduleHSection2Step7Schema>;

export default function FormationScheduleHSection2Step7Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023ScheduleHSection2Step7Schema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { input1, input2, input3, input4, input5, input6 } = values;

    const url = "/api/formation/schedule-h/step-8";
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
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation schedule H section 2 step 7 response status: ${response?.status}`,
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
          Educational Support for Children of Employees of a Particular Employer
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
                    Do you provide scholarships, fellowships, or educational
                    loans to attend an educational institution to children of
                    employees of a particular employer?
                    <span className="mt-1.5 block">
                      If &quot;No,&quot; do not complete the rest of Schedule H.
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
              name="input2"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Will you award grants to 25% or fewer of the eligible
                    applicants who were actually considered by the selection
                    committee in selecting recipients of grants in that year as
                    provided by Revenue Procedures 76-47 and 80-39?
                    <span className="mt-1.5 block">
                      If &quot;Yes,&quot; do not complete the rest of Schedule
                      H.
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
              name="input3"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Will you award grants to 10% or fewer of the number of
                    employees&apos; children who can be shown to be eligible for
                    grants (whether or not they submitted an application) in
                    that year, as provided by Revenue Procedures 76-47 and
                    80-39?
                  </FormDescription>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    If &quot;Yes,&quot; describe how you will determine who can
                    be shown to be eligible for grants without submitting an
                    application, such as by obtaining written statements or
                    other information about the expectations of employees&apos;
                    children to attend an educational institution; do not
                    complete the rest of Schedule H.
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
              name="input4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grant Eligibility Determination</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe how you will determine who can be shown to be eligible for grants without submitting an application..."
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
              name="input5"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Will you award grants based on facts and circumstances that
                    demonstrate that the grants will not be considered
                    compensation for past, present, or future services or
                    otherwise provide a significant benefit to the particular
                    employer?
                  </FormDescription>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    If &quot;Yes,&quot; describe the facts and circumstances you
                    believe will demonstrate that the grants are neither
                    compensatory nor a significant benefit to the particular
                    employer. In your explanation, describe why you cannot
                    satisfy either the 25% test or the 10% test in questions 7a
                    and 7b.
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
              name="input6"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grant Facts and Circumstances</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the facts and circumstances you believe will demonstrate that the grants are neither compensatory nor a significant benefit to the particular employer...."
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
              prevHref="/formation/schedule-h/section-2/step-6"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
