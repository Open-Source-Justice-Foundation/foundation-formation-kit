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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  updateEmailAddressSchema,
  updatePasswordFromProfileSchema,
} from "~/lib/auth/validation/schemas";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type UpdateEmailAddressFormValues = z.infer<typeof updateEmailAddressSchema>;
type UpdatePasswordFormValues = z.infer<typeof updatePasswordFromProfileSchema>;

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState<boolean>(false);

  const updateEmailAddressForm = useForm<UpdateEmailAddressFormValues>({
    resolver: zodResolver(updateEmailAddressSchema),
    defaultValues: {
      email: "",
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

  async function onUpdateEmailAddressSubmit(
    values: UpdateEmailAddressFormValues,
  ) {
    setIsLoading(true);
    const { email } = values;

    console.log("Updating email...", email);

    setIsLoading(false);
  }

  async function onUpdatePasswordSubmit(values: UpdatePasswordFormValues) {
    setIsLoading(true);
    setShowCurrentPassword(false);
    setShowPassword(false);
    setShowPasswordConfirmation(false);
    const {} = values;

    console.log("Updating password...");

    setIsLoading(false);
  }

  return (
    <div className="flex w-3/4 flex-col">
      <h1 className="mb-6 self-start text-3xl font-medium sm:mb-10">Profile</h1>
      <Card className="mb-6 flex w-full flex-col px-2 py-2 sm:mb-10 sm:px-4 sm:py-4 md:px-9">
        <CardHeader className="px-4 py-4 md:px-6 md:py-6">
          <CardTitle>Email Address</CardTitle>
          <CardDescription>
            🚧 Under construction, accounts may be deleted and not work 🚧
          </CardDescription>
        </CardHeader>
        <CardContent className="flex px-4 pb-4 md:px-6 md:pb-6">
          <Form {...updateEmailAddressForm}>
            <form
              className="flex w-full flex-col gap-4 md:gap-6"
              onSubmit={updateEmailAddressForm.handleSubmit(
                onUpdateEmailAddressSubmit,
              )}
            >
              <FormField
                control={updateEmailAddressForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="w-full text-sm focus-visible:ring-ringPrimary sm:text-base md:max-w-[376px] md:text-base"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full focus-visible:ring-ringPrimary md:max-w-[182px]"
                disabled={isLoading}
              >
                Update email address
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="mb-6 flex w-full flex-col px-2 py-2 sm:mb-10 sm:px-4 sm:py-4 md:px-9">
        <CardHeader className="px-4 py-4 sm:px-6 sm:py-6">
          <CardTitle>Password</CardTitle>
          <CardDescription>
            🚧 Under construction, accounts may be deleted and not work 🚧
          </CardDescription>
        </CardHeader>
        <CardContent className="flex px-4 pb-4 md:px-6 md:pb-6">
          <Form {...updatePasswordForm}>
            <form
              className="flex w-full flex-col gap-4 md:gap-6"
              onSubmit={updatePasswordForm.handleSubmit(onUpdatePasswordSubmit)}
            >
              <FormField
                control={updatePasswordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <div className="relative w-full md:max-w-[376px]">
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
                      <div className="relative w-full md:max-w-[376px]">
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
                      <div className="relative w-full md:max-w-[376px]">
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
                className="w-full focus-visible:ring-ringPrimary md:max-w-[156px]"
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
