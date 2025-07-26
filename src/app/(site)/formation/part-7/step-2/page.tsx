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
import { form1023Part7FoundationClassificationStep2Schema } from "~/lib/formation/validation/part-7/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<
  typeof form1023Part7FoundationClassificationStep2Schema
>;

export default function FormationPart7Step2Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023Part7FoundationClassificationStep2Schema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { input1, input2 } = values;

    const url = "/api/formation/part-7/step-2";
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
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 7 step 2 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-8/step-1");
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
          Public Support Status
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
                    If you have been in existence more than 5 years, you must
                    confirm your public support status. To confirm your
                    qualification as a public charity described in 509(a)(1) and
                    170(b)(1)(A)(vi) in existence for five or more tax years,
                    you must have selected one-third or more of your total
                    support from governmental agencies, contributions from the
                    general public, and contributions or grants from other
                    public charities; or 10% or more of your total support from
                    governmental agencies, contributions from the general
                    public, and contributions or grants from other public
                    charities and the facts and circumstances indicate you are a
                    publicly supported organization. Calculate whether you meet
                    this support test for your most revent five-year period.
                    <span className="mt-1.5 block">
                      Did you receive contributions from any person, company, or
                      organization whose gifts totaled more than the 2% amount
                      of line 8 in Part VI-A?
                    </span>
                    <span className="mt-1.5 block">
                      If &quot;Yes,&quot; identify each person, company, or
                      organization by letter (A, B, C, etc.) and indicate the
                      amount contributed by each. Keep a list showing the name
                      of and amount contributed by each of these donors for your
                      records.
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
                  <FormLabel>
                    Amount Contributed by Each Person, Company, or Organization
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Identify each person, company, or organization and indicate the amount contributed by each..."
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
              name="input3"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Based on your calculations, did you receive at least
                    one-third of your support from public sources or did you
                    normally receive at least 10 percent of your support from
                    public sources and you have other characteristics of a
                    publicly supported organization?
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
                  <FormDescription>
                    If you have been in existence more than 5 years, you must
                    confirm your public support status. To confirm your
                    qualification as a public charity desscribed in 509(a)(2) in
                    existence for five or more tax years, you must have normally
                    received more than one-third of your support from
                    contributions, memebership fees, and gross receipts from
                    activities related to your exempt functions, or a
                    combination of these sources, and not more than one-third of
                    your support from gross investment income and net unrelated
                    business income. Calculate whether you meet this support
                    test for your most recent five-year period.
                    <span className="mt-1.5 block">
                      Did you receive amounts from any disqualified persons?
                    </span>
                    <span className="mt-1.5 block">
                      If &quot;Yes,&quot; identify each disqualified person by
                      letter (A, B, C, etc.) and indicate the amount contributed
                      by each. Keep a list showing the name of and amount
                      contributed by each of these donors for your records.
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
              name="input5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Amount Contributed by Each Disqualified Person
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Identify each disqualified person and indicate the amount contributed by each..."
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
              name="input6"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Did you receive amounts from individuals or organizations
                    other than disqualified persons that exceeded the greater of
                    $5,000 or 1% of the amount on line 10 of Part VI-A Statement
                    of Revenues and Expenses?
                    <span className="mt-1.5 block">
                      If &quot;Yes,&quot; identify each individual or
                      organization by letter (A, B, C, etc.) and indicate the
                      amount contributed by each. Keep a list showing the name
                      of and amount contributed by each of these donors for your
                      records.
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
              name="input7"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Amount Contributed by Each Individual or Organization
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Identify each individual or organization and indicate the amount contributed by each..."
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
              name="input8"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Based on your calculations, did you normnally receive more
                    than one-third of your support from a combination of gifts,
                    grants, contributions, membership fees, and gross receipts
                    (from permitted sources) from activities related to your
                    exempt functions and normally receive not more than
                    one-third of your support from investment income and
                    unrelated business taxable income?
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
            <FormationNavigationButtons
              prevHref="/formation/part-7/step-1"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
