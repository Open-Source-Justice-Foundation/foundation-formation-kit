"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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
import { FormationNavigationButtons } from "~/features/formation/components/FormationNavigationButtons";
import { CONFIRM_STUDENT_POLICY_AWARENESS } from "~/lib/formation/constants/schedule-b/constants";
import { form1023ScheduleBStep9Schema } from "~/lib/formation/validation/schedule-b/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof form1023ScheduleBStep9Schema>;

export default function FormationScheduleBStep9Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023ScheduleBStep9Schema),
    defaultValues: {
      confirmStudentPolicyAwareness: [""],
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { radioInput, confirmStudentPolicyAwareness } = values;

    const url = "/api/formation/schedule-b/step-9";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          radioInput,
          confirmStudentPolicyAwareness,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation schedule B step 9 response status: ${response?.status}`,
        );
      }

      router.push("/formation/schedule-b/step-10");
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
          Student Policy Awareness
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
              name="radioInput"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Have you made your racially nondiscriminatory policy known
                    to all segments of the general community you serve by:
                  </FormDescription>
                  <ol className="ml-6 text-sm text-muted-foreground">
                    <li className="mt-6 list-['a)'] before:mr-1.5">
                      Publishing a notice of your policy in a newspaper of
                      general circulation that serves all racial segments of the
                      community?
                    </li>
                    <li className="mt-2 list-['b)'] before:mr-1.5">
                      Publicizing your policy over broadcast media in a way that
                      is reasonably expected to be effective?
                    </li>
                    <li className="mb-6 mt-2 list-['c)'] before:mr-1.5">
                      Displaying a notice of your policy at all times on your
                      primary, publicly accessible internet home page in a
                      manner reasonably expected to be noticed by visitors to
                      the homepage?
                    </li>
                  </ol>
                  <p className="text-sm text-muted-foreground">
                    If &quot;Yes,&quot; continue to Line 10.
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
            <FormItem>
              {CONFIRM_STUDENT_POLICY_AWARENESS.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="confirmStudentPolicyAwareness"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-center gap-2"
                      >
                        <FormControl>
                          <Checkbox
                            name={item.id}
                            className="focus-visible:ring-ringPrimary"
                            checked={field.value?.includes(item.id)}
                            disabled={isLoading}
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
            <FormationNavigationButtons
              prevHref="/formation/schedule-b/step-8"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
