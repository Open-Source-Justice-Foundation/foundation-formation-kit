"use client";

import { useState } from "react";

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
import { usePasswordConfirmation } from "~/lib/auth/hooks/usePasswordConfirmation";
import {
  passwordRequestSchema,
  resetEmailAddressSchema,
  updatePasswordFromProfileSchema,
} from "~/lib/auth/validation/schemas";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ResetEmailAddressFormValues = z.infer<typeof resetEmailAddressSchema>;
type PasswordRequestFormValues = z.infer<typeof passwordRequestSchema>;
type UpdatePasswordFormValues = z.infer<typeof updatePasswordFromProfileSchema>;

export default function ProfilePage() {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const {
    watch,
    setError,
    clearErrors,
    formState: { isSubmitted },
  } = updatePasswordForm;

  const watchPassword = watch("password");
  const watchPasswordConfirmation = watch("passwordConfirmation");

  usePasswordConfirmation(
    isSubmitted,
    watchPassword,
    watchPasswordConfirmation,
    setError,
    clearErrors,
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

        if (resetEmailAddressResponse.status !== 200) {
          throw new Error(
            `Reset email address response status: ${resetEmailAddressResponse.status}`,
          );
        }
      } catch (err) {
        // TODO
        // Don't log the err value, do something else with it to avoid deployment error
        console.error(err);
        toast.error("Failed to send email address reset instructions");
      } finally {
        setIsLoading(false);
        setShowResetEmailAddressDialog(false);
      }
    } else {
      toast.error("Failed to send email address reset instructions");
      setIsLoading(false);
      setShowResetEmailAddressDialog(false);
    }

    resetEmailAddressForm.reset();
    resetEmailAddressPasswordRequestForm.reset();
  }

  async function onResetEmailAddressPasswordRequestClose() {
    resetEmailAddressForm.reset();
    resetEmailAddressPasswordRequestForm.reset();
    setShowResetEmailAddressDialog(false);
  }

  async function onUpdatePasswordSubmit(values: UpdatePasswordFormValues) {
    setIsLoading(true);
    setShowCurrentPassword(false);
    setShowPassword(false);
    setShowPasswordConfirmation(false);

    const { currentPassword, password, passwordConfirmation } = values;

    const url = "/api/auth/update-password-from-profile";
    let updatePasswordResponse: Response = new Response();

    try {
      updatePasswordResponse = await fetch(url, {
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

      if (updatePasswordResponse.status !== 200) {
        throw new Error(
          `Update password response status: ${updatePasswordResponse.status}`,
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

    updatePasswordForm.reset();
  }

  return (
    <div className="flex w-full flex-col min-[421px]:w-[85%] sm:w-[80%] md:w-3/4">
      <h1 className="mb-6 self-start text-xl font-medium min-[421px]:text-2xl sm:mb-7 sm:text-[1.75rem] md:mb-8 md:text-3xl">
        Profile
      </h1>
      <Card className="mb-6 flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 sm:mb-7 md:mb-8 md:px-2 md:py-2">
        <CardHeader className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
          <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
            Email Address
          </CardTitle>
          <CardDescription>
            🚧 Under construction, accounts may be deleted and not work 🚧
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
                  Enter your password to receive an email with instructions on
                  how to reset your email address.
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
                    control={resetEmailAddressPasswordRequestForm.control}
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
      <Card className="flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 md:px-2 md:py-2">
        <CardHeader className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
          <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
            Password
          </CardTitle>
          <CardDescription>
            🚧 Under construction, accounts may be deleted and not work 🚧
          </CardDescription>
        </CardHeader>
        <CardContent className="flex px-4 pb-4 sm:px-6 sm:pb-6">
          <Form {...updatePasswordForm}>
            <form
              className="flex w-full flex-col gap-5 sm:gap-6"
              onSubmit={updatePasswordForm.handleSubmit(onUpdatePasswordSubmit)}
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
                          type={showCurrentPassword ? "text" : "password"}
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
                          onClick={() => setShowPassword((prev) => !prev)}
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOffIcon aria-hidden="true" />
                          ) : (
                            <EyeIcon aria-hidden="true" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
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
                          type={showPasswordConfirmation ? "text" : "password"}
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
                            setShowPasswordConfirmation((prev) => !prev)
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
    </div>
  );
}
