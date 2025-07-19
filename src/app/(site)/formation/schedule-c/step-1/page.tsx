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
import { form1023ScheduleCStep1Schema } from "~/lib/formation/validation/schedule-c/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof form1023ScheduleCStep1Schema>;

export default function FormationScheduleCStep1Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023ScheduleCStep1Schema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const {
      medicalResearchOrganizationStatus,
      hospitalRelationshipsDescription,
      assetsDescription,
    } = values;

    const url = "/api/formation/schedule-c/step-1";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          medicalResearchOrganizationStatus,
          hospitalRelationshipsDescription,
          assetsDescription,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation schedule C step 1 response status: ${response?.status}`,
        );
      }

      router.push("/formation/schedule-c/step-2");
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
          Medical Research Organization Status
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
              name="medicalResearchOrganizationStatus"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Are you a medical research organization (an organization
                    whose principal purpose or function is medical research and
                    which is directly engaged in the continuous active conduct
                    of medical research) operated in conjunction with a
                    hospital?
                    <span className="mt-1.5 block">
                      If &quot;No,&quot; continue to Line 2.
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
              name="hospitalRelationshipsDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital Relationships</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your hospital relationships..."
                      className="resize-none text-sm focus-visible:ring-ringPrimary"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Name the hospitals with which you have a relationship and
                    describe the relationship.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assetsDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assets</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your assets..."
                      className="resize-none text-sm focus-visible:ring-ringPrimary"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    List your assets showing their fair market value and the
                    portion of your assets directly devoted to medical research.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormationNavigationButtons
              prevHref="/formation/upload-checklist"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
