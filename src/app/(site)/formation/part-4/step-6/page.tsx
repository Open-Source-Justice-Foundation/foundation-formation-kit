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
import { form1023Part4YourActivitiesStep6Schema } from "~/lib/formation/validation/part-4/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// TODO
// Update schemas

type FormValues = z.infer<typeof form1023Part4YourActivitiesStep6Schema>;

export default function FormationPart4Step6Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023Part4YourActivitiesStep6Schema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const {
      influenceLegislation,
      influenceLegislationExplanation,
      legislativeActivityMeasuredByExpenditures,
      legislativeActivityMeasuredByExpendituresExplanation,
    } = values;

    const url = "/api/formation/part-4/step-6";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          influenceLegislation,
          influenceLegislationExplanation,
          legislativeActivityMeasuredByExpenditures,
          legislativeActivityMeasuredByExpendituresExplanation,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 4 step 6 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-4/step-7");
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
          Legislation Influence
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
              name="influenceLegislation"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Do you or will you attempt to influence legislation?
                    <span className="mt-1.5 block">
                      If &quot;Yes,&quot; explain how you attempt to influence
                      legislation.
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
              name="influenceLegislationExplanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Legislation Influence</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain how you attempt to influence legislation..."
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
              name="legislativeActivityMeasuredByExpenditures"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Did you or will you make an election to have your
                    legislative activities measured by expenditures by filing
                    Form 5768?
                    <span className="mt-1.5 block">
                      If &quot;No,&quot; describe whether your attempts to
                      influence legislation are a substantial part of your
                      activities. Include the time and money spent on your
                      attempts to influence legislation as compared to your
                      total activities.
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
              name="legislativeActivityMeasuredByExpendituresExplanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attempts to Influence Legislation</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe whether your attempts to influence legislation are a substantial part of your activities..."
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
              prevHref="/formation/part-4/step-5"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
