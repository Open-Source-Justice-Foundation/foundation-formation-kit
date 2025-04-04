export default function CenteredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex grow justify-center py-5">
      <div className="flex grow justify-center">{children}</div>
    </div>
  );
}
