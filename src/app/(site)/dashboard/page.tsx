"use client";

import { useState } from "react";

import { PopoverClose } from "@radix-ui/react-popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button, buttonVariants } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { Archive, Download, Ellipsis, Trash } from "lucide-react";
import { toast } from "sonner";

const foundations = [
  {
    id: "1",
    name: "Open Source Justice Foundation",
    taxForm: "1023",
    articlesOfIncorporationForm: "Articles of Incorporation",
    typeOfFoundation: "Florida non-profit",
    timeSinceSubmission: "10 days",
  },
  {
    id: "2",
    name: "Another Foundation",
    taxForm: "1023",
    articlesOfIncorporationForm: "Articles of Incorporation",
    typeOfFoundation: "Delaware non-profit",
    timeSinceSubmission: "12 days",
  },
  {
    id: "3",
    name: "One More Foundation",
    taxForm: "1023",
    articlesOfIncorporationForm: "Articles of Incorporation",
    typeOfFoundation: "Kentucky non-profit",
    timeSinceSubmission: "15 days",
  },
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function showCardOptions() {
    console.log("Showing card options...");
  }

  async function someButton() {
    setIsLoading(true);

    try {
      console.log("Doing something with a button...");
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      toast.error("Some button error");
    } finally {
      setIsLoading(false);
    }
  }

  async function downloadTaxForm() {
    setIsLoading(true);

    try {
      console.log("Downloading 1023...");
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      toast.error("Download error");
    } finally {
      setIsLoading(false);
    }
  }

  async function downloadArticlesOfIncorporation() {
    setIsLoading(true);

    try {
      console.log("Downloading Articles of Incorporation...");
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      toast.error("Download error");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteFoundation() {
    setIsLoading(true);

    try {
      console.log("Deleting foundation...");
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      toast.error("Deletion error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {foundations.map((foundation) => (
        <Card
          key={foundation.id}
          className="mb-6 flex w-full flex-col px-2 py-2 last:mb-0 sm:mb-10 sm:px-4 sm:py-4 md:px-9"
        >
          <CardHeader className="px-4 pb-6 pt-4 md:px-6 md:pb-8 md:pt-6">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl">
                {foundation.name}
              </CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-full px-3"
                    onClick={() => showCardOptions()}
                    disabled={isLoading}
                  >
                    <Ellipsis aria-hidden="true" className="text-foreground" />
                    <span className="sr-only">Show card options</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-52 p-2 sm:w-60 sm:p-2.5 md:w-64 md:p-3"
                >
                  <div className="flex flex-col">
                    <PopoverClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full justify-start p-2"
                        onClick={() => someButton()}
                        disabled={isLoading}
                      >
                        <Archive
                          aria-hidden="true"
                          className="text-foreground"
                        />
                        <span className="sr-only">Archive</span>
                        <span className="truncate text-wrap text-xs text-secondary-foreground sm:text-sm md:text-base">
                          Some button
                        </span>
                      </Button>
                    </PopoverClose>
                    <PopoverClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full justify-start p-2"
                        onClick={() => downloadTaxForm()}
                        disabled={isLoading}
                      >
                        <Download
                          aria-hidden="true"
                          className="text-foreground"
                        />
                        <span className="sr-only">Download</span>
                        <span className="truncate text-wrap text-xs text-secondary-foreground sm:text-sm md:text-base">
                          {foundation.taxForm}
                        </span>
                      </Button>
                    </PopoverClose>
                    <PopoverClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full justify-start p-2"
                        onClick={() => downloadArticlesOfIncorporation()}
                        disabled={isLoading}
                      >
                        <Download
                          aria-hidden="true"
                          className="text-foreground"
                        />
                        <span className="sr-only">Download</span>
                        <span className="truncate text-wrap text-xs text-secondary-foreground sm:text-sm md:text-base">
                          {foundation.articlesOfIncorporationForm}
                        </span>
                      </Button>
                    </PopoverClose>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          className="w-full justify-start p-2"
                          disabled={isLoading}
                        >
                          <Trash
                            aria-hidden="true"
                            className="text-foreground"
                          />
                          <span className="sr-only">
                            Delete your foundation
                          </span>
                          <span className="truncate text-wrap text-xs text-secondary-foreground sm:text-sm md:text-base">
                            Delete
                          </span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="w-3/4 max-[430px]:p-5">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="max-[430px]:text-base">
                            Are you sure you want to delete your foundation?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="max-[430px]:text-xs">
                            This action cannot be undone. This will permanently
                            delete your foundation and remove your data from our
                            servers. Be sure to download any documents related
                            to the foundation for your records.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <PopoverClose asChild>
                            <AlertDialogCancel
                              className="mt-4 max-[430px]:h-8 max-[430px]:px-3 max-[430px]:py-1.5"
                              disabled={isLoading}
                            >
                              Cancel
                            </AlertDialogCancel>
                          </PopoverClose>
                          <PopoverClose asChild>
                            <AlertDialogAction
                              className={cn(
                                buttonVariants({ variant: "destructive" }),
                                "max-[430px]:h-8",
                                "max-[430px]:py-1.5",
                                "max-[430px]:px-3",
                              )}
                              onClick={() => deleteFoundation()}
                              disabled={isLoading}
                            >
                              Delete
                            </AlertDialogAction>
                          </PopoverClose>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent className="flex px-4 pb-4 md:px-6 md:pb-6">
            <div className="flex w-full md:items-center md:justify-between">
              <div className="hidden sm:flex sm:basis-1/2 sm:flex-col sm:gap-6 md:mr-8 md:flex-row md:gap-12">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-full px-3"
                    onClick={() => downloadTaxForm()}
                    disabled={isLoading}
                  >
                    <Download aria-hidden="true" className="text-foreground" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <span className="text-sm text-secondary-foreground sm:text-base">
                    {foundation.taxForm}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-full px-3"
                    onClick={() => downloadArticlesOfIncorporation()}
                    disabled={isLoading}
                  >
                    <Download aria-hidden="true" className="text-foreground" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <span className="text-sm text-secondary-foreground sm:text-base">
                    {foundation.articlesOfIncorporationForm}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-6 sm:basis-1/2 sm:items-start sm:py-2 md:flex-row md:items-center md:gap-0 md:py-0">
                <span className="text-sm text-secondary-foreground sm:text-base">
                  {foundation.typeOfFoundation}
                </span>
                <span className="text-sm text-secondary-foreground sm:text-base">
                  {foundation.timeSinceSubmission}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
