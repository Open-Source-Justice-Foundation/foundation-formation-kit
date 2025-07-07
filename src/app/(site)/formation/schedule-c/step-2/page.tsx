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
import { form1023ScheduleCYesNoRadioWithTextAreaSchema } from "~/lib/formation/validation/schedule-c/schemas";
import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof form1023ScheduleCYesNoRadioWithTextAreaSchema>;

export default function FormationScheduleCStep2Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023ScheduleCYesNoRadioWithTextAreaSchema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { radioInput, textAreaInput } = values;

    const url = "/api/formation/schedule-c/step-2";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          radioInput,
          textAreaInput,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation schedule C step 2 response status: ${response?.status}`,
        );
      }

      router.push("/formation/schedule-c/step-3");
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
          Cooperative Hospital Service Organization Exemption
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
              name="radioInput"
              render={({ field }) => (
                <FormItem>
                  <FormDescription className="text-sm font-normal sm:text-base">
                    Are you applying for exemption as a cooperative hospital
                    service organization described in section 501(e)? If
                    &quot;Yes,&quot; explain.
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
              name="textAreaInput"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Explanation</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explanation..."
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
                <Link href="/formation/schedule-c/step-1" className="text-base">
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
