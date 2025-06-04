import { Dispatch, SetStateAction } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface DeleteAccountCardProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export function DeleteAccountCard({
  isLoading,
  setIsLoading,
}: DeleteAccountCardProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSetIsLoading = (value: boolean) => {
    setIsLoading(value);
  };

  async function deleteAccount() {
    handleSetIsLoading(true);

    if (session?.user?.email) {
      const url = "/api/auth/delete-account-from-profile";
      let deleteAccountFromProfileResponse: Response = new Response();

      try {
        deleteAccountFromProfileResponse = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (deleteAccountFromProfileResponse?.status !== 200) {
          throw new Error(
            `Delete account from profile response status: ${deleteAccountFromProfileResponse?.status}`,
          );
        }
        router.push("/");
      } catch (err) {
        // TODO
        // Don't log the err value, do something else with it to avoid deployment error
        console.error(err);
        router.push("/error");
      }
    } else {
      router.push("/error");
    }
  }

  return (
    <Card className="flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 md:px-2 md:py-2">
      <CardHeader className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
        <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
          Delete Account
        </CardTitle>
        <CardDescription>Delete your account.</CardDescription>
      </CardHeader>
      <CardContent className="flex px-4 pb-4 sm:px-6 sm:pb-6">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              className="w-full sm:max-w-[164px]"
              disabled={isLoading}
            >
              <Trash
                aria-hidden="true"
                className="text-destructive-foreground"
              />
              <span className="sr-only">Delete account</span>
              Delete account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-3/4 max-[430px]:p-5">
            <AlertDialogHeader>
              <AlertDialogTitle className="max-[430px]:text-base">
                Are you sure you want to delete your account?
              </AlertDialogTitle>
              <AlertDialogDescription className="max-[430px]:text-xs">
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers. Be sure to
                download any documents related to your account for your records.
                To delete data shared with third parties, you will have to
                contact them directly.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="mt-4 max-[430px]:h-8 max-[430px]:px-3 max-[430px]:py-1.5"
                disabled={isLoading}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className={cn(
                  buttonVariants({ variant: "destructive" }),
                  "max-[430px]:h-8",
                  "max-[430px]:py-1.5",
                  "max-[430px]:px-3",
                )}
                onClick={() => deleteAccount()}
                disabled={isLoading}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
