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
import { form1023Part2OrganizationalStructureStep1Schema } from "~/lib/formation/validation/part-2/schemas";
import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<
  typeof form1023Part2OrganizationalStructureStep1Schema
>;

export default function FormationPart2Step1Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023Part2OrganizationalStructureStep1Schema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { organizationType } = values;

    const url = "/api/formation/part-2/step-1";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organizationType,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 2 step 1 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-2/step-2");
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
          Organization Type
        </CardTitle>
        <CardDescription>
          You must be a corporation, limited liability company (LLC),
          unincorporated association, or trust to be tax exempt.
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
              name="organizationType"
              render={({ field }) => (
                <FormItem>
                  <FormDescription className="font-normal">
                    Select your type of organization.
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
                              value="Corporation"
                              className="focus-visible:ring-ringPrimary"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal sm:text-base">
                            Corporation
                          </FormLabel>
                        </div>
                        <FormDescription>
                          At the end of this form, you must upload a copy of
                          your articles of incorporation (and any amendments)
                          that shows proof of filing with the appropriate state
                          agency.
                        </FormDescription>
                      </FormItem>
                      <FormItem>
                        <div className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem
                              value="Limited Liability Company (LLC)"
                              className="focus-visible:ring-ringPrimary"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal sm:text-base">
                            Limited Liability Company (LLC)
                          </FormLabel>
                        </div>
                        <FormDescription>
                          At the end of this form, you must upload a copy of
                          your articles of organization (and any amendments)
                          that shows proof of filing with the appropriate state
                          agency. Also, if you adopted an operating agreement,
                          upload a copy, along with any amendments.
                        </FormDescription>
                      </FormItem>
                      <FormItem>
                        <div className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem
                              value="Unincorporated Association"
                              className="focus-visible:ring-ringPrimary"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal sm:text-base">
                            Unincorporated Association
                          </FormLabel>
                        </div>
                        <FormDescription>
                          At the end of this form, you must upload a copy of
                          your articles of association, constitution, or other
                          similar organizing document that is dated and includes
                          at least two signatures. Include signed and dated
                          copies of any amendments.
                        </FormDescription>
                      </FormItem>
                      <FormItem>
                        <div className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem
                              value="Trust"
                              className="focus-visible:ring-ringPrimary"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal sm:text-base">
                            Trust
                          </FormLabel>
                        </div>
                        <FormDescription>
                          At the end of this form, you must upload a signed and
                          dated copy of your trust agreement. Include signed and
                          dated copies of any amendments.
                        </FormDescription>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
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
                <Link href="/formation/part-1/step-9" className="text-base">
                  <MoveLeft aria-hidden="true" />
                  <span className="sr-only">Previous Step</span>
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
                <span className="sr-only">Next Step</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
