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
import { form1023Part4YourActivitiesStep9Schema } from "~/lib/formation/validation/part-4/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// TODO
// Update schemas

type FormValues = z.infer<typeof form1023Part4YourActivitiesStep9Schema>;

export default function FormationPart4Step9Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023Part4YourActivitiesStep9Schema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const {
      radioInput1,
      textAreaInput1,
      radioInput2,
      textAreaInput2,
      radioInput3,
      textAreaInput3,
      radioInput4,
      textAreaInput4,
      radioInput5,
      textAreaInput5,
      radioInput6,
      textAreaInput6,
      radioInput7,
      textAreaInput7,
      radioInput8,
      textAreaInput8,
      radioInput9,
      radioInput10,
    } = values;

    const url = "/api/formation/part-4/step-9";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          radioInput1,
          textAreaInput1,
          radioInput2,
          textAreaInput2,
          radioInput3,
          textAreaInput3,
          radioInput4,
          textAreaInput4,
          radioInput5,
          textAreaInput5,
          radioInput6,
          textAreaInput6,
          radioInput7,
          textAreaInput7,
          radioInput8,
          textAreaInput8,
          radioInput9,
          radioInput10,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 4 step 9 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-4/step-10");
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
          Distributions to Other Organizations
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
              name="radioInput1"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Do you or will you make grants, loans, or other
                    distributions to organizations?
                    <span className="mt-1.5 block">
                      If &quot;Yes,&quot; describe the type and purpose of the
                      grants, loans, or distributions, how you select your
                      recipients including submission requirements (such as
                      grant proposals or application forms), and the criteria
                      you use or will use to select recipients. Also describe
                      how you ensure the grants, loans, and other distributions
                      are or will be used for their intended purposes (including
                      whether you require periodic or final reports on the use
                      of funds and any procedures you have if you identify that
                      funds are not being used for their intended purposes).
                      Finally, describe the records you keep with respect to
                      grants, loans, or other distributions you make and
                      identify any recipient organizations and any relationships
                      between you and the recipients.
                    </span>
                    <span className="mt-1.5 block">
                      If &quot;No,&quot; continue to Line 10.
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
              name="textAreaInput1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distributions to Other Organizations</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your distributions to other organizations..."
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
              name="radioInput2"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Do you or will you make grants, loans, or other
                    distributions to organizations that are not recognized by
                    the IRS as tax exempt under section 501(c)(3)?
                    <span className="mt-1.5 block">
                      If &quot;Yes,&quot; name and/or describe the non-section
                      501(c)(3) organizations to whom you do or will make
                      distributions and explain how these distributions further
                      your exempt purposes.
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
              name="textAreaInput2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Distributions to Non-Tax-Exempt Organizations
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the non-tax-exempt organizations to whom you do or will make distributions and explain how these distributions further your exempt purposes..."
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
              name="radioInput3"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Do you or will you make grants, loans, or other
                    distributions to foreign organizations?
                    <span className="mt-1.5 block">
                      If &quot;Yes,&quot; name each foreign organization (if not
                      already provided), the country and region within each
                      country in which each foreign organization operates, any
                      relationship you have with each foreign organization, and
                      whether the foreign organization accepts contributions
                      earmarked for a specific country or organization (if so,
                      specify which countries or organizations).
                    </span>
                    <span className="mt-1.5 block">
                      If &quot;No,&quot; continue to Line 10.
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
              name="textAreaInput3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distributions to Foreign Organizations</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your distributions to foreign organizations..."
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
              name="radioInput4"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Do your contributors know that you have ultimate authority
                    to use contributions made to you at your discretion for
                    purposes consistent with your exempt purposes?
                    <span className="mt-1.5 block">
                      If &quot;Yes,&quot; describe how you relay this
                      information to contributors.
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
              name="textAreaInput4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contributors Awareness</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe how you relay this information to contributors..."
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
              name="radioInput5"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Do you or will you make pre-grant inquiries about the
                    recipient organization?
                    <span className="mt-1.5 block">
                      If &quot;Yes,&quot; describe these inquiries, including
                      whether you inquire about the recipient&apos;s financial
                      status, its tax-exempt status under the Internal Revenue
                      Code, its ability to accomplish the purpose for which the
                      resources are provided, and other relevant information.
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
              name="textAreaInput5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pre-Grant Inquiries</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your pre-grant inquiries about the recipient organization..."
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
              name="radioInput6"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Do you or will you use any additional procedures to ensure
                    that your distributions to foreign organizations are used in
                    furtherance of your exempt purposes?
                    <span className="mt-1.5 block">
                      If &quot;Yes,&quot; describe these procedures, including
                      periodic reporting requirements, auditing grantees, site
                      visits by your employees or compliance checks by impartial
                      experts, etc., to verify that grant funds are being used
                      appropriately.
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
              name="textAreaInput6"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Procedures</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your procedures..."
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
              name="radioInput7"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Do you share board members or other key personnel with the
                    recipient organization(s)?
                    <span className="mt-1.5 block">
                      If &quot;Yes,&quot; identify the relationships.
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
              name="textAreaInput7"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationships</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Identify the relationships..."
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
              name="radioInput8"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    When you make grants, loans, or other distributions to
                    foreign organizations, will you check the OFAC List of
                    Specially Designated Nationals and Blocked Persons for names
                    of individuals and entities with whom you are dealing to
                    determine if they are included on the list?
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
              name="textAreaInput8"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Practices</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your other practices..."
                      className="resize-none text-sm focus-visible:ring-ringPrimary"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe any other practices you will engage in to ensure
                    that foreign expenditures or grants are not diverted to
                    support terrorism or other non-charitable activities.{" "}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="radioInput9"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Will you comply with all United States statutes, executive
                    orders, and regulations that restrict or prohibit U.S.
                    persons from engaging in transactions and dealings with
                    designated countries, entities, or individuals, or otherwise
                    engaging in activities in violation of economic sanctions
                    administered by OFAC?
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
              name="radioInput10"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Will you acquire from OFAC the appropriate license and
                    registration where necessary?
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
            <FormationNavigationButtons
              prevHref="/formation/part-4/step-8"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
