export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex justify-center p-8 sm:p-16">{children}</div>;
}
