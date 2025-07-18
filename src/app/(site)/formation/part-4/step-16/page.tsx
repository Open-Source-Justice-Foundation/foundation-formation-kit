"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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
import { Textarea } from "~/components/ui/textarea";
import { FormationNavigationButtons } from "~/features/formation/components/FormationNavigationButtons";
import { FUNDRAISING_ACTIVITIES } from "~/lib/formation/constants/part-4/constants";
import { form1023Part4YourActivitiesStep16Schema } from "~/lib/formation/validation/part-4/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// TODO
// Update schemas

type FormValues = z.infer<typeof form1023Part4YourActivitiesStep16Schema>;

export default function FormationPart4Step16Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023Part4YourActivitiesStep16Schema),
    defaultValues: {
      fundraisingActivities: [""],
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { fundraisingActivities, otherDescription } = values;

    const url = "/api/formation/part-4/step-16";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fundraisingActivities,
          otherDescription,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 4 step 16 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-4/step-17");
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
          Fundraising Activities
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
              name="fundraisingActivities"
              render={() => (
                <FormItem>
                  <FormDescription>
                    Check any of the following fundraising activities that you
                    will undertake (check all that apply):
                  </FormDescription>
                  {FUNDRAISING_ACTIVITIES.map((item) => (
                    <>
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="fundraisingActivities"
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
                                      ? field.onChange([
                                        ...field.value,
                                        item.id,
                                      ])
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
                      {item.id === "other-describe" && (
                        <FormField
                          control={form.control}
                          name="otherDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe your other fundraising activities..."
                                  className="resize-none text-sm focus-visible:ring-ringPrimary"
                                  {...field}
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </>
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormationNavigationButtons
              prevHref="/formation/part-4/step-15"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
