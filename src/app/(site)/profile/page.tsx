"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { Spinner } from "~/components/ui/spinner";
import { usePasswordConfirmation } from "~/lib/auth/hooks/usePasswordConfirmation";
import { SupportedOAuthProvider } from "~/lib/auth/types";
import {
  addEmailAddressAndPasswordLoginFromProfileSchema,
  passwordRequestSchema,
  resetEmailAddressSchema,
  updatePasswordFromProfileSchema,
} from "~/lib/auth/validation/schemas";
import { EyeIcon, EyeOffIcon } from "lucide-react";
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
          } else if (
            profileStateData?.profileState?.githubAccountLinked === false
          ) {
            setGithubAccountLinked(false);
          } else {
            router.push("/profile-error");
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

  async function handleUnlinkOAuth(provider: SupportedOAuthProvider) {
    setIsLoading(true);

    toast.error(`Unlinking ${provider} OAuth account under construction...`);

    setIsLoading(false);
  }

  return (
    <div className="flex w-full flex-col min-[421px]:w-[85%] sm:w-[80%] md:w-3/4">
      {session === undefined && (
        <Spinner className="size-6 min-[421px]:size-8 md:size-12">
          <span className="text-center text-base">Loading...</span>
        </Spinner>
      )}
      {session === null && (
        <Spinner className="size-6 min-[421px]:size-8 md:size-12">
          <span className="text-center text-base">
            Redirecting to homepage...
          </span>
        </Spinner>
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
                <Spinner className="size-6 min-[421px]:size-8 md:size-12">
                  <span className="text-center text-base">
                    Loading profile...
                  </span>
                </Spinner>
              );
            }
            if (
              emailVerified &&
              passwordPresent &&
              githubAccountLinked !== null
            ) {
              return (
                <>
                  <h1 className="mb-6 self-start text-xl font-medium min-[421px]:text-2xl sm:mb-7 sm:text-[1.75rem] md:mb-8 md:text-3xl">
                    Profile
                  </h1>
                  <Card className="mb-6 flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 sm:mb-7 md:mb-8 md:px-2 md:py-2">
                    <CardHeader className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
                      <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
                        Email Address
                      </CardTitle>
                      <CardDescription>
                        🚧 Under construction, accounts may be deleted and not
                        work 🚧
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
                        Password
                      </CardTitle>
                      <CardDescription>
                        🚧 Under construction, accounts may be deleted and not
                        work 🚧
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
                    <CardHeader className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
                      <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
                        Login Methods
                      </CardTitle>
                      <CardDescription>
                        🚧 Under construction, accounts may be deleted and not
                        work 🚧
                        <br />
                        <br />
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
                        <Button
                          type="button"
                          className="w-full focus-visible:ring-ringPrimary sm:max-w-[116px]"
                          disabled={isLoading}
                          onClick={() => handleUnlinkOAuth("github")}
                        >
                          Unlink GitHub
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </>
              );
            } else if (
              emailVerified === false &&
              passwordPresent === false &&
              githubAccountLinked
            ) {
              return (
                <>
                  <h1 className="mb-6 self-start text-xl font-medium min-[421px]:text-2xl sm:mb-7 sm:text-[1.75rem] md:mb-8 md:text-3xl">
                    Profile
                  </h1>
                  <Card className="mb-6 flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 sm:mb-7 md:mb-8 md:px-2 md:py-2">
                    <CardHeader className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
                      <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
                        Email Login
                      </CardTitle>
                      <CardDescription>
                        🚧 Under construction, accounts may be deleted and not
                        work 🚧
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
                    <CardHeader className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
                      <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
                        Login Methods
                      </CardTitle>
                      <CardDescription>
                        🚧 Under construction, accounts may be deleted and not
                        work 🚧
                        <br />
                        <br />
                        Link your account to third-party authentication
                        providers.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex px-4 pb-4 sm:px-6 sm:pb-6">
                      <Button
                        type="button"
                        className="w-full focus-visible:ring-ringPrimary sm:max-w-[116px]"
                        disabled={true}
                        onClick={() => handleUnlinkOAuth("github")}
                      >
                        Unlink GitHub
                      </Button>
                    </CardContent>
                  </Card>
                </>
              );
            } else if (
              emailVerified === false &&
              passwordPresent &&
              githubAccountLinked
            ) {
              return (
                <>
                  <h1 className="mb-6 self-start text-xl font-medium min-[421px]:text-2xl sm:mb-7 sm:text-[1.75rem] md:mb-8 md:text-3xl">
                    Profile
                  </h1>
                  <Card className="mb-6 flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 sm:mb-7 md:mb-8 md:px-2 md:py-2">
                    <CardHeader className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
                      <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
                        Email Login
                      </CardTitle>
                      <CardDescription>
                        🚧 Under construction, accounts may be deleted and not
                        work 🚧
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex px-4 pb-4 sm:px-6 sm:pb-6">
                      Waiting for email verification...
                    </CardContent>
                  </Card>
                  <Card className="mb-6 flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 sm:mb-7 md:mb-8 md:px-2 md:py-2">
                    <CardHeader className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
                      <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
                        Login Methods
                      </CardTitle>
                      <CardDescription>
                        🚧 Under construction, accounts may be deleted and not
                        work 🚧
                        <br />
                        <br />
                        Link your account to third-party authentication
                        providers.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex px-4 pb-4 sm:px-6 sm:pb-6">
                      <Button
                        type="button"
                        className="w-full focus-visible:ring-ringPrimary sm:max-w-[116px]"
                        disabled={true}
                      >
                        Unlink GitHub
                      </Button>
                    </CardContent>
                  </Card>
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
