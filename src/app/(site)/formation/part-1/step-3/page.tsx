"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { FormationNavigationButtons } from "~/features/formation/components/FormationNavigationButtons";
import { useIsMobile } from "~/hooks/use-mobile";
import { MONTHS_TAX_YEAR_ENDS } from "~/lib/formation/constants/part-1/constants";
import { form1023Part1IdentificationOfApplicantStep3Schema } from "~/lib/formation/validation/part-1/schemas";
import { cn } from "~/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<
  typeof form1023Part1IdentificationOfApplicantStep3Schema
>;

export default function FormationPart1Step3Page() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const [openMonthTaxYearEndsCombobox, setOpenMonthTaxYearEndsCombobox] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023Part1IdentificationOfApplicantStep3Schema),
    defaultValues: {
      monthTaxYearEnds: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { monthTaxYearEnds } = values;

    const url = "/api/formation/part-1/step-3";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          monthTaxYearEnds,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 1 step 3 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-1/step-4");
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      toast.error("Submission error");
      setIsLoading(false);
    }
  }

  function MonthTaxYearEndsComboboxList({
    fieldValue,
  }: {
    fieldValue: string;
  }) {
    return (
      <Command>
        <CommandInput placeholder="Search month..." className="h-9" />
        <CommandList>
          <CommandEmpty>No month found.</CommandEmpty>
          <CommandGroup>
            {MONTHS_TAX_YEAR_ENDS.map((monthTaxYearEnds) => (
              <CommandItem
                key={monthTaxYearEnds.value}
                value={monthTaxYearEnds.value}
                onSelect={() => {
                  form.setValue(
                    "monthTaxYearEnds",
                    form.getValues("monthTaxYearEnds") ===
                      monthTaxYearEnds.value
                      ? ""
                      : monthTaxYearEnds.value,
                  );
                  setOpenMonthTaxYearEndsCombobox(false);
                }}
                disabled={isLoading}
              >
                {monthTaxYearEnds.label}
                <Check
                  className={cn(
                    "ml-auto",
                    monthTaxYearEnds.value === fieldValue
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                <span className="sr-only">Month tax year ends selected</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    );
  }

  return (
    <Card className="flex w-[360px] flex-col border max-[444px]:mx-6 max-[444px]:w-[88%] sm:w-[425px] md:border-0">
      <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
        <CardTitle className="text-base sm:text-xl md:text-2xl">
          Month Tax Year Ends
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
              name="monthTaxYearEnds"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Month Tax Year Ends</FormLabel>
                  {!isMobile && (
                    <Popover
                      open={openMonthTaxYearEndsCombobox}
                      onOpenChange={setOpenMonthTaxYearEndsCombobox}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openMonthTaxYearEndsCombobox}
                            className={cn(
                              "w-[200px] justify-between focus-visible:ring-ringPrimary",
                              !field.value && "text-muted-foreground",
                            )}
                            disabled={isLoading}
                          >
                            {field.value
                              ? MONTHS_TAX_YEAR_ENDS.find(
                                (monthTaxYearEnds) =>
                                  monthTaxYearEnds.value === field.value,
                              )?.label
                              : "Select month..."}
                            <ChevronsUpDown className="opacity-50" />
                            <span className="sr-only">
                              Open month tax year ends combobox
                            </span>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <MonthTaxYearEndsComboboxList
                          fieldValue={field.value}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                  {isMobile && (
                    <Drawer
                      open={openMonthTaxYearEndsCombobox}
                      onOpenChange={setOpenMonthTaxYearEndsCombobox}
                    >
                      <DrawerTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openMonthTaxYearEndsCombobox}
                            className={cn(
                              "w-[200px] justify-between focus-visible:ring-ringPrimary",
                              !field.value && "text-muted-foreground",
                            )}
                            disabled={isLoading}
                          >
                            {field.value
                              ? MONTHS_TAX_YEAR_ENDS.find(
                                (monthTaxYearEnds) =>
                                  monthTaxYearEnds.value === field.value,
                              )?.label
                              : "Select month..."}
                            <ChevronsUpDown className="opacity-50" />
                            <span className="sr-only">
                              Open month tax year ends combobox
                            </span>
                          </Button>
                        </FormControl>
                      </DrawerTrigger>
                      <DrawerContent className="mt-4 border-t">
                        <DrawerHeader className="p-0">
                          <DrawerTitle className="sr-only">
                            Month Tax Year Ends
                          </DrawerTitle>
                          <DrawerDescription className="sr-only">
                            Select month
                          </DrawerDescription>
                        </DrawerHeader>
                        <MonthTaxYearEndsComboboxList
                          fieldValue={field.value}
                        />
                      </DrawerContent>
                    </Drawer>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormationNavigationButtons
              prevHref="/formation/part-1/step-2"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
