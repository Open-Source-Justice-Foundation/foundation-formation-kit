import { GetStartedButton } from "~/features/header/components/GetStartedButton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      <div className="row-start-2 flex flex-col items-center gap-10">
        <Image
          src="/images/home/tax-free.svg"
          width={96}
          height={96}
          alt="Homepage Tax Free Image"
          unoptimized={true}
        />
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-center text-5xl font-medium text-foreground">
            Get a tax exempt status for your open source project
          </h2>
          <p className="text-center text-lg font-normal text-secondary-foreground">
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
