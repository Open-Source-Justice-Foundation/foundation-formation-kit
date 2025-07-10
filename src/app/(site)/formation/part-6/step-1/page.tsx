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
import { form1023Part6FinancialDataYesNoRadioSchema } from "~/lib/formation/validation/part-6/schemas";
import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// TODO
// Update schemas

type FormValues = z.infer<typeof form1023Part6FinancialDataYesNoRadioSchema>;

export default function FormationPart6Step1Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023Part6FinancialDataYesNoRadioSchema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { input } = values;

    const url = "/api/formation/part-6/step-1";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 6 step 1 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-7/step-1");
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
          Number of Tax Years
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
              name="input"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Select the option that best describes you to determine the
                    years of revenues and expenses you need to provide.
                  </FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col"
                    >
                      <FormItem>
                        <div className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem
                              value="You completed less than one tax year."
                              className="focus-visible:ring-ringPrimary"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal sm:text-base">
                            You completed less than one tax year.{" "}
                          </FormLabel>
                        </div>
                        <FormDescription>
                          Provide a total of three years of financial
                          information (including the current year and two future
                          years of reasonable and good faith projections of your
                          future finances) in the following Statement of
                          Revenues and Expenses.
                        </FormDescription>
                      </FormItem>
                      <FormItem>
                        <div className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem
                              value="You completed at least one tax year but fewer than five."
                              className="focus-visible:ring-ringPrimary"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal sm:text-base">
                            You completed at least one tax year but fewer than
                            five.
                          </FormLabel>
                        </div>
                        <FormDescription>
                          Provide a total of four years financial information
                          (including the current year and three years of actual
                          financial information or reasonable and good faith
                          projections of your future finances) in the following
                          Statement of Revenues and Expenses.
                        </FormDescription>
                      </FormItem>
                      <FormItem>
                        <div className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem
                              value="You completed five or more tax years."
                              className="focus-visible:ring-ringPrimary"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal sm:text-base">
                            You completed five or more tax years.
                          </FormLabel>
                        </div>
                        <FormDescription>
                          Provide financial information for your five most
                          recent tax years (including the current year) in the
                          following Statement of Revenues and Expenses.
                        </FormDescription>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button
                asChild
                type="button"
                className="w-1/4 min-w-[92px] gap-3 focus-visible:ring-ringPrimary"
                disabled={isLoading}
              >
                <Link href="/formation/part-5/step-8" className="text-base">
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
