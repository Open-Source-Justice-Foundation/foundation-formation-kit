import { auth } from "~/auth";
import { redirect } from "next/navigation";

export default async function NonProfitNameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="h-screen">
      <div className="flex h-full items-center justify-center px-5 py-5 sm:px-0">
        {children}
      </div>
    </div>
  );
}
