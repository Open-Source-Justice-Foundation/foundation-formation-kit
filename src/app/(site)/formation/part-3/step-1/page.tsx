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
import { form1023Part3RequiredProvisionsInYourOrganizingDocumentStep1Schema } from "~/lib/formation/validation/part-3/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<
  typeof form1023Part3RequiredProvisionsInYourOrganizingDocumentStep1Schema
>;

export default function FormationPart3Step1Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(
      form1023Part3RequiredProvisionsInYourOrganizingDocumentStep1Schema,
    ),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const {
      organizingDocumentExemptPurposesProvision,
      whereOrganizingDocumentMeetsExemptPurposesProvision,
    } = values;

    const url = "/api/formation/part-3/step-1";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organizingDocumentExemptPurposesProvision,
          whereOrganizingDocumentMeetsExemptPurposesProvision,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 3 step 1 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-3/step-2");
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
          Exempt Purposes Provision
        </CardTitle>
        <CardDescription>
          Part III helps ensure that, when you submit this application, your
          organizing document contains the required provisions to meet the
          organizational test under section 501(c)(3).
          <p className="mt-1.5">
            If you cannot check &quot;Yes&quot; in both Lines 1 and 2, your
            organizing document does not meet the organizational test.{" "}
            <span className="font-bold">DO NOT</span> file this application
            until you have amended your organizing document. Remember to upload
            your original and amended organizing documents at the end of this
            form.
          </p>
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
              name="organizingDocumentExemptPurposesProvision"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Section 501(c)(3) requires that your organizing document
                    limit your purposes to one or more exempt purposes within
                    section 501(c)(3), such as charitable, religious,
                    educational, and/or scientific purposes.
                    <span className="mt-1.5 block italic">
                      The following is an example of an acceptable purpose
                      clause: The organization is organized exclusively for
                      charitable, religious, educational, and scientific
                      purposes under section 501(c)(3) of the Internal Revenue
                      Code, or corresponding section of any future federal tax
                      code.
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
              name="whereOrganizingDocumentMeetsExemptPurposesProvision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exempt Purposes Provision Location</FormLabel>
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
                    section in your organizing document
                    (Page/Article/Paragraph).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormationNavigationButtons
              prevHref="/formation/part-2/step-5"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
