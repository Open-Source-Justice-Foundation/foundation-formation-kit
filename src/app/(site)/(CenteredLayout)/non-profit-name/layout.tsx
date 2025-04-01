export default function NonProfitNameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full items-center justify-center px-5 sm:px-0">
      {children}
    </div>
  );
}
