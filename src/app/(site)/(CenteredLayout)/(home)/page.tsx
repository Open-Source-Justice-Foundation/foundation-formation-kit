import TaxFree from "/images/svgs/homepage/tax-free.svg";
import { GetStartedButton } from "~/features/buttons";

export default function Homepage() {
  return (
    <div className="flex items-center px-5 sm:max-w-[68%] sm:px-0 md:max-w-[56%]">
      <div className="flex flex-col items-center gap-10">
        <TaxFree className="h-[84px] w-[84px] sm:h-[96px] sm:w-[96px]" />
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-center text-3xl font-medium text-foreground sm:text-5xl">
            Get a tax exempt status for your open source project
          </h2>
          <p className="text-center text-base font-normal text-secondary-foreground sm:text-lg">
            Foundation formation kit is a guide to help open source projects
            become non-profit foundations and be ready to receive tax-advantaged
            donations!
          </p>
        </div>
        <GetStartedButton />
      </div>
    </div>
  );
}
