import { Header } from "~/features/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex h-full justify-center">
        <main className="flex justify-center">{children}</main>
      </div>
    </div>
  );
}
