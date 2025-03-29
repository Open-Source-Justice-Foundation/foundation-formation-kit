export default function CenteredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full justify-center py-5">
      <div className="flex justify-center">{children}</div>
    </div>
  );
}
