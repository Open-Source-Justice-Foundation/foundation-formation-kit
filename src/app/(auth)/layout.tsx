export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <div className="flex h-full items-center">{children}</div>
    </div>
  );
}
