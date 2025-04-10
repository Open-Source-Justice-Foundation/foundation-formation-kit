export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center px-5 py-5 min-[421px]:px-0 min-[421px]:py-6 sm:py-7 md:py-8">
      {children}
    </div>
  );
}
