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
import { Textarea } from "~/components/ui/textarea";
import { form1023Part4YourActivitiesStep3Schema } from "~/lib/formation/validation/part-4/schemas";
import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// TODO
// Update schemas
// Update text

type FormValues = z.infer<typeof form1023Part4YourActivitiesStep3Schema>;

export default function FormationPart4Step9Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023Part4YourActivitiesStep3Schema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const {
      programsLimitProvisionOfGoodsServicesOrFunds,
      programsLimitProvisionOfGoodsServicesOrFundsExplanation,
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
          programsLimitProvisionOfGoodsServicesOrFunds,
          programsLimitProvisionOfGoodsServicesOrFundsExplanation,
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
    <Card className="flex w-[360px] flex-col border sm:w-[425px] md:border-0">
      <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
        <CardTitle className="text-base sm:text-xl md:text-2xl">
          Distributions to Other Organizations
        </CardTitle>
        <CardDescription>
          🚧 Under construction, applications may be deleted and not work 🚧
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
              name="programsLimitProvisionOfGoodsServicesOrFunds"
              render={({ field }) => (
                <FormItem>
                  <FormDescription className="text-sm font-normal sm:text-base">
                    Do you or will you make grants, loans, or other
                    distributions to organizations? If &quot;Yes,&quot; describe
                    the type and purpose of the grants, loans, or distributions,
                    how you select your recipients including submission
                    requirements (such as grant proposals or application forms),
                    and the criteria you use or will use to select recipients.
                    Also describe how you ensure the grants, loans, and other
                    distributions are or will be used for their intended
                    purposes (including whether you require periodic or final
                    reports on the use of funds and any procedures you have if
                    you identify that funds are not being used for their
                    intended purposes). Finally, describe the records you keep
                    with respect to grants, loans, or other distributions you
                    make and identify any recipient organizations and any
                    relationships between you and the recipients. If
                    &quot;No,&quot; continue to Line 10.
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
              name="programsLimitProvisionOfGoodsServicesOrFundsExplanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distributions to Other Organizations</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Distributions to other organizations..."
                      className="resize-none"
                      {...field}
                    />
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
                <Link href="/formation/part-4/step-8" className="text-base">
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
