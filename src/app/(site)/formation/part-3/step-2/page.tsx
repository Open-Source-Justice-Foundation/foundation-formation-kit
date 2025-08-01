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
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { FormationNavigationButtons } from "~/features/formation/components/FormationNavigationButtons";
import { form1023Part3RequiredProvisionsInYourOrganizingDocumentStep2Schema } from "~/lib/formation/validation/part-3/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<
  typeof form1023Part3RequiredProvisionsInYourOrganizingDocumentStep2Schema
>;

export default function FormationPart3Step2Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(
      form1023Part3RequiredProvisionsInYourOrganizingDocumentStep2Schema,
    ),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const {
      organizingDocumentDissolutionExemptPurposesProvision,
      whereOrganizingDocumentMeetsDissolutionExemptPurposesProvision,
    } = values;

    const url = "/api/formation/part-3/step-2";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organizingDocumentDissolutionExemptPurposesProvision,
          whereOrganizingDocumentMeetsDissolutionExemptPurposesProvision,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 3 step 2 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-4/step-1");
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
          Organizing Document Dissolution Exempt Purposes Provision
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
              name="organizingDocumentDissolutionExemptPurposesProvision"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Section 501(c)(3) requires that your organizing document
                    provide that upon dissolution, your remaining assets be used
                    exclusively for section 501(c)(3) exempt purposes, such as
                    charitable, religious, educational, and/or scientific
                    purposes. Depending on your entity type and the state in
                    which you are formed, this requirement may be satisfied by
                    operation of state law.
                    <span className="mt-1.5 block italic">
                      The following is an example of an acceptable dissolution
                      clause: Upon the dissolution of this organization, assets
                      shall be distributed for one or more exempt purposes
                      within the meaning of section 501(c)(3) of the Internal
                      Revenue Code, or corresponding section of any future
                      federal tax code, or shall be distributed to the federal
                      government, or to a state or local government, for a
                      public purpose.
                    </span>
                    <span className="mt-1.5 block">
                      Does your organizing document meet this requirement?
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
              name="whereOrganizingDocumentMeetsDissolutionExemptPurposesProvision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Dissolution Exempt Purposes Provision Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    State specifically where your organizing document meets this
                    requirement, such as a reference to a particular article or
                    section in your organizing document (Page/Article/Paragraph)
                    or indicate that you rely on state law.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormationNavigationButtons
              prevHref="/formation/part-3/step-1"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
