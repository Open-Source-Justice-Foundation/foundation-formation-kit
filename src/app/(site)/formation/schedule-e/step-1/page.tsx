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
import { form1023ScheduleEPart1Schema } from "~/lib/formation/validation/schedule-e/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof form1023ScheduleEPart1Schema>;

export default function FormationScheduleEStep1Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023ScheduleEPart1Schema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { input1, input2, input3 } = values;

    const url = "/api/formation/schedule-e/step-1";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input1,
          input2,
          input3,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation schedule E step 1 response status: ${response?.status}`,
        );
      }

      router.push("/formation/schedule-e/step-2");
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
          Reinstatement of Exemption
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
              name="input1"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Are you applying for reinstatement of exemption after being
                    automatically revoked for failure to file required returns
                    or notices for three consecutive years?
                  </FormDescription>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    If &quot;No,&quot; continue to Line 2.
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
              name="input2"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Revenue Procedure 2014-11, 2014-1 C.B. 411, provides
                    procedures for reinstating your tax-exempt status. Select
                    the section of Revenue Procedure 2014-11 under which you
                    want us to consider your reinstatement request.
                  </FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col"
                    >
                      <FormItem>
                        <div className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem
                              value="Section 4. You are seeking retroactive reinstatement under section 4 of Revenue Procedure 2014-11. By selecting this line, you attest
that you meet the specified requirements of section 4, that your failure to file was not intentional, and that you have put in place
procedures to file required returns or notices in the future. Do not complete the rest of Schedule E."
                              className="focus-visible:ring-ringPrimary"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal sm:text-base">
                            Section 4. You are seeking retroactive reinstatement
                            under section 4 of Revenue Procedure 2014-11. By
                            selecting this line, you attest that you meet the
                            specified requirements of section 4, that your
                            failure to file was not intentional, and that you
                            have put in place procedures to file required
                            returns or notices in the future. Do not complete
                            the rest of Schedule E.
                          </FormLabel>
                        </div>
                      </FormItem>
                      <FormItem>
                        <div className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem
                              value="Section 5. You are seeking retroactive reinstatement under section 5 of Revenue Procedure 2014-11. By selecting this line, you attest
that you meet the specified requirements of section 5, that you have filed required annual returns, that your failure to file was not
intentional, and that you have put in place procedures to file required returns or notices in the future."
                              className="focus-visible:ring-ringPrimary"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal sm:text-base">
                            Section 5. You are seeking retroactive reinstatement
                            under section 5 of Revenue Procedure 2014-11. By
                            selecting this line, you attest that you meet the
                            specified requirements of section 5, that you have
                            filed required annual returns, that your failure to
                            file was not intentional, and that you have put in
                            place procedures to file required returns or notices
                            in the future.
                          </FormLabel>
                        </div>
                      </FormItem>
                      <FormItem>
                        <div className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem
                              value="Section 6. You are seeking retroactive reinstatement under section 6 of Revenue Procedure 2014-11. By selecting this line, you attest
that you meet the specified requirements of section 6, that you have filed required annual returns, that your failure to file was not
intentional, and that you have put in place procedures to file required returns or notices in the future."
                              className="focus-visible:ring-ringPrimary"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal sm:text-base">
                            Section 6. You are seeking retroactive reinstatement
                            under section 6 of Revenue Procedure 2014-11. By
                            selecting this line, you attest that you meet the
                            specified requirements of section 6, that you have
                            filed required annual returns, that your failure to
                            file was not intentional, and that you have put in
                            place procedures to file required returns or notices
                            in the future.
                          </FormLabel>
                        </div>
                      </FormItem>
                      <FormItem>
                        <div className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem
                              value="Section 7. You are seeking reinstatement under section 7 of Revenue Procedure 2014-11, effective the date you are filling this application. Do not complete the rest of Schedule E."
                              className="focus-visible:ring-ringPrimary"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal sm:text-base">
                            Section 7. You are seeking reinstatement under
                            section 7 of Revenue Procedure 2014-11, effective
                            the date you are filling this application. Do not
                            complete the rest of Schedule E.
                          </FormLabel>
                        </div>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="input3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Attempts to Comply with Filing Requirements
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe how you exercised ordinary business care and prudence in determining and attempting to comply with your filing requirements..."
                      className="resize-none text-sm focus-visible:ring-ringPrimary"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe how you exercised ordinary business care and
                    prudence in determining and attempting to comply with your
                    filing requirements in at least one of the three years of
                    revocation and the steps you have taken or will take to
                    avoid or mitigate future failures to file timely returns or
                    notices. Do not complete the rest of Schedule E.
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
