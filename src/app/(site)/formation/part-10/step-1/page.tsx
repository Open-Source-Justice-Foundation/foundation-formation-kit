"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { FormationNavigationButtons } from "~/features/formation/components/FormationNavigationButtons";
import { form1023Part10SignatureStep1Schema } from "~/lib/formation/validation/part-10/schemas";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof form1023Part10SignatureStep1Schema>;

export default function FormationPart10Step1Page() {
  const router = useRouter();

  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023Part10SignatureStep1Schema),
    defaultValues: {
      nameOfSigner: "",
      titleOrAuthorityOfSigner: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { nameOfSigner, titleOrAuthorityOfSigner, date } = values;

    const url = "/api/formation/part-10/step-1";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nameOfSigner,
          titleOrAuthorityOfSigner,
          date,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 10 step 1 response status: ${response?.status}`,
        );
      }

      router.push("/formation/upload-checklist");
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      toast.error("Submission error");
      setIsLoading(false);
    }
  }

  function handleCalendarOnSelect(
    event: Date | undefined,
    field: ControllerRenderProps<{
      date: Date;
      nameOfSigner: string;
      titleOrAuthorityOfSigner: string;
    }>,
  ) {
    field.onChange(event);
    setOpenDatePicker(false);
  }

  return (
    <Card className="flex w-[360px] flex-col border max-[444px]:mx-6 max-[444px]:w-[88%] sm:w-[425px] md:border-0">
      <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
        <CardTitle className="text-base sm:text-xl md:text-2xl">
          Signature
        </CardTitle>
        <CardDescription>
          I declare under the penalties of perjury that I am authorized to sign
          this application on behalf of the above organization and that I have
          examined this application, and to the best of my knowledge it is true,
          correct, and complete.
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
              name="nameOfSigner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Signer</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="titleOrAuthorityOfSigner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title or Authority of Signer</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover
                    open={openDatePicker}
                    onOpenChange={setOpenDatePicker}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal focus-visible:ring-ringPrimary",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          <span className="sr-only">Select date</span>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        defaultMonth={field.value ? field.value : new Date()}
                        selected={field.value}
                        onSelect={(event) =>
                          handleCalendarOnSelect(event, field)
                        }
                        disabled={(date) =>
                          date > new Date() || date < new Date("1970-01-01")
                        }
                        className="rounded-md border shadow-sm"
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Enter the date.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormationNavigationButtons
              prevHref="/formation/part-9/step-1"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
