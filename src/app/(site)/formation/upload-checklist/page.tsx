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
import { FormationNavigationButtons } from "~/features/formation/components/FormationNavigationButtons";
import { UPLOAD_CHECKLIST_ITEMS } from "~/lib/formation/constants/upload-checklist/constants";
import { form1023UploadChecklistSchema } from "~/lib/formation/validation/upload-checklist/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// TODO
// Update schemas

type FormValues = z.infer<typeof form1023UploadChecklistSchema>;

export default function FormationUploadChecklistPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023UploadChecklistSchema),
    defaultValues: {
      uploadChecklistItems: [""],
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { uploadChecklistItems } = values;

    const url = "/api/formation/upload-checklist";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uploadChecklistItems,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation upload checklist response status: ${response?.status}`,
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
          Upload Checklist
        </CardTitle>
        <CardDescription>
          This is an upload checklist used to make sure you&apos;ve uploaded all
          of your required documents.
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
              name="uploadChecklistItems"
              render={() => (
                <FormItem>
                  <FormDescription>
                    Check the relevant boxes below to make sure you&apos;ve
                    uploaded all of your required documents.
                  </FormDescription>
                  {UPLOAD_CHECKLIST_ITEMS.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="uploadChecklistItems"
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
            <FormationNavigationButtons
              prevHref="/formation/part-10/step-1"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
