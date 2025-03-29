import { Header } from "~/features/header";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <Header />
      <main className="h-full">{children}</main>
    </div>
  );
}
