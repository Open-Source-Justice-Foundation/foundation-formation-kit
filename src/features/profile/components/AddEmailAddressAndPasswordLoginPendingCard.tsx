import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";

interface AddEmailAddressAndPasswordLoginPendingCardProps {
  newEmail: string | null;
}

export function AddEmailAddressAndPasswordLoginPendingCard({
  newEmail,
}: AddEmailAddressAndPasswordLoginPendingCardProps) {
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
        {newEmail ? (
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
                {newEmail}
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
        ) : (
          <>Failed to retrieve the provided email address...</>
        )}
      </CardContent>
    </Card>
  );
}
