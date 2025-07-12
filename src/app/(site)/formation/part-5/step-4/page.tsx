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
import { form1023Part5CompensationAndOtherFinancialArrangementsYesNoRadioWithTextAreaSchema } from "~/lib/formation/validation/part-5/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// TODO
// Update schemas

type FormValues = z.infer<
  typeof form1023Part5CompensationAndOtherFinancialArrangementsYesNoRadioWithTextAreaSchema
>;

export default function FormationPart5Step4Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(
      form1023Part5CompensationAndOtherFinancialArrangementsYesNoRadioWithTextAreaSchema,
    ),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { radioInput, textAreaInput } = values;

    const url = "/api/formation/part-5/step-4";
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
          `Formation part 5 step 4 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-5/step-5");
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
          Purchasing or Selling Goods, Services, or Assets
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
                    Do you or will you purchase or sell any goods, services, or
                    assets from or to:
                  </FormDescription>
                  <ol className="ml-6 text-sm text-muted-foreground">
                    <li className="mt-6 list-['(i)'] before:mr-1.5">
                      Any of your officers, directors, or trustees?
                    </li>
                    <li className="mt-2 list-['(ii)'] before:mr-1.5">
                      Any family of any of your officers, directors, or
                      trustees?
                    </li>
                    <li className="mt-2 list-['(iii)'] before:mr-1.5">
                      Any organizations in which any of your officers,
                      directors, or trustees are also officers, directors, or
                      trustees, or in which any individual officer, director, or
                      trustee owns more than a 35% interest?
                    </li>
                    <li className="mt-2 list-['(iv)'] before:mr-1.5">
                      Your highest compensated employees?
                    </li>
                    <li className="mb-6 mt-2 list-['(v)'] before:mr-1.5">
                      Your highest compensated independent contractors?
                    </li>
                  </ol>
                  <p className="text-sm text-muted-foreground">
                    If &quot;No,&quot; continue to Line 2.
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    If &quot;Yes,&quot; describe any such transactions that you
                    made or intend to make, with whom you make or will make such
                    transactions, how the terms are or will be negotiated at
                    arm&apos;s length, and how you determine you pay no more
                    than fair market value or you are paid at least fair market
                    value.
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
                  <FormLabel>Transactions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your transactions..."
                      className="resize-none text-sm focus-visible:ring-ringPrimary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormationNavigationButtons
              prevHref="/formation/part-5/step-3"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
