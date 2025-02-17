"use client";

import Image from "next/image";

export function FFKLogo() {
  return (
    <>
      <Image
        src={"/images/logos/logo.svg"}
        width={25}
        height={25}
        alt="Foundation Formation Kit Logo"
        unoptimized={true}
        className="dark:hidden"
      />
      <Image
        src={"/images/logos/logo-dark.svg"}
        width={25}
        height={25}
        alt="Foundation Formation Kit Dark Logo"
        unoptimized={true}
        className="hidden dark:block"
      />
    </>
  );
}
