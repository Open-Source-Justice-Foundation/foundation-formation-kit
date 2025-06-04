import { Spinner } from "~/components/ui/spinner";

interface FullPageLoadingSpinnerProps {
  loadingText: string;
}

export function FullPageLoadingSpinner({
  loadingText,
}: FullPageLoadingSpinnerProps) {
  return (
    <Spinner className="size-6 min-[421px]:size-8 md:size-12">
      <span className="text-center text-base">{loadingText}</span>
    </Spinner>
  );
}
