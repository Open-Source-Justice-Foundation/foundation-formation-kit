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
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { FormationNavigationButtons } from "~/features/formation/components/FormationNavigationButtons";
import { EXCEPTED_FROM_FILING } from "~/lib/formation/constants/part-9/constants";
import { form1023Part9AnnualFilingRequirementsStep1Schema } from "~/lib/formation/validation/part-9/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// TODO
// Update schemas
// Add radio button section
// Update Other (describe) to include textarea

type FormValues = z.infer<
  typeof form1023Part9AnnualFilingRequirementsStep1Schema
>;

export default function FormationPart9Step1Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023Part9AnnualFilingRequirementsStep1Schema),
    defaultValues: {
      exceptedFromFiling: [""],
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { exceptedFromFiling } = values;

    const url = "/api/formation/part-9/step-1";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exceptedFromFiling,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 9 step 1 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-10/step-1");
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
          Annual Filing Requirements
        </CardTitle>
        <CardDescription className="font-bold">
          If you fail to file a required information return or notice for three
          consecutive years, your exempt status will be automatically revoked.
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
              name="exceptedFromFiling"
              render={() => (
                <FormItem>
                  <FormDescription>
                    If &quot;Yes,&quot; are you claiming you are excepted from
                    filing because you are:
                  </FormDescription>
                  {EXCEPTED_FROM_FILING.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="exceptedFromFiling"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-center gap-2"
                          >
                            <FormControl>
                              <Checkbox
                                name={item.id}
                                className="focus-visible:ring-ringPrimary"
                                checked={field.value?.includes(item.id)}
                                disabled={isLoading}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormationNavigationButtons
              prevHref="/formation/part-8/step-1"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
