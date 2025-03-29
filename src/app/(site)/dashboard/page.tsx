"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Download, Ellipsis } from "lucide-react";
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
              <div className="flex flex-col justify-between gap-6 sm:basis-1/2 sm:items-end sm:py-2 md:flex-row md:gap-0 md:py-0">
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
