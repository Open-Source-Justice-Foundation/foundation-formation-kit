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
import { form1023ScheduleCStep10Schema } from "~/lib/formation/validation/schedule-c/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof form1023ScheduleCStep10Schema>;

export default function FormationScheduleCStep10Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023ScheduleCStep10Schema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const {
      facilityRequirementsStatus,
      communityHealthNeedsAssessmentStatus,
      communityHealthNeedsAssessmentDescription,
      financialAssistancePolicyStatus,
      financialAssistancePolicyDescription,
      financialAssistancePolicyChargesStatus,
      financialAssistancePolicyChargesDescription,
      financialAssistancePolicyEffortsStatus,
      financialAssistancePolicyEffortsDescription,
    } = values;

    const url = "/api/formation/schedule-c/step-10";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          facilityRequirementsStatus,
          communityHealthNeedsAssessmentStatus,
          communityHealthNeedsAssessmentDescription,
          financialAssistancePolicyStatus,
          financialAssistancePolicyDescription,
          financialAssistancePolicyChargesStatus,
          financialAssistancePolicyChargesDescription,
          financialAssistancePolicyEffortsStatus,
          financialAssistancePolicyEffortsDescription,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation schedule C step 10 response status: ${response?.status}`,
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
          Facility Requirements
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
              name="facilityRequirementsStatus"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Do you operate a facility which is required by a state to be
                    licensed, registered, or similarly recognized as a hospital?
                    <span className="mt-1.5 block">
                      If &quot;No,&quot; do not complete the rest of Schedule C.
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
              name="communityHealthNeedsAssessmentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Do you conduct a community health needs assessment (CHNA) at
                    least once every three years and adopt an implementation
                    strategy to meet the community health needs identified in
                    the assessment as required by section 501(r)(3)?
                    <span className="mt-1.5 block">
                      If &quot;No,&quot; explain.
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
              name="communityHealthNeedsAssessmentDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Lack of Community Health Needs Assessment
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your lack of community health needs assessment..."
                      className="resize-none text-sm focus-visible:ring-ringPrimary"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="financialAssistancePolicyStatus"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Do you have a written financial assistance policy (FAP) and
                    a written policy relating to emergency medical care as
                    required by section 501(r)(4)?
                    <span className="mt-1.5 block">
                      If &quot;No,&quot; explain.
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
              name="financialAssistancePolicyDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lack of Financial Assistance Policy</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your lack of financial assistance policy..."
                      className="resize-none text-sm focus-visible:ring-ringPrimary"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="financialAssistancePolicyChargesStatus"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Do you both:</FormDescription>
                  <ol className="ml-6 text-sm text-muted-foreground">
                    <li className="mt-6 list-['(1)'] before:mr-1.5">
                      Limit amounts charged for emergency or other medically
                      necessary care provided to individuals eligible for
                      assistance under your FAP to not more than amounts
                      generally billed to individuals who have insurance
                      covering such care?
                    </li>
                    <li className="mb-6 mt-2 list-['(2)'] before:mr-1.5">
                      Prohibit use of gross charges as required by section
                      501(r)(5)?
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
              name="financialAssistancePolicyChargesDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Lack of Financial Assistance Policy Charges
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your lack of financial assistance policy charges..."
                      className="resize-none text-sm focus-visible:ring-ringPrimary"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="financialAssistancePolicyEffortsStatus"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Do you make reasonable efforts to determine whether an
                    individual is FAP-eligible before engaging in extraordinary
                    collection actions as required by section 501(r)(6)?
                    <span className="mt-1.5 block">
                      If &quot;No,&quot; explain.
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
              name="financialAssistancePolicyEffortsDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Lack of Financial Assistance Policy Efforts
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your lack of financial assistance policy efforts..."
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
              prevHref="/formation/schedule-c/step-9"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
