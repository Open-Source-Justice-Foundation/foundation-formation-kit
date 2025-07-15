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
import { useIsMobile } from "~/hooks/use-mobile";
import {
  SUPPORTED_COUNTRIES,
  SUPPORTED_STATE_ABBREVIATIONS,
} from "~/lib/formation/constants/part-1/constants";
import { form1023Part1IdentificationOfApplicantStep1Schema } from "~/lib/formation/validation/part-1/schemas";
import { cn } from "~/lib/utils";
import { Check, ChevronsUpDown, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<
  typeof form1023Part1IdentificationOfApplicantStep1Schema
>;

export default function FormationPart1Step1Page() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const [openStateCombobox, setOpenStateCombobox] = useState<boolean>(false);
  const [openCountryCombobox, setOpenCountryCombobox] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023Part1IdentificationOfApplicantStep1Schema),
    defaultValues: {
      fullNameOfOrganization: "",
      careOfName: "",
      mailingAddress: "",
      city: "",
      country: "",
      state: "",
      zipCodePlusFour: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const {
      fullNameOfOrganization,
      careOfName,
      mailingAddress,
      city,
      country,
      state,
      zipCodePlusFour,
    } = values;

    const url = "/api/formation/part-1/step-1";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullNameOfOrganization,
          careOfName,
          mailingAddress,
          city,
          country,
          state,
          zipCodePlusFour,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 1 step 1 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-1/step-2");
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      toast.error("Submission error");
      setIsLoading(false);
    }
  }

  function CountryComboboxList({ fieldValue }: { fieldValue: string }) {
    return (
      <Command>
        <CommandInput placeholder="Search country..." className="h-9" />
        <CommandList>
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup>
            {SUPPORTED_COUNTRIES.map((supportedCountry) => (
              <CommandItem
                key={supportedCountry.value}
                value={supportedCountry.value}
                onSelect={() => {
                  form.setValue(
                    "country",
                    form.getValues("country") === supportedCountry.value
                      ? ""
                      : supportedCountry.value,
                  );
                  setOpenCountryCombobox(false);
                }}
                disabled={isLoading}
              >
                {supportedCountry.label}
                <Check
                  className={cn(
                    "ml-auto",
                    supportedCountry.value === fieldValue
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                <span className="sr-only">Country selected</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    );
  }

  function StateComboboxList({ fieldValue }: { fieldValue: string }) {
    return (
      <Command>
        <CommandInput placeholder="Search state..." className="h-9" />
        <CommandList>
          <CommandEmpty>No state found.</CommandEmpty>
          <CommandGroup>
            {SUPPORTED_STATE_ABBREVIATIONS.map((supportedState) => (
              <CommandItem
                key={supportedState.value}
                value={supportedState.value}
                onSelect={() => {
                  form.setValue(
                    "state",
                    form.getValues("state") === supportedState.value
                      ? ""
                      : supportedState.value,
                  );
                  setOpenStateCombobox(false);
                }}
                disabled={isLoading}
              >
                {supportedState.label}
                <Check
                  className={cn(
                    "ml-auto",
                    supportedState.value === fieldValue
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                <span className="sr-only">State selected</span>
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
          Organization Identification
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
              name="fullNameOfOrganization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name of Organization</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Input the value exactly as it appears in your organizing
                    document.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="careOfName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Care of Name (if applicable)</FormLabel>
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
              name="mailingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Mailing Address (Number, street, and room/suite)
                  </FormLabel>
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
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
              name="country"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Country</FormLabel>
                  {!isMobile && (
                    <Popover
                      open={openCountryCombobox}
                      onOpenChange={setOpenCountryCombobox}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCountryCombobox}
                            className={cn(
                              "w-[200px] justify-between focus-visible:ring-ringPrimary",
                              !field.value && "text-muted-foreground",
                            )}
                            disabled={isLoading}
                          >
                            {field.value
                              ? SUPPORTED_COUNTRIES.find(
                                (supportedCountry) =>
                                  supportedCountry.value === field.value,
                              )?.label
                              : "Select country..."}
                            <ChevronsUpDown className="opacity-50" />
                            <span className="sr-only">
                              Open country combobox
                            </span>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <CountryComboboxList fieldValue={field.value} />
                      </PopoverContent>
                    </Popover>
                  )}
                  {isMobile && (
                    <Drawer
                      open={openCountryCombobox}
                      onOpenChange={setOpenCountryCombobox}
                    >
                      <DrawerTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCountryCombobox}
                            className={cn(
                              "w-[200px] justify-between focus-visible:ring-ringPrimary",
                              !field.value && "text-muted-foreground",
                            )}
                            disabled={isLoading}
                          >
                            {field.value
                              ? SUPPORTED_COUNTRIES.find(
                                (supportedCountry) =>
                                  supportedCountry.value === field.value,
                              )?.label
                              : "Select country..."}
                            <ChevronsUpDown className="opacity-50" />
                            <span className="sr-only">
                              Open country combobox
                            </span>
                          </Button>
                        </FormControl>
                      </DrawerTrigger>
                      <DrawerContent className="mt-4 border-t">
                        <DrawerHeader className="p-0">
                          <DrawerTitle className="sr-only">
                            Supported Countries
                          </DrawerTitle>
                          <DrawerDescription className="sr-only">
                            Select country
                          </DrawerDescription>
                        </DrawerHeader>
                        <CountryComboboxList fieldValue={field.value} />
                      </DrawerContent>
                    </Drawer>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>State</FormLabel>
                  {!isMobile && (
                    <Popover
                      open={openStateCombobox}
                      onOpenChange={setOpenStateCombobox}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openStateCombobox}
                            className={cn(
                              "w-[200px] justify-between focus-visible:ring-ringPrimary",
                              !field.value && "text-muted-foreground",
                            )}
                            disabled={isLoading}
                          >
                            {field.value
                              ? SUPPORTED_STATE_ABBREVIATIONS.find(
                                (supportedState) =>
                                  supportedState.value === field.value,
                              )?.label
                              : "Select state..."}
                            <ChevronsUpDown className="opacity-50" />
                            <span className="sr-only">Open state combobox</span>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <StateComboboxList fieldValue={field.value} />
                      </PopoverContent>
                    </Popover>
                  )}
                  {isMobile && (
                    <Drawer
                      open={openStateCombobox}
                      onOpenChange={setOpenStateCombobox}
                    >
                      <DrawerTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openStateCombobox}
                            className={cn(
                              "w-[200px] justify-between focus-visible:ring-ringPrimary",
                              !field.value && "text-muted-foreground",
                            )}
                            disabled={isLoading}
                          >
                            {field.value
                              ? SUPPORTED_STATE_ABBREVIATIONS.find(
                                (supportedState) =>
                                  supportedState.value === field.value,
                              )?.label
                              : "Select state..."}
                            <ChevronsUpDown className="opacity-50" />
                            <span className="sr-only">Open state combobox</span>
                          </Button>
                        </FormControl>
                      </DrawerTrigger>
                      <DrawerContent className="mt-4 border-t">
                        <DrawerHeader className="p-0">
                          <DrawerTitle className="sr-only">
                            Supported States
                          </DrawerTitle>
                          <DrawerDescription className="sr-only">
                            Select state
                          </DrawerDescription>
                        </DrawerHeader>
                        <StateComboboxList fieldValue={field.value} />
                      </DrawerContent>
                    </Drawer>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCodePlusFour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code+4</FormLabel>
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
            <Button
              type="submit"
              className="w-1/4 min-w-[92px] gap-3 self-end focus-visible:ring-ringPrimary"
              disabled={isLoading}
            >
              Next
              <MoveRight aria-hidden="true" />
              <span className="sr-only">Next Step</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
