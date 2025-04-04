import { Header } from "~/features/header";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex grow flex-col justify-center">{children}</main>
    </div>
  );
}
