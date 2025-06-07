import { Dispatch, SetStateAction, useState } from "react";

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
import { useEmailAddressConfirmation } from "~/lib/auth/hooks/useEmailAddressConfirmation";
import {
  passwordRequestSchema,
  resetEmailAddressSchema,
} from "~/lib/auth/validation/schemas";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface ProfileResetEmailAddressCardProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

type ResetEmailAddressFormValues = z.infer<typeof resetEmailAddressSchema>;
type PasswordRequestFormValues = z.infer<typeof passwordRequestSchema>;

export function ProfileResetEmailAddressCard({
  isLoading,
  setIsLoading,
}: ProfileResetEmailAddressCardProps) {
  const { data: session } = useSession();

  const [newEmailAddress, setNewEmailAddress] = useState<string>("");
  const [newEmailAddressConfirmation, setNewEmailAddressConfirmation] =
    useState<string>("");
  const [showResetEmailAddressDialog, setShowResetEmailAddressDialog] =
    useState<boolean>(false);
  const [
    showResetEmailAddressPasswordRequest,
    setShowResetEmailAddressPasswordRequest,
  ] = useState<boolean>(false);

  const handleSetIsLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const resetEmailAddressForm = useForm<ResetEmailAddressFormValues>({
    resolver: zodResolver(resetEmailAddressSchema),
    defaultValues: {
      email: "",
      emailConfirmation: "",
    },
  });

  const resetEmailAddressPasswordRequestForm =
    useForm<PasswordRequestFormValues>({
      resolver: zodResolver(passwordRequestSchema),
      defaultValues: {
        password: "",
      },
    });

  const {
    watch: watchResetEmailAddressForm,
    setError: setErrorResetEmailAddressForm,
    clearErrors: clearErrorsResetEmailAddressForm,
    formState: { isSubmitted: isSubmittedResetEmailAddressForm },
  } = resetEmailAddressForm;

  const watchResetEmailAddressFormEmail = watchResetEmailAddressForm("email");
  const watchResetEmailAddressFormEmailConfirmation =
    watchResetEmailAddressForm("emailConfirmation");

  useEmailAddressConfirmation(
    isSubmittedResetEmailAddressForm,
    watchResetEmailAddressFormEmail,
    watchResetEmailAddressFormEmailConfirmation,
    setErrorResetEmailAddressForm,
    clearErrorsResetEmailAddressForm,
    "emailConfirmation",
  );

  async function onResetEmailAddressSubmit(
    values: ResetEmailAddressFormValues,
  ) {
    handleSetIsLoading(true);
    const { email, emailConfirmation } = values;

    if (session?.user?.email) {
      setNewEmailAddress(email);
      setNewEmailAddressConfirmation(emailConfirmation);
      setShowResetEmailAddressDialog(true);
    } else {
      resetEmailAddressForm.reset();
      toast.error("Failed to reset email address");
    }

    handleSetIsLoading(false);
  }

  async function onResetEmailAddressPasswordRequestSubmit(
    values: PasswordRequestFormValues,
  ) {
    handleSetIsLoading(true);
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
            emailConfirmation: newEmailAddressConfirmation,
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
        setNewEmailAddressConfirmation("");
        handleSetIsLoading(false);
        setShowResetEmailAddressDialog(false);
      }
    } else {
      setNewEmailAddress("");
      setNewEmailAddressConfirmation("");
      handleSetIsLoading(false);
      setShowResetEmailAddressDialog(false);
      toast.error("Failed to send email address reset instructions");
    }

    resetEmailAddressForm.reset();
    resetEmailAddressPasswordRequestForm.reset();
  }

  async function onResetEmailAddressPasswordRequestClose() {
    setNewEmailAddress("");
    setNewEmailAddressConfirmation("");
    setShowResetEmailAddressDialog(false);
    resetEmailAddressForm.reset();
    resetEmailAddressPasswordRequestForm.reset();
  }

  return (
    /* TODO */
    /* Show pending email */
    /* Remove old reset tokens if pending email is changed */
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
            <FormField
              control={resetEmailAddressForm.control}
              name="emailConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm email address</FormLabel>
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
                Enter your password to receive an email with instructions on how
                to reset your email address.
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
  );
}
