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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { usePasswordConfirmation } from "~/lib/auth/hooks/usePasswordConfirmation";
import { updatePasswordFromProfileSchema } from "~/lib/auth/validation/schemas";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface ProfileUpdatePasswordCardProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

type UpdatePasswordFormValues = z.infer<typeof updatePasswordFromProfileSchema>;

export function ProfileUpdatePasswordCard({
  isLoading,
  setIsLoading,
}: ProfileUpdatePasswordCardProps) {
  const { data: session } = useSession();

  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState<boolean>(false);

  const handleSetIsLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const updatePasswordForm = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordFromProfileSchema),
    defaultValues: {
      currentPassword: "",
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

  async function onUpdatePasswordSubmit(values: UpdatePasswordFormValues) {
    handleSetIsLoading(true);
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
        handleSetIsLoading(false);
      }
    } else {
      handleSetIsLoading(false);
      toast.error("Failed to update password");
    }

    updatePasswordForm.reset();
  }

  return (
    <Card className="mb-6 flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 sm:mb-7 md:mb-8 md:px-2 md:py-2">
      <CardHeader className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
        <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
          Update Password
        </CardTitle>
        <CardDescription>Update your login password.</CardDescription>
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
                        onClick={() => setShowCurrentPassword((prev) => !prev)}
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
  );
}
