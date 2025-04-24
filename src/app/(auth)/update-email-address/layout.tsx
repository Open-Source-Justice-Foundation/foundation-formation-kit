import { Suspense } from "react";

export default function UpdateEmailAddressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<></>}>{children}</Suspense>;
}
