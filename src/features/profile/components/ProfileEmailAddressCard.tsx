import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";

interface ProfileEmailAddressCardProps {
  email: string | null | undefined;
  emailVerified: boolean | null;
  passwordPresent: boolean | null;
  githubAccountLinked?: boolean | null;
}

export function ProfileEmailAddressCard({
  email,
  emailVerified,
  passwordPresent,
  githubAccountLinked,
}: ProfileEmailAddressCardProps) {
  return (
    <Card className="mb-6 flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 sm:mb-7 md:mb-8 md:px-2 md:py-2">
      <CardHeader className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
        <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
          Your Email Address
        </CardTitle>
        {emailVerified && passwordPresent && (
          <CardDescription>
            Your current email address used for login and notifications.
          </CardDescription>
        )}
        {emailVerified === false && githubAccountLinked && (
          <CardDescription>
            Your current email address is associated with GitHub and used for
            notifications.
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="flex flex-col justify-center overflow-x-auto pb-1">
          <Label htmlFor="profile-email-address-card-email" className="mb-2">
            Email address
          </Label>
          <div className="flex items-center gap-2">
            <span
              id="profile-email-address-card-email"
              className="text-sm text-secondary-foreground sm:text-base"
            >
              {email}
            </span>
            <Badge
              variant="outline"
              className={`${emailVerified &&
                passwordPresent &&
                "border-verified-badge-border bg-verified-badge-background text-verified-badge-foreground"
                } ${emailVerified === false &&
                githubAccountLinked &&
                "border-unverified-badge-border bg-unverified-badge-background text-unverified-badge-foreground"
                }`}
            >
              {emailVerified && passwordPresent && "Verified"}
              {emailVerified === false && githubAccountLinked && "Unverified"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
