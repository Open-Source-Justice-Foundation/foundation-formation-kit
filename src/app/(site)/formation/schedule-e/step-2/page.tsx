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
import { form1023ScheduleEStep2Schema } from "~/lib/formation/validation/schedule-e/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof form1023ScheduleEStep2Schema>;

export default function FormationScheduleEStep2Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023ScheduleEStep2Schema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { input1, input2 } = values;

    const url = "/api/formation/schedule-e/step-2";
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
          `Formation schedule E step 2 response status: ${response?.status}`,
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
          Effective Date as Submission Date
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
                    Generally, if you did not file Form 1023 within 27 months of
                    formation, the effective date of your exempt status will be
                    the date you filed Form 1023 (submission date). Requests for
                    an earlier effective date may be granted when there is
                    evidence to establish you acted reasonably and in good faith
                    and the grant of relief will not prejudice the interests of
                    the government.
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
                          Check this box if you accept the submission date as
                          the effective date of your exempt status. Do not
                          complete the rest of Schedule E.
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
                          Check this box if you are requesting an earlier
                          effective date than the submission date.
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
                    Failure to File Form 1023 Within 27 Months of Formation
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain why you did not file Form 1023 within 27 months of formation..."
                      className="resize-none text-sm focus-visible:ring-ringPrimary"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Explain why you did not file Form 1023 within 27 months of
                    formation, how you acted reasonably and in good faith, and
                    how granting an earlier effective date will not prejudice
                    the interests of the Government. You may want to include the
                    events that led to the failure to timely file Form 1023 and
                    to the discovery of the failure, any reliance on the advice
                    of a qualified tax professional and a description of the
                    engagement and responsibilities of the professional as well
                    as the extent to which you relied on the professional, a
                    comparison of:
                  </FormDescription>
                  <ol className="ml-6 text-sm text-muted-foreground">
                    <li className="mt-6 list-['(1)'] before:mr-1.5">
                      what your aggregate tax liability would be if you had
                      filed this application within the 27-month period with
                    </li>
                    <li className="mt-2 list-['(2)'] before:mr-1.5">
                      what your aggregate liability would be if you were exempt
                      as of your formation date, or any other information you
                      believe will support your request for relief.
                    </li>
                  </ol>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormationNavigationButtons
              prevHref="/formation/schedule-e/step-1"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
