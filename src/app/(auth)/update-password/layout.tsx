import { Suspense } from "react";

export default function UpdatePasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<></>}>{children}</Suspense>;
}
