export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full justify-center p-8 sm:p-16">
      <div className="flex w-full flex-col items-center">{children}</div>
    </div>
  );
}
