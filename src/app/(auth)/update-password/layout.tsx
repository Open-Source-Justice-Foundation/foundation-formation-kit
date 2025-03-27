import { Suspense } from "react";

export default function UpdatePassowrdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<></>}>{children}</Suspense>;
}
