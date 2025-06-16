import { Dispatch, SetStateAction } from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface ProfileAddEmailAddressAndPasswordLoginPendingCardProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setPasswordPresent: Dispatch<SetStateAction<boolean | null>>;
  newEmailAddressForLoginForm: string | null;
  setNewEmailAddressForLoginForm: Dispatch<SetStateAction<string | null>>;
}

export function ProfileAddEmailAddressAndPasswordLoginPendingCard({
  isLoading,
  setIsLoading,
  setPasswordPresent,
  newEmailAddressForLoginForm,
  setNewEmailAddressForLoginForm,
}: ProfileAddEmailAddressAndPasswordLoginPendingCardProps) {
  const { data: session } = useSession();

  const handleSetIsLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const handleSetPasswordPresent = (value: boolean) => {
    setPasswordPresent(value);
  };

  const handleSetNewEmailAddressForLoginForm = (value: string) => {
    setNewEmailAddressForLoginForm(value);
  };

  async function resetEmailAddressAndPasswordLogin() {
    handleSetIsLoading(true);

    if (session?.user?.email) {
      const url = "/api/auth/reset-email-address-and-password-login";
      let resetEmailAddressAndPasswordLoginResponse: Response = new Response();

      try {
        resetEmailAddressAndPasswordLoginResponse = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (resetEmailAddressAndPasswordLoginResponse?.status !== 200) {
          throw new Error(
            `Reset email address and password login response status: ${resetEmailAddressAndPasswordLoginResponse?.status}`,
          );
        }

        handleSetPasswordPresent(false);
        handleSetNewEmailAddressForLoginForm("");
        toast.success("Email login reset successful");
      } catch (err) {
        // TODO
        // Don't log the err value, do something else with it to avoid deployment error
        console.error(err);
        toast.error("Failed to reset email login");
      } finally {
        handleSetIsLoading(false);
      }
    } else {
      handleSetIsLoading(false);
      toast.error("Failed to reset email login");
    }
  }

  return (
    <Card className="mb-6 flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 sm:mb-7 md:mb-8 md:px-2 md:py-2">
      <CardHeader className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
        <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
          Add Email Login
        </CardTitle>
        <CardDescription>
          Complete the process by following the instructions sent to the
          provided email address.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex px-4 pb-4 sm:px-6 sm:pb-6">
        {newEmailAddressForLoginForm ? (
          <div className="flex w-full flex-col gap-5 sm:gap-6">
            <div className="flex flex-col justify-center overflow-x-auto pb-1">
              <Label
                htmlFor="add-email-login-pending-card-new-email"
                className="mb-2"
              >
                Email address
              </Label>
              <div className="flex items-center gap-2">
                <span
                  id="add-email-login-pending-card-new-email"
                  className="text-sm text-secondary-foreground sm:text-base"
                >
                  {newEmailAddressForLoginForm}
                </span>
                <Badge
                  variant="outline"
                  className={
                    "border-pending-badge-border bg-pending-badge-background text-pending-badge-foreground"
                  }
                >
                  Pending
                </Badge>
              </div>
            </div>
            <Button
              type="button"
              className="w-full focus-visible:ring-ringPrimary sm:max-w-[182px]"
              onClick={() => resetEmailAddressAndPasswordLogin()}
              disabled={isLoading}
            >
              Reset email login
            </Button>
          </div>
        ) : (
          <>Failed to retrieve the provided email address...</>
        )}
      </CardContent>
    </Card>
  );
}
