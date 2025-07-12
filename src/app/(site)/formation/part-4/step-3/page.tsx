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
import { form1023Part4YourActivitiesStep3Schema } from "~/lib/formation/validation/part-4/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof form1023Part4YourActivitiesStep3Schema>;

export default function FormationPart4Step3Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023Part4YourActivitiesStep3Schema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const {
      programsLimitProvisionOfGoodsServicesOrFunds,
      programsLimitProvisionOfGoodsServicesOrFundsExplanation,
    } = values;

    const url = "/api/formation/part-4/step-3";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          programsLimitProvisionOfGoodsServicesOrFunds,
          programsLimitProvisionOfGoodsServicesOrFundsExplanation,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 4 step 3 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-4/step-4");
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
          Programs Limiting Provision of Goods, Services, or Funds
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
              name="programsLimitProvisionOfGoodsServicesOrFunds"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Do any of your programs limit the provision of goods,
                    services, or funds to a specific individual or group of
                    specific individuals?
                    <span className="mt-1.5 block">
                      For example, answer &quot;Yes&quot; if goods, services, or
                      funds are provided only for a particular individual, your
                      members, individuals who work for a particular employer,
                      or graduates of a particular school.
                    </span>
                    <span className="mt-1.5 block">
                      If &quot;Yes,&quot; explain the limitation and how
                      recipients are selected for each program.
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
              name="programsLimitProvisionOfGoodsServicesOrFundsExplanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Limitation and how Recipients are Selected for Each Program
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain the limitation and how recipients are selected for each program..."
                      className="resize-none text-sm focus-visible:ring-ringPrimary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormationNavigationButtons
              prevHref="/formation/part-4/step-2"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
