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
  Form,
  FormControl,
  FormDescription,
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
import { SUPPORTED_STATE_OF_FORMATION_ABBREVIATIONS } from "~/lib/formation/constants/part-2/constants";
import { form1023Part2OrganizationalStructureStep3Schema } from "~/lib/formation/validation/part-2/schemas";
import { cn } from "~/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<
  typeof form1023Part2OrganizationalStructureStep3Schema
>;

export default function FormationPart2Step3Page() {
  const router = useRouter();

  const [openStateCombobox, setOpenStateCombobox] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(form1023Part2OrganizationalStructureStep3Schema),
    defaultValues: {
      stateOfFormation: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const { stateOfFormation } = values;

    const url = "/api/formation/part-2/step-3";
    let response: Response = new Response();

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stateOfFormation,
        }),
      });

      if (response?.status !== 200) {
        throw new Error(
          `Formation part 2 step 3 response status: ${response?.status}`,
        );
      }

      router.push("/formation/part-2/step-4");
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
          State of Formation
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
              name="stateOfFormation"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>State of Formation</FormLabel>
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
                            ? SUPPORTED_STATE_OF_FORMATION_ABBREVIATIONS.find(
                              (supportedStateOfFormation) =>
                                supportedStateOfFormation.value ===
                                field.value,
                            )?.label
                            : "Select state..."}
                          <ChevronsUpDown className="opacity-50" />
                          <span className="sr-only">Open state combobox</span>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search state..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No state found.</CommandEmpty>
                          <CommandGroup>
                            {SUPPORTED_STATE_OF_FORMATION_ABBREVIATIONS.map(
                              (supportedStateOfFormation) => (
                                <CommandItem
                                  key={supportedStateOfFormation.value}
                                  value={supportedStateOfFormation.value}
                                  onSelect={() => {
                                    form.setValue(
                                      "stateOfFormation",
                                      form.getValues("stateOfFormation") ===
                                        supportedStateOfFormation.value
                                        ? ""
                                        : supportedStateOfFormation.value,
                                    );
                                    setOpenStateCombobox(false);
                                  }}
                                  disabled={isLoading}
                                >
                                  {supportedStateOfFormation.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      supportedStateOfFormation.value ===
                                        field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <span className="sr-only">
                                    State selected
                                  </span>
                                </CommandItem>
                              ),
                            )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select your state of incorporation or other formation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormationNavigationButtons
              prevHref="/formation/part-2/step-2"
              isLoading={isLoading}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
