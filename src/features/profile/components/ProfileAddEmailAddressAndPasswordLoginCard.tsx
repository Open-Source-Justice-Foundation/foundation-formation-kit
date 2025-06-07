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
import { useEmailAddressConfirmation } from "~/lib/auth/hooks/useEmailAddressConfirmation";
import { usePasswordConfirmation } from "~/lib/auth/hooks/usePasswordConfirmation";
import { addEmailAddressAndPasswordLoginFromProfileSchema } from "~/lib/auth/validation/schemas";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface ProfileAddEmailAddressAndPasswordLoginCardProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setPasswordPresent: Dispatch<SetStateAction<boolean | null>>;
  setNewEmailAddressForLoginForm: Dispatch<SetStateAction<string | null>>;
}

type AddEmailAddressAndPasswordLoginFormValues = z.infer<
  typeof addEmailAddressAndPasswordLoginFromProfileSchema
>;

export function ProfileAddEmailAddressAndPasswordLoginCard({
  isLoading,
  setIsLoading,
  setPasswordPresent,
  setNewEmailAddressForLoginForm,
}: ProfileAddEmailAddressAndPasswordLoginCardProps) {
  const { data: session } = useSession();

  const [showPasswordForLoginForm, setShowPasswordForLoginForm] =
    useState<boolean>(false);
  const [
    showPasswordConfirmationForLoginForm,
    setShowPasswordConfirmationForLoginForm,
  ] = useState<boolean>(false);

  const handleSetIsLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const handleSetPasswordPresent = (value: boolean) => {
    setPasswordPresent(value);
  };

  const handleSetNewEmailAddressForLoginForm = (value: string) => {
    setNewEmailAddressForLoginForm(value);
  };

  const addEmailAddressAndPasswordLoginForm =
    useForm<AddEmailAddressAndPasswordLoginFormValues>({
      resolver: zodResolver(addEmailAddressAndPasswordLoginFromProfileSchema),
      defaultValues: {
        email: "",
        emailConfirmation: "",
        password: "",
        passwordConfirmation: "",
      },
    });

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

  const watchAddEmailAddressAndPasswordLoginFormEmail =
    watchAddEmailAddressAndPasswordLoginForm("email");
  const watchAddEmailAddressAndPasswordLoginFormEmailConfirmation =
    watchAddEmailAddressAndPasswordLoginForm("emailConfirmation");

  usePasswordConfirmation(
    isSubmittedAddEmailAddressAndPasswordLoginForm,
    watchAddEmailAddressAndPasswordLoginFormPassword,
    watchAddEmailAddressAndPasswordLoginFormPasswordConfirmation,
    setErrorAddEmailAddressAndPasswordLoginForm,
    clearErrorAddEmailAddressAndPasswordLoginForm,
    "passwordConfirmation",
  );

  useEmailAddressConfirmation(
    isSubmittedAddEmailAddressAndPasswordLoginForm,
    watchAddEmailAddressAndPasswordLoginFormEmail,
    watchAddEmailAddressAndPasswordLoginFormEmailConfirmation,
    setErrorAddEmailAddressAndPasswordLoginForm,
    clearErrorAddEmailAddressAndPasswordLoginForm,
    "emailConfirmation",
  );

  async function onAddEmailAddressAndPasswordLoginSubmit(
    values: AddEmailAddressAndPasswordLoginFormValues,
  ) {
    handleSetIsLoading(true);
    setShowPasswordForLoginForm(false);
    setShowPasswordConfirmationForLoginForm(false);

    const { email, emailConfirmation, password, passwordConfirmation } = values;

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
            emailConfirmation,
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

        handleSetPasswordPresent(true);
        handleSetNewEmailAddressForLoginForm(email);
        toast.success("Email login instructions sent");
      } catch (err) {
        // TODO
        // Don't log the err value, do something else with it to avoid deployment error
        console.error(err);
        toast.error("Failed to send email login instructions");
      } finally {
        handleSetIsLoading(false);
      }
    } else {
      handleSetIsLoading(false);
      toast.error("Failed to send email login instructions");
    }

    addEmailAddressAndPasswordLoginForm.reset();
  }

  return (
    <Card className="mb-6 flex w-full flex-col min-[421px]:px-1 min-[421px]:py-1 sm:mb-7 md:mb-8 md:px-2 md:py-2">
      <CardHeader className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
        <CardTitle className="text-base min-[421px]:text-lg sm:text-xl md:text-2xl">
          Add Email Login
        </CardTitle>
        <CardDescription>
          Add the option to login using an email address and password.
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
              control={addEmailAddressAndPasswordLoginForm.control}
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
              control={addEmailAddressAndPasswordLoginForm.control}
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
            <FormField
              control={addEmailAddressAndPasswordLoginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative w-full sm:max-w-[376px]">
                      <Input
                        {...field}
                        type={showPasswordForLoginForm ? "text" : "password"}
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
                          setShowPasswordForLoginForm((prev) => !prev)
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
              control={addEmailAddressAndPasswordLoginForm.control}
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
  );
}
