"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  AddEmailAddressAndPasswordLoginPendingCard,
  DeleteAccountCard,
  EmailAddressCard,
  ProfileHeading,
} from "~/features/profile";
import { PROFILE_ICON_BASE_SIZE } from "~/features/profile/constants/constants";
import { FullPageLoadingSpinner } from "~/features/spinners";
import { usePasswordConfirmation } from "~/lib/auth/hooks/usePasswordConfirmation";
import { SupportedOAuthProvider } from "~/lib/auth/types";
import {
  addEmailAddressAndPasswordLoginFromProfileSchema,
  passwordRequestSchema,
  resetEmailAddressSchema,
  updatePasswordFromProfileSchema,
} from "~/lib/auth/validation/schemas";
import { formatDate } from "~/lib/utils";
import { Ellipsis, EyeIcon, EyeOffIcon, Github, Trash } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ResetEmailAddressFormValues = z.infer<typeof resetEmailAddressSchema>;
type PasswordRequestFormValues = z.infer<typeof passwordRequestSchema>;
type UpdatePasswordFormValues = z.infer<typeof updatePasswordFromProfileSchema>;
type AddEmailAddressAndPasswordLoginFormValues = z.infer<
  typeof addEmailAddressAndPasswordLoginFromProfileSchema
>;

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [passwordPresent, setPasswordPresent] = useState<boolean | null>(null);
  const [githubAccountLinked, setGithubAccountLinked] = useState<
    boolean | null
  >(null);
  const [githubAccountUsername, setGithubAccountUsername] = useState<
    string | null
  >(null);
  const [githubAccountConnectedOn, setGithubAccountConnectedOn] = useState<
    string | null
  >(null);

  const [newEmailAddress, setNewEmailAddress] = useState<string>("");
  const [showResetEmailAddressDialog, setShowResetEmailAddressDialog] =
    useState<boolean>(false);
  const [
    showResetEmailAddressPasswordRequest,
    setShowResetEmailAddressPasswordRequest,
  ] = useState<boolean>(false);

  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState<boolean>(false);

  const [showPasswordForLoginForm, setShowPasswordForLoginForm] =
    useState<boolean>(false);
  const [
    showPasswordConfirmationForLoginForm,
    setShowPasswordConfirmationForLoginForm,
  ] = useState<boolean>(false);
  const [newEmailAddressForLoginForm, setNewEmailAddressForLoginForm] =
    useState<string | null>("");

  useEffect(() => {
    if (session === null) {
      router.push("/");
    } else if (session) {
      const checkProfileState = async () => {
        const url = "/api/profile/get-profile-state";
        let getProfileStateResponse: Response = new Response();

        try {
          getProfileStateResponse = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (getProfileStateResponse?.status !== 200) {
            throw new Error(
              `Get profile state response status: ${getProfileStateResponse?.status}`,
            );
          }

          const profileStateData = await getProfileStateResponse.json();

          if (profileStateData?.profileState?.emailVerified === true) {
            setEmailVerified(true);
          } else if (profileStateData?.profileState?.emailVerified === false) {
            setEmailVerified(false);
          } else {
            router.push("/profile-error");
          }

          if (profileStateData?.profileState?.passwordPresent === true) {
            setPasswordPresent(true);
          } else if (
            profileStateData?.profileState?.passwordPresent === false
          ) {
            setPasswordPresent(false);
          } else {
            router.push("/profile-error");
          }

          if (profileStateData?.profileState?.githubAccountLinked === true) {
            setGithubAccountLinked(true);
            setGithubAccountUsername(
              profileStateData?.profileState?.githubAccountUsername,
            );
            setGithubAccountConnectedOn(
              profileStateData?.profileState?.githubAccountConnectedOn,
            );
          } else if (
            profileStateData?.profileState?.githubAccountLinked === false
          ) {
            setGithubAccountLinked(false);
          } else {
            router.push("/profile-error");
          }

          if (
            profileStateData?.profileState?.emailVerified === false &&
            profileStateData?.profileState?.passwordPresent === true &&
            profileStateData?.profileState?.githubAccountLinked === true
          ) {
            setNewEmailAddressForLoginForm(
              profileStateData?.profileState
                ?.addEmailAddressAndPasswordLoginEmail,
            );
          }
        } catch (err) {
          // TODO
          // Don't log the err value, do something else with it to avoid deployment error
          console.error(err);
          router.push("/profile-error");
        }
      };

      checkProfileState();

      return () => { };
    }
  }, [session, router]);

  const resetEmailAddressForm = useForm<ResetEmailAddressFormValues>({
    resolver: zodResolver(resetEmailAddressSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetEmailAddressPasswordRequestForm =
    useForm<PasswordRequestFormValues>({
      resolver: zodResolver(passwordRequestSchema),
      defaultValues: {
        password: "",
      },
    });

  const updatePasswordForm = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordFromProfileSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const addEmailAddressAndPasswordLoginForm =
    useForm<AddEmailAddressAndPasswordLoginFormValues>({
      resolver: zodResolver(addEmailAddressAndPasswordLoginFromProfileSchema),
      defaultValues: {
        email: "",
        password: "",
        passwordConfirmation: "",
      },
    });

  const {
    watch: watchUpdatePasswordForm,
    setError: setErrorUpdatePasswordForm,
    clearErrors: clearErrorsUpdatePasswordForm,
    formState: { isSubmitted: isSubmittedUpdatePasswordForm },
  } = updatePasswordForm;

  const watchUpdatePasswordFormPassword = watchUpdatePasswordForm("password");
  const watchUpdatePasswordFormPasswordConfirmation = watchUpdatePasswordForm(
    "passwordConfirmation",
  );

  usePasswordConfirmation(
    isSubmittedUpdatePasswordForm,
    watchUpdatePasswordFormPassword,
    watchUpdatePasswordFormPasswordConfirmation,
    setErrorUpdatePasswordForm,
    clearErrorsUpdatePasswordForm,
    "passwordConfirmation",
  );

  const {
    watch: watchAddEmailAddressAndPasswordLoginForm,
    setError: setErrorAddEmailAddressAndPasswordLoginForm,
    clearErrors: clearErrorAddEmailAddressAndPasswordLoginForm,
    formState: { isSubmitted: isSubmittedAddEmailAddressAndPasswordLoginForm },
  } = addEmailAddressAndPasswordLoginForm;

  const watchAddEmailAddressAndPasswordLoginFormPassword =
    watchAddEmailAddressAndPasswordLoginForm("password");
  const watchAddEmailAddressAndPasswordLoginFormPasswordConfirmation =
    watchAddEmailAddressAndPasswordLoginForm("passwordConfirmation");

  usePasswordConfirmation(
    isSubmittedAddEmailAddressAndPasswordLoginForm,
    watchAddEmailAddressAndPasswordLoginFormPassword,
    watchAddEmailAddressAndPasswordLoginFormPasswordConfirmation,
    setErrorAddEmailAddressAndPasswordLoginForm,
    clearErrorAddEmailAddressAndPasswordLoginForm,
    "passwordConfirmation",
  );

  async function onResetEmailAddressSubmit(
    values: ResetEmailAddressFormValues,
  ) {
    setIsLoading(true);
    const { email } = values;

    if (session?.user?.email) {
      setNewEmailAddress(email);
      setShowResetEmailAddressDialog(true);
    } else {
      resetEmailAddressForm.reset();
      toast.error("Failed to reset email address");
    }

    setIsLoading(false);
  }

  async function onResetEmailAddressPasswordRequestSubmit(
    values: PasswordRequestFormValues,
  ) {
    setIsLoading(true);
    const { password } = values;

    if (session?.user?.email) {
      const url = "/api/auth/reset-email-address";
      let resetEmailAddressResponse: Response = new Response();

      try {
        resetEmailAddressResponse = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: newEmailAddress,
            password,
          }),
        });

        if (resetEmailAddressResponse?.status !== 200) {
          throw new Error(
            `Reset email address response status: ${resetEmailAddressResponse?.status}`,
          );
        }

        toast.success("Sent email address reset instructions");
      } catch (err) {
        // TODO
        // Don't log the err value, do something else with it to avoid deployment error
        console.error(err);
        toast.error("Failed to send email address reset instructions");
      } finally {
        setNewEmailAddress("");
        setIsLoading(false);
        setShowResetEmailAddressDialog(false);
      }
    } else {
      setNewEmailAddress("");
      setIsLoading(false);
      setShowResetEmailAddressDialog(false);
      toast.error("Failed to send email address reset instructions");
    }

    resetEmailAddressForm.reset();
    resetEmailAddressPasswordRequestForm.reset();
  }

  async function onResetEmailAddressPasswordRequestClose() {
    setNewEmailAddress("");
    setShowResetEmailAddressDialog(false);
    resetEmailAddressForm.reset();
    resetEmailAddressPasswordRequestForm.reset();
  }

  async function onUpdatePasswordSubmit(values: UpdatePasswordFormValues) {
    setIsLoading(true);
    setShowCurrentPassword(false);
    setShowPassword(false);
    setShowPasswordConfirmation(false);

    const { currentPassword, password, passwordConfirmation } = values;

    if (session?.user?.email) {
      const url = "/api/auth/update-password-from-profile";
      let updatePasswordFromProfileResponse: Response = new Response();

      try {
        updatePasswordFromProfileResponse = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            password,
            passwordConfirmation,
          }),
        });

        if (updatePasswordFromProfileResponse?.status !== 200) {
          throw new Error(
            `Update password from profile response status: ${updatePasswordFromProfileResponse?.status}`,
          );
        }

        toast.success("Password update successful");
      } catch (err) {
        // TODO
        // Don't log the err value, do something else with it to avoid deployment error
        console.error(err);
        toast.error("Failed to update password");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      toast.error("Failed to update password");
    }

    updatePasswordForm.reset();
  }

  async function onAddEmailAddressAndPasswordLoginSubmit(
    values: AddEmailAddressAndPasswordLoginFormValues,
  ) {
    setIsLoading(true);
    setShowPasswordForLoginForm(false);
    setShowPasswordConfirmationForLoginForm(false);

    const { email, password, passwordConfirmation } = values;

    if (session?.user?.email) {
      const url = "/api/auth/add-email-address-and-password-login-instructions";
      let addEmailAddressAndPasswordLoginInstructionsResponse: Response =
        new Response();

      try {
        addEmailAddressAndPasswordLoginInstructionsResponse = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            passwordConfirmation,
          }),
        });

        if (
          addEmailAddressAndPasswordLoginInstructionsResponse?.status !== 200
        ) {
          throw new Error(
            `Add email address and password login instructions response status: ${addEmailAddressAndPasswordLoginInstructionsResponse?.status}`,
          );
        }

        setPasswordPresent(true);
        setNewEmailAddressForLoginForm(email);
        toast.success("Email login instructions sent");
      } catch (err) {
        // TODO
        // Don't log the err value, do something else with it to avoid deployment error
        console.error(err);
        toast.error("Failed to send email login instructions");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      toast.error("Failed to send email login instructions");
    }

    addEmailAddressAndPasswordLoginForm.reset();
  }

  async function handleLinkOAuth(provider: SupportedOAuthProvider) {
    setIsLoading(true);

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

        const oAuthSignInResponse = await signIn(provider);

        if (oAuthSignInResponse !== undefined && !oAuthSignInResponse?.ok) {
          throw new Error(
            `OAuth sign in response status: ${oAuthSignInResponse?.status}`,
          );
        }
      } catch (err) {
        // TODO
        // Don't log the err value, do something else with it to avoid deployment error
        console.error(err);
        setIsLoading(false);
        toast.error("Failed to link account");
      }
    } else {
      setIsLoading(false);
      toast.error("Failed to link account");
    }
  }

  async function handleUnlinkOAuth() {
    setIsLoading(true);

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

          setGithubAccountLinked(false);
          setGithubAccountUsername(null);
          setGithubAccountConnectedOn(null);
          toast.success("Account unlink successful");
        } catch (err) {
          // TODO
          // Don't log the err value, do something else with it to avoid deployment error
          console.error(err);
          toast.error("Failed to unlink account");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        toast.error("User must have at least 1 identity after unlinking");
      }
    } else {
      setIsLoading(false);
      toast.error("Failed to unlink account");
    }
  }

  return (
    <div className="flex w-full flex-col min-[421px]:w-[85%] sm:w-[80%] md:w-3/4">
      {session === undefined && (
        <FullPageLoadingSpinner loadingText={"Loading..."} />
      )}
      {session === null && (
        <FullPageLoadingSpinner loadingText={"Redirecting to homepage..."} />
      )}
      {session && (
        <>
          {(() => {
            if (
              emailVerified === null ||
              passwordPresent === null ||
              githubAccountLinked === null
            ) {
              return (
                <FullPageLoadingSpinner loadingText={"Loading profile..."} />
              );
            }
            if (
              emailVerified &&
              passwordPresent &&
              githubAccountLinked !== null
            ) {
              return (
                <>
                  <ProfileHeading />
                  <EmailAddressCard
                    email={session?.user?.email}
                    emailVerified={emailVerified}
                    passwordPresent={passwordPresent}
                  />
                  <Card className="mb-6 flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 sm:mb-7 md:mb-8 md:px-2 md:py-2">
                    <CardHeader className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
                      <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
                        Reset Email Address
                      </CardTitle>
                      <CardDescription>
                        Reset your login and notification email address.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex px-4 pb-4 sm:px-6 sm:pb-6">
                      <Form {...resetEmailAddressForm}>
                        <form
                          className="flex w-full flex-col gap-5 sm:gap-6"
                          onSubmit={resetEmailAddressForm.handleSubmit(
                            onResetEmailAddressSubmit,
                          )}
                        >
                          <FormField
                            control={resetEmailAddressForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email address</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="email"
                                    className="w-full text-sm focus-visible:ring-ringPrimary sm:max-w-[376px] sm:text-base md:text-base"
                                    disabled={isLoading}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="submit"
                            className="w-full focus-visible:ring-ringPrimary sm:max-w-[182px]"
                            disabled={isLoading}
                          >
                            Reset email address
                          </Button>
                        </form>
                      </Form>
                      <Dialog
                        open={showResetEmailAddressDialog}
                        onOpenChange={onResetEmailAddressPasswordRequestClose}
                      >
                        <DialogContent className="w-3/4 max-[430px]:p-5">
                          <DialogHeader>
                            <DialogTitle className="max-[430px]:text-base">
                              Reset email address
                            </DialogTitle>
                            <DialogDescription className="max-[430px]:text-xs">
                              Enter your password to receive an email with
                              instructions on how to reset your email address.
                            </DialogDescription>
                          </DialogHeader>
                          <Form {...resetEmailAddressPasswordRequestForm}>
                            <form
                              className="flex w-full flex-col gap-5 sm:gap-6"
                              onSubmit={resetEmailAddressPasswordRequestForm.handleSubmit(
                                onResetEmailAddressPasswordRequestSubmit,
                              )}
                            >
                              <FormField
                                control={
                                  resetEmailAddressPasswordRequestForm.control
                                }
                                name="password"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                      <div className="relative w-full sm:max-w-[376px]">
                                        <Input
                                          {...field}
                                          type={
                                            showResetEmailAddressPasswordRequest
                                              ? "text"
                                              : "password"
                                          }
                                          className={
                                            "hide-password-toggle pr-10 text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
                                          }
                                          autoComplete="current-password"
                                          disabled={isLoading}
                                        />
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                          onClick={() =>
                                            setShowResetEmailAddressPasswordRequest(
                                              (prev) => !prev,
                                            )
                                          }
                                          disabled={isLoading}
                                        >
                                          {showResetEmailAddressPasswordRequest ? (
                                            <EyeOffIcon aria-hidden="true" />
                                          ) : (
                                            <EyeIcon aria-hidden="true" />
                                          )}
                                          <span className="sr-only">
                                            {showResetEmailAddressPasswordRequest
                                              ? "Hide password"
                                              : "Show password"}
                                          </span>
                                        </Button>
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <DialogFooter>
                                <Button
                                  type="submit"
                                  className="mt-4 focus-visible:ring-ringPrimary max-[430px]:h-8 max-[430px]:px-3 max-[430px]:py-1.5"
                                  disabled={isLoading}
                                >
                                  Send reset instructions
                                </Button>
                              </DialogFooter>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                  <Card className="mb-6 flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 sm:mb-7 md:mb-8 md:px-2 md:py-2">
                    <CardHeader className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
                      <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
                        Update Password
                      </CardTitle>
                      <CardDescription>
                        Update your login password.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex px-4 pb-4 sm:px-6 sm:pb-6">
                      <Form {...updatePasswordForm}>
                        <form
                          className="flex w-full flex-col gap-5 sm:gap-6"
                          onSubmit={updatePasswordForm.handleSubmit(
                            onUpdatePasswordSubmit,
                          )}
                        >
                          <FormField
                            control={updatePasswordForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                  <div className="relative w-full sm:max-w-[376px]">
                                    <Input
                                      {...field}
                                      type={
                                        showCurrentPassword
                                          ? "text"
                                          : "password"
                                      }
                                      className={
                                        "hide-password-toggle pr-10 text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
                                      }
                                      autoComplete="current-password"
                                      disabled={isLoading}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                      onClick={() =>
                                        setShowCurrentPassword((prev) => !prev)
                                      }
                                      disabled={isLoading}
                                    >
                                      {showCurrentPassword ? (
                                        <EyeOffIcon aria-hidden="true" />
                                      ) : (
                                        <EyeIcon aria-hidden="true" />
                                      )}
                                      <span className="sr-only">
                                        {showCurrentPassword
                                          ? "Hide password"
                                          : "Show password"}
                                      </span>
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={updatePasswordForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <div className="relative w-full sm:max-w-[376px]">
                                    <Input
                                      {...field}
                                      type={showPassword ? "text" : "password"}
                                      className={
                                        "hide-password-toggle pr-10 text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
                                      }
                                      autoComplete="new-password"
                                      disabled={isLoading}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                      onClick={() =>
                                        setShowPassword((prev) => !prev)
                                      }
                                      disabled={isLoading}
                                    >
                                      {showPassword ? (
                                        <EyeOffIcon aria-hidden="true" />
                                      ) : (
                                        <EyeIcon aria-hidden="true" />
                                      )}
                                      <span className="sr-only">
                                        {showPassword
                                          ? "Hide password"
                                          : "Show password"}
                                      </span>
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={updatePasswordForm.control}
                            name="passwordConfirmation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm new password</FormLabel>
                                <FormControl>
                                  <div className="relative w-full sm:max-w-[376px]">
                                    <Input
                                      {...field}
                                      type={
                                        showPasswordConfirmation
                                          ? "text"
                                          : "password"
                                      }
                                      className={
                                        "hide-password-toggle pr-10 text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
                                      }
                                      autoComplete="new-password"
                                      disabled={isLoading}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                      onClick={() =>
                                        setShowPasswordConfirmation(
                                          (prev) => !prev,
                                        )
                                      }
                                      disabled={isLoading}
                                    >
                                      {showPasswordConfirmation ? (
                                        <EyeOffIcon aria-hidden="true" />
                                      ) : (
                                        <EyeIcon aria-hidden="true" />
                                      )}
                                      <span className="sr-only">
                                        {showPasswordConfirmation
                                          ? "Hide password"
                                          : "Show password"}
                                      </span>
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="submit"
                            className="w-full focus-visible:ring-ringPrimary sm:max-w-[156px]"
                            disabled={isLoading}
                          >
                            Update password
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                  <Card className="mb-6 flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 sm:mb-7 md:mb-8 md:px-2 md:py-2">
                    <CardHeader className="px-4 pb-7 pt-4 sm:px-6 sm:pt-6">
                      <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
                        Authentication
                      </CardTitle>
                      <CardDescription>
                        Link your account to third-party authentication
                        providers.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex px-4 pb-4 sm:px-6 sm:pb-6">
                      {!githubAccountLinked && (
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
                                <Github
                                  size={PROFILE_ICON_BASE_SIZE}
                                  aria-hidden="true"
                                />
                                <span className="sr-only">{"GitHub"}</span>
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
                                  Connected on{" "}
                                  {formatDate(githubAccountConnectedOn)}
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
                                  <Ellipsis
                                    aria-hidden="true"
                                    className="text-foreground"
                                  />
                                  <span className="sr-only">
                                    Show OAuth account options
                                  </span>
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
                                      <Trash
                                        aria-hidden="true"
                                        className="text-foreground"
                                      />
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
                  <DeleteAccountCard
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </>
              );
            } else if (
              emailVerified === false &&
              passwordPresent === false &&
              githubAccountLinked
            ) {
              return (
                <>
                  <ProfileHeading />
                  <EmailAddressCard
                    email={session?.user?.email}
                    emailVerified={emailVerified}
                    passwordPresent={passwordPresent}
                    githubAccountLinked={githubAccountLinked}
                  />
                  <Card className="mb-6 flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 sm:mb-7 md:mb-8 md:px-2 md:py-2">
                    <CardHeader className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
                      <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
                        Add Email Login
                      </CardTitle>
                      <CardDescription>
                        Add the option to login using an email address and
                        password.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex px-4 pb-4 sm:px-6 sm:pb-6">
                      <Form {...addEmailAddressAndPasswordLoginForm}>
                        <form
                          className="flex w-full flex-col gap-5 sm:gap-6"
                          onSubmit={addEmailAddressAndPasswordLoginForm.handleSubmit(
                            onAddEmailAddressAndPasswordLoginSubmit,
                          )}
                        >
                          <FormField
                            control={
                              addEmailAddressAndPasswordLoginForm.control
                            }
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email address</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="email"
                                    className="w-full text-sm focus-visible:ring-ringPrimary sm:max-w-[376px] sm:text-base md:text-base"
                                    disabled={isLoading}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={
                              addEmailAddressAndPasswordLoginForm.control
                            }
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <div className="relative w-full sm:max-w-[376px]">
                                    <Input
                                      {...field}
                                      type={
                                        showPasswordForLoginForm
                                          ? "text"
                                          : "password"
                                      }
                                      className={
                                        "hide-password-toggle pr-10 text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
                                      }
                                      autoComplete="new-password"
                                      disabled={isLoading}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                      onClick={() =>
                                        setShowPasswordForLoginForm(
                                          (prev) => !prev,
                                        )
                                      }
                                      disabled={isLoading}
                                    >
                                      {showPasswordForLoginForm ? (
                                        <EyeOffIcon aria-hidden="true" />
                                      ) : (
                                        <EyeIcon aria-hidden="true" />
                                      )}
                                      <span className="sr-only">
                                        {showPasswordForLoginForm
                                          ? "Hide password"
                                          : "Show password"}
                                      </span>
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={
                              addEmailAddressAndPasswordLoginForm.control
                            }
                            name="passwordConfirmation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl>
                                  <div className="relative w-full sm:max-w-[376px]">
                                    <Input
                                      {...field}
                                      type={
                                        showPasswordConfirmationForLoginForm
                                          ? "text"
                                          : "password"
                                      }
                                      className={
                                        "hide-password-toggle pr-10 text-sm focus-visible:ring-ringPrimary sm:text-base md:text-base"
                                      }
                                      autoComplete="new-password"
                                      disabled={isLoading}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                      onClick={() =>
                                        setShowPasswordConfirmationForLoginForm(
                                          (prev) => !prev,
                                        )
                                      }
                                      disabled={isLoading}
                                    >
                                      {showPasswordConfirmationForLoginForm ? (
                                        <EyeOffIcon aria-hidden="true" />
                                      ) : (
                                        <EyeIcon aria-hidden="true" />
                                      )}
                                      <span className="sr-only">
                                        {showPasswordConfirmationForLoginForm
                                          ? "Hide password"
                                          : "Show password"}
                                      </span>
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="submit"
                            className="w-full focus-visible:ring-ringPrimary sm:max-w-[182px]"
                            disabled={isLoading}
                          >
                            Add email login
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                  <Card className="mb-6 flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 sm:mb-7 md:mb-8 md:px-2 md:py-2">
                    <CardHeader className="px-4 pb-7 pt-4 sm:px-6 sm:pt-6">
                      <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
                        Authentication
                      </CardTitle>
                      <CardDescription>
                        Link your account to third-party authentication
                        providers.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex px-4 pb-4 sm:px-6 sm:pb-6">
                      <div className="flex w-full flex-col gap-5 sm:gap-6">
                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                          <div className="flex grow flex-wrap items-center justify-between gap-1.5">
                            <div className="mr-7 flex items-center gap-2">
                              <Github
                                size={PROFILE_ICON_BASE_SIZE}
                                aria-hidden="true"
                              />
                              <span className="sr-only">{"GitHub"}</span>
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
                                Connected on{" "}
                                {formatDate(githubAccountConnectedOn)}
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
                                <Ellipsis
                                  aria-hidden="true"
                                  className="text-foreground"
                                />
                                <span className="sr-only">
                                  Show OAuth account options
                                </span>
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
                                    <Trash
                                      aria-hidden="true"
                                      className="text-foreground"
                                    />
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
                    </CardContent>
                  </Card>
                  <DeleteAccountCard
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </>
              );
            } else if (
              emailVerified === false &&
              passwordPresent &&
              githubAccountLinked
            ) {
              return (
                <>
                  <ProfileHeading />
                  <EmailAddressCard
                    email={session?.user?.email}
                    emailVerified={emailVerified}
                    passwordPresent={passwordPresent}
                    githubAccountLinked={githubAccountLinked}
                  />
                  <AddEmailAddressAndPasswordLoginPendingCard
                    newEmail={newEmailAddressForLoginForm}
                  />
                  <Card className="mb-6 flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 sm:mb-7 md:mb-8 md:px-2 md:py-2">
                    <CardHeader className="px-4 pb-7 pt-4 sm:px-6 sm:pt-6">
                      <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
                        Authentication
                      </CardTitle>
                      <CardDescription>
                        Link your account to third-party authentication
                        providers.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex px-4 pb-4 sm:px-6 sm:pb-6">
                      <div className="flex w-full flex-col gap-5 sm:gap-6">
                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                          <div className="flex grow flex-wrap items-center justify-between gap-1.5">
                            <div className="mr-7 flex items-center gap-2">
                              <Github
                                size={PROFILE_ICON_BASE_SIZE}
                                aria-hidden="true"
                              />
                              <span className="sr-only">{"GitHub"}</span>
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
                                Connected on{" "}
                                {formatDate(githubAccountConnectedOn)}
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
                                <Ellipsis
                                  aria-hidden="true"
                                  className="text-foreground"
                                />
                                <span className="sr-only">
                                  Show OAuth account options
                                </span>
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
                                    <Trash
                                      aria-hidden="true"
                                      className="text-foreground"
                                    />
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
                    </CardContent>
                  </Card>
                  <DeleteAccountCard
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </>
              );
            } else {
              router.push("/profile-error");
            }
          })()}
        </>
      )}
    </div>
  );
}
