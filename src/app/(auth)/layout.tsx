export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <div className="flex h-full items-center justify-center px-5 py-5 sm:px-0">
        {children}
      </div>
    </div>
  );
}
