export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex w-full flex-col p-8 sm:p-16">{children}</div>;
}
