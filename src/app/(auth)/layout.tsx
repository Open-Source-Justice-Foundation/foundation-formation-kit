export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto h-screen w-full">
      <div className="h-screen w-full lg:grid">
        <div className="flex h-screen flex-col items-center pt-32">
          {children}
        </div>
      </div>
    </div>
  );
}
