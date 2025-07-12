"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { FormationNavigationButtons } from "~/features/formation/components/FormationNavigationButtons";
import { form1023Part4YourActivitiesStep1Schema } from "~/lib/formation/validation/part-4/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof form1023Part4YourActivitiesStep1Schema>;

export default function FormationPart4Step1Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023Part4YourActivitiesStep1Schema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { pastPresentAndPlannedActivities } = values;

    const url = "/api/formation/part-4/step-1";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pastPresentAndPlannedActivities,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 4 step 1 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-4/step-2");
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
          Past, Present, and Planned Activities
        </CardTitle>
        <CardDescription>
          Describe completely and in detail your past, present, and planned
          activities. Do not refer to or repeat the purposes in your organizing
          document.
          <p className="mt-6">
            For each past, present, or planned activity, include information
            that answers the following questions:
          </p>
          <ol className="ml-6 mt-6 [&>li]:mt-2">
            <li className="list-['a.'] before:mr-1.5">What is the activity?</li>
            <li className="list-['b.'] before:mr-1.5">
              Who conducts the activity?
            </li>
            <li className="list-['c.'] before:mr-1.5">
              Where is the activity conducted?
            </li>
            <li className="list-['d.'] before:mr-1.5">
              What percentage of your total time is allocated to the activity?
            </li>
            <li className="list-['e.'] before:mr-1.5">
              How is the activity funded (for example, donations, fees, etc.)
              and what percentage of your overall expenses is allocated to this
              activity?
            </li>
            <li className="list-['f.'] before:mr-1.5">
              How does the activity further your exempt purposes?
            </li>
          </ol>
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
              name="pastPresentAndPlannedActivities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Past, Present, and Planned Activities</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your past, present, and planned activities..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormationNavigationButtons
              prevHref="/formation/part-3/step-2"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
