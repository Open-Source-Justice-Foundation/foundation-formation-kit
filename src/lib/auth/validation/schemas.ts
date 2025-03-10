import { object, string } from "zod";

export const registerSchema = object({
  email: string({
    required_error: "Email address is required",
    invalid_type_error: "Email address must be a string",
  })
    .nonempty({ message: "Email address is required" })
    .max(255, { message: "Email address can be at most 255 characters" })
    .email({ message: "Email address is invalid" })
    .trim(),
  password: string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
    .nonempty({ message: "Password is required" })
    .min(16, { message: "Password must contain at least 16 characters" })
    .max(256, { message: "Password can be at most 256 characters" }),
  passwordConfirmation: string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
    .nonempty({ message: "Password is required" })
    .min(16, { message: "Password must contain at least 16 characters" })
    .max(256, { message: "Password can be at most 256 characters" }),
}).refine((values) => values.password === values.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

export const signInSchema = object({
  email: string({
    required_error: "Email address is required",
    invalid_type_error: "Email address must be a string",
  })
    .nonempty({ message: "Email address is required" })
    .max(255, { message: "Email address can be at most 255 characters" })
    .email({ message: "Email address is invalid" })
    .trim(),
  password: string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
    .nonempty({ message: "Password is required" })
    .max(256, { message: "Password can be at most 256 characters" }),
});

export const resetPasswordSchema = object({
  password: string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
    .nonempty({ message: "Password is required" })
    .min(16, { message: "Password must contain at least 16 characters" })
    .max(256, { message: "Password can be at most 256 characters" }),
  passwordConfirmation: string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
    .nonempty({ message: "Password is required" })
    .min(16, { message: "Password must contain at least 16 characters" })
    .max(256, { message: "Password can be at most 256 characters" }),
}).refine((values) => values.password === values.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});
