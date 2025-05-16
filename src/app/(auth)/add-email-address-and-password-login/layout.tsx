import { Suspense } from "react";

export default function AddEmailAddressAndPasswordLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<></>}>{children}</Suspense>;
}
