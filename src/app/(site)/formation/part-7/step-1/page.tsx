"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Textarea } from "~/components/ui/textarea";
import {
  PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_CONFIRMATION_CHECKBOX,
  SELECT_FOUNDATION_CLASSIFICATION,
} from "~/lib/formation/constants/part-7/constants";
import { form1023Part7FoundationClassificationStep1Schema } from "~/lib/formation/validation/part-7/schemas";
import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// TODO
// Update schemas
// Update text

type FormValues = z.infer<
  typeof form1023Part7FoundationClassificationStep1Schema
>;

export default function FormationPart7Step1Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023Part7FoundationClassificationStep1Schema),
    defaultValues: {
      selectFoundationClassification: [""],
      privateFoundationSpecialProvisionsConfirmationCheckbox: [""],
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const {
      selectFoundationClassification,
      privateFoundationSpecialProvisionsConfirmationCheckbox,
      educationalSupport,
      privateOperatingFoundationConfirmation,
      privateFoundationSpecialProvisionsReference,
    } = values;

    const url = "/api/formation/part-7/step-1";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectFoundationClassification,
          privateFoundationSpecialProvisionsConfirmationCheckbox,
          educationalSupport,
          privateOperatingFoundationConfirmation,
          privateFoundationSpecialProvisionsReference,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 7 step 1 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-7/step-2");
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
          Selection and Explanation
        </CardTitle>
        <CardDescription>
          🚧 Under construction, applications may be deleted and not work 🚧
          <br />
          Part VII is designed to classify you as an organization that is either
          a private foundation or a public charity. Public charity
          classification is a more favorable tax status than private foundation
          classification. If you are a private foundation, this part will
          further determine whether you are a private operating foundation.
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
              name="selectFoundationClassification"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>
                      Select the foundation classification you are requesting
                      from the list below.
                    </FormLabel>
                  </div>
                  {SELECT_FOUNDATION_CLASSIFICATION.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="selectFoundationClassification"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-center gap-2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
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
            <FormField
              control={form.control}
              name="privateFoundationSpecialProvisionsConfirmationCheckbox"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Private Foundation Special Provisions Confirmation
                    </FormLabel>
                  </div>
                  {PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_CONFIRMATION_CHECKBOX.map(
                    (item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="privateFoundationSpecialProvisionsConfirmationCheckbox"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-center gap-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
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
                    ),
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privateFoundationSpecialProvisionsReference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Private Foundation Special Provisions Reference
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter private foundation special provision reference..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    State specifically where your organizing document meets this
                    requirement, such as a reference to a particular article or
                    section in your organizing document (Page/Article/Paragraph)
                    or state that you rely on state law.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="educationalSupport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Educational Support</FormLabel>
                  <FormDescription>
                    Do you or will you provide scholarships, fellowships,
                    educational loans, or other educational grants to
                    individuals, including grants for travel, study, or other
                    similar purposes? If &quot;Yes,&quot; complete Schedule H -
                    Section II.
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
              name="privateOperatingFoundationConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Private Operating Foundation Confirmation
                  </FormLabel>
                  <FormDescription>
                    Are you a private operating foundation? To be a private
                    operating foundation you must engage directly in the active
                    conduct of charitable, religious, educational, and similar
                    activities, as opposed to indirectly carrying out these
                    activities by providing grants to individuals or other
                    organizations.
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
              name="privateOperatingFoundationStatusExplanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Private Operating Foundation Status Explanation
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter private operating foundation status explanation..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe how you meet the requirements for private operating
                    foundation status, including how you meet the income test
                    and either the assets test, the endowment test, or the
                    support test. If you&apos;ve been in existence for less than
                    one year, describe how you are likely to satisfy the
                    requirements for private operating foundation status.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button
                asChild
                type="button"
                className="w-1/4 min-w-[92px] gap-3 focus-visible:ring-ringPrimary"
                disabled={isLoading}
              >
                <Link href="/formation/part-6/step-1" className="text-base">
                  <MoveLeft aria-hidden="true" />
                  <span className="sr-only">{"Previous Step"}</span>
                  Prev
                </Link>
              </Button>
              <Button
                type="submit"
                className="w-1/4 min-w-[92px] gap-3 focus-visible:ring-ringPrimary"
                disabled={isLoading}
              >
                Next
                <MoveRight aria-hidden="true" />
                <span className="sr-only">{"Next Step"}</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
