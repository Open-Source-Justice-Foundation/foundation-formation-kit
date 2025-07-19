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
import { form1023ScheduleCStep9Schema } from "~/lib/formation/validation/schedule-c/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof form1023ScheduleCStep9Schema>;

export default function FormationScheduleCStep9Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023ScheduleCStep9Schema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const {
      boardOfDirectorsCommunityRepresentationStatus,
      boardOfDirectorsDescription,
    } = values;

    const url = "/api/formation/schedule-c/step-9";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boardOfDirectorsCommunityRepresentationStatus,
          boardOfDirectorsDescription,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation schedule C step 9 response status: ${response?.status}`,
        );
      }

      router.push("/formation/schedule-c/step-10");
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
          Board of Directors
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
              name="boardOfDirectorsCommunityRepresentationStatus"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Is your board of directors composed of a majority of
                    individuals who are representative of the community you
                    serve, or do you operate under a parent organization whose
                    board of directors is composed of a majority of individuals
                    who are representative of the community you serve?
                    <span className="mt-1.5 block">
                      If &quot;Yes,&quot; continue to Line 10.
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
              name="boardOfDirectorsDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board of Directors</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your board of directors..."
                      className="resize-none text-sm focus-visible:ring-ringPrimary"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    List each board member&apos;s name and business, financial,
                    or professional relationship with the hospital. Also,
                    identify each board member who is representative of the
                    community and describe how that individual is a community
                    representative. If you operate under a parent organization
                    whose board of directors is not composed of a majority of
                    individuals who are representative of the community you
                    serve, provide the requested information for your
                    parent&apos;s board of directors as well.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormationNavigationButtons
              prevHref="/formation/schedule-c/step-8"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
