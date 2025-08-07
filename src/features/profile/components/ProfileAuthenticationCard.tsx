import { Dispatch, SetStateAction } from "react";

import { PopoverClose } from "@radix-ui/react-popover";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { PROFILE_ICON_BASE_SIZE } from "~/features/profile/constants/constants";
import { SupportedOAuthProvider } from "~/lib/auth/types";
import { formatDate } from "~/lib/utils";
import { Ellipsis, Github, Trash } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";

interface ProfileAuthenticationCardProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  emailVerified: boolean | null;
  passwordPresent: boolean | null;
  githubAccountLinked: boolean | null;
  setGithubAccountLinked: Dispatch<SetStateAction<boolean | null>>;
  setGithubAccountUsername: Dispatch<SetStateAction<string | null>>;
  setGithubAccountConnectedOn: Dispatch<SetStateAction<string | null>>;
  githubAccountUsername: string | null;
  githubAccountConnectedOn: string | null;
}

export function ProfileAuthenticationCard({
  isLoading,
  setIsLoading,
  emailVerified,
  passwordPresent,
  githubAccountLinked,
  setGithubAccountLinked,
  githubAccountUsername,
  setGithubAccountUsername,
  githubAccountConnectedOn,
  setGithubAccountConnectedOn,
}: ProfileAuthenticationCardProps) {
  const { data: session } = useSession();

  const handleSetIsLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const handleSetGithubAccountLinked = (value: boolean) => {
    setGithubAccountLinked(value);
  };

  const handleSetGithubAccountUsername = (value: null) => {
    setGithubAccountUsername(value);
  };

  const handleSetGithubAccountConnectedOn = (value: null) => {
    setGithubAccountConnectedOn(value);
  };

  async function handleLinkOAuth(provider: SupportedOAuthProvider) {
    handleSetIsLoading(true);

    if (session?.user?.email) {
      const url = "/api/auth/is-link-oauth-allowed-from-profile";
      let isLinkOAuthAllowedFromProfileResponse: Response = new Response();

      try {
        isLinkOAuthAllowedFromProfileResponse = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (isLinkOAuthAllowedFromProfileResponse?.status !== 200) {
          throw new Error(
            `Is link OAuth allowed from profile response status: ${isLinkOAuthAllowedFromProfileResponse?.status}`,
          );
        }

        await signIn(provider);
      } catch (err) {
        // TODO
        // Don't log the err value, do something else with it to avoid deployment error
        console.error(err);
        handleSetIsLoading(false);
        toast.error("Failed to link account");
      }
    } else {
      handleSetIsLoading(false);
      toast.error("Failed to link account");
    }
  }

  async function handleUnlinkOAuth() {
    handleSetIsLoading(false);

    if (session?.user?.email) {
      if (emailVerified && passwordPresent) {
        const url = "/api/auth/unlink-oauth-from-profile";
        let unlinkOAuthFromProfileResponse: Response = new Response();

        try {
          unlinkOAuthFromProfileResponse = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (unlinkOAuthFromProfileResponse?.status !== 200) {
            throw new Error(
              `Unlink OAuth from profile response status: ${unlinkOAuthFromProfileResponse?.status}`,
            );
          }

          handleSetGithubAccountLinked(false);
          handleSetGithubAccountUsername(null);
          handleSetGithubAccountConnectedOn(null);
          toast.success("Account unlink successful");
        } catch (err) {
          // TODO
          // Don't log the err value, do something else with it to avoid deployment error
          console.error(err);
          toast.error("Failed to unlink account");
        } finally {
          handleSetIsLoading(false);
        }
      } else {
        handleSetIsLoading(false);
        toast.error("User must have at least 1 identity after unlinking");
      }
    } else {
      handleSetIsLoading(false);
      toast.error("Failed to unlink account");
    }
  }

  return (
    <Card className="mb-6 flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 sm:mb-7 md:mb-8 md:px-2 md:py-2">
      <CardHeader className="px-4 pb-7 pt-4 sm:px-6 sm:pt-6">
        <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
          Authentication
        </CardTitle>
        <CardDescription>
          Link your account to third-party authentication providers.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex px-4 pb-4 sm:px-6 sm:pb-6">
        {githubAccountLinked === false && (
          <Button
            type="button"
            className="w-full focus-visible:ring-ringPrimary sm:max-w-[116px]"
            disabled={isLoading}
            onClick={() => handleLinkOAuth("github")}
          >
            Link GitHub
          </Button>
        )}
        {githubAccountLinked && (
          <div className="flex w-full flex-col gap-5 sm:gap-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <div className="flex grow flex-wrap items-center justify-between gap-1.5">
                <div className="mr-7 flex items-center gap-2">
                  <Github size={PROFILE_ICON_BASE_SIZE} aria-hidden="true" />
                  <span className="sr-only">GitHub</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-secondary-foreground sm:text-base">
                      GitHub
                    </span>
                    {githubAccountUsername && (
                      <span className="text-xs text-muted-foreground sm:text-sm">
                        @{githubAccountUsername}
                      </span>
                    )}
                  </div>
                </div>
                {githubAccountConnectedOn && (
                  <span className="ml-6 text-xs text-muted-foreground sm:text-sm">
                    Connected on {formatDate(githubAccountConnectedOn)}
                  </span>
                )}
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-full px-3"
                    disabled={isLoading}
                  >
                    <Ellipsis aria-hidden="true" className="text-foreground" />
                    <span className="sr-only">Show OAuth account options</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-52 p-2 sm:w-60 sm:p-2.5 md:w-64 md:p-3"
                >
                  <div className="flex flex-col">
                    <PopoverClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        className="justify-start p-1 sm:p-1.5 md:p-2"
                        onClick={() => handleUnlinkOAuth()}
                        disabled={isLoading}
                      >
                        <Trash aria-hidden="true" className="text-foreground" />
                        <span className="sr-only">Trash</span>
                        <span className="text-xs text-secondary-foreground sm:text-sm md:text-base">
                          Unlink Account
                        </span>
                      </Button>
                    </PopoverClose>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Button
              type="button"
              className="w-full focus-visible:ring-ringPrimary sm:max-w-[116px]"
              disabled={true}
            >
              Link GitHub
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
