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
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { FormationNavigationButtons } from "~/features/formation/components/FormationNavigationButtons";
import { useIsMobile } from "~/hooks/use-mobile";
import { SUPPORTED_STATE_ABBREVIATIONS } from "~/lib/formation/constants/part-1/constants";
import { form1023Part1IdentificationOfApplicantStep9Schema } from "~/lib/formation/validation/part-1/schemas";
import { cn } from "~/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<
  typeof form1023Part1IdentificationOfApplicantStep9Schema
>;

export default function FormationPart1Step9Page() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const [openStateCombobox, setOpenStateCombobox] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023Part1IdentificationOfApplicantStep9Schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      title: "",
      mailingAddress: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { firstName, lastName, title, mailingAddress, city, state, zipCode } =
      values;

    const url = "/api/formation/part-1/step-9";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          title,
          mailingAddress,
          city,
          state,
          zipCode,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 1 step 9 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-2/step-1");
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      toast.error("Submission error");
      setIsLoading(false);
    }
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
          Officer, Director, and/or Trustee Identification
        </CardTitle>
        <CardDescription>
          List the names, titles, and mailing addresses of your officiers,
          directors, and/or trustees.
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
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
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
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
                  <FormLabel>Mailing Address</FormLabel>
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
                              "w-[200px] justify-between text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base",
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
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
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
            <FormationNavigationButtons
              prevHref="/formation/part-1/step-8"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
