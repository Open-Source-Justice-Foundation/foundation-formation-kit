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
import { AuthCardHomeButton } from "~/features/auth";
import { usePasswordConfirmation } from "~/lib/auth/hooks/usePasswordConfirmation";
import { updatePasswordSchema } from "~/lib/auth/validation/schemas";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormValues = z.infer<typeof updatePasswordSchema>;

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const {
    watch,
    setError,
    clearErrors,
    formState: { isSubmitted },
  } = form;

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

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setShowPassword(false);
    setShowPasswordConfirmation(false);
    const { password, passwordConfirmation } = values;

    const url = "/api/auth/update-password";
    let updatePasswordResponse: Response = new Response();

    try {
      updatePasswordResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          passwordConfirmation,
        }),
      });

      if (updatePasswordResponse.status !== 200) {
        throw new Error(
          `Update password response status: ${updatePasswordResponse.status}`,
        );
      }

      // TODO
      // Currently the password doesn't get updated and the user is just redirected to the updated password page
      router.push("/updated-password");
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      toast.error("Failed to update password");
      setIsLoading(false);
    }
  }

  return (
    <Card className="flex w-[360px] flex-col sm:w-[425px]">
      <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
        <CardTitle>
          <AuthCardHomeButton />
        </CardTitle>
        <CardDescription>
          🚧 Under construction, accounts may be deleted and not work 🚧
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
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
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <div className="relative">
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
              className="focus-visible:ring-ringPrimary"
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
