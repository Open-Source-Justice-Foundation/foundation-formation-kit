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
import { form1023ScheduleDYesNoRadioWithTextAreaSchema } from "~/lib/formation/validation/schedule-d/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof form1023ScheduleDYesNoRadioWithTextAreaSchema>;

export default function FormationScheduleDStep10Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023ScheduleDYesNoRadioWithTextAreaSchema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { radioInput, textAreaInput } = values;

    const url = "/api/formation/schedule-d/step-10";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          radioInput,
          textAreaInput,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation schedule D step 10 response status: ${response?.status}`,
        );
      }

      router.push("/formation/schedule-d/step-11");
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
          Supported Organizations Documents
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
              name="radioInput"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    In each taxable year, do you or will you provide each of
                    your supported organizations with:
                  </FormDescription>
                  <ol className="ml-6 text-sm text-muted-foreground">
                    <li className="mt-6 list-['(a)'] before:mr-1.5">
                      A written notice addressed to a principal officer of the
                      supported organization describing the type and amount of
                      all of the support you provided to the supported
                      organization during the immediately preceding taxable
                      year?
                    </li>
                    <li className="mt-2 list-['(b)'] before:mr-1.5">
                      A copy of your most recently filed Form 990-series return
                      or notice?
                    </li>
                    <li className="mb-6 mt-2 list-['(c)'] before:mr-1.5">
                      A copy of your governing document?
                    </li>
                  </ol>
                  <p className="text-sm text-muted-foreground">
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
              name="textAreaInput"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supported Organizations Documents</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain documents provided to your supported Organizations..."
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
              prevHref="/formation/schedule-d/step-9"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
