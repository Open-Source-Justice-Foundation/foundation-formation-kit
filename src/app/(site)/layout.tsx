import { Header } from "~/features/header";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mt-[65px] flex grow flex-col justify-center min-[1020px]:mt-[73px]">
        {children}
      </main>
    </div>
  );
}
