import {
  EMAIL_INVALID_ERR_MSG,
  EMAIL_INVALID_TYPE_ERR_MSG,
  EMAIL_LOWERCASE_ERR_MSG,
  EMAIL_MAX_LENGTH,
  EMAIL_MAX_LENGTH_ERR_MSG,
  EMAIL_NON_EMPTY_ERR_MSG,
  EMAIL_REQUIRED_ERR_MSG,
  EMAIL_VALIDATION_PATH,
  PASSWORD_CONFIRMATION_ERR_MSG,
  PASSWORD_CONFIRMATION_VALIDATION_PATH,
  PASSWORD_INVALID_TYPE_ERR_MSG,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MAX_LENGTH_ERR_MSG,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERR_MSG,
  PASSWORD_NON_EMPTY_ERR_MSG,
  PASSWORD_REQUIRED_ERR_MSG,
} from "~/lib/auth/constants/constants";
import { object, string } from "zod";

export const registerSchema = object({
  email: string({
    required_error: EMAIL_REQUIRED_ERR_MSG,
    invalid_type_error: EMAIL_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: EMAIL_NON_EMPTY_ERR_MSG })
    .max(EMAIL_MAX_LENGTH, {
      message: EMAIL_MAX_LENGTH_ERR_MSG,
    })
    .email({ message: EMAIL_INVALID_ERR_MSG })
    .trim(),
  password: string({
    required_error: PASSWORD_REQUIRED_ERR_MSG,
    invalid_type_error: PASSWORD_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: PASSWORD_NON_EMPTY_ERR_MSG })
    .min(PASSWORD_MIN_LENGTH, {
      message: PASSWORD_MIN_LENGTH_ERR_MSG,
    })
    .max(PASSWORD_MAX_LENGTH, {
      message: PASSWORD_MAX_LENGTH_ERR_MSG,
    }),
  passwordConfirmation: string({
    required_error: PASSWORD_REQUIRED_ERR_MSG,
    invalid_type_error: PASSWORD_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: PASSWORD_NON_EMPTY_ERR_MSG })
    .min(PASSWORD_MIN_LENGTH, {
      message: PASSWORD_MIN_LENGTH_ERR_MSG,
    })
    .max(PASSWORD_MAX_LENGTH, {
      message: PASSWORD_MAX_LENGTH_ERR_MSG,
    }),
})
  .refine((values) => values.email === values.email.toLowerCase(), {
    message: EMAIL_LOWERCASE_ERR_MSG,
    path: [EMAIL_VALIDATION_PATH],
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    message: PASSWORD_CONFIRMATION_ERR_MSG,
    path: [PASSWORD_CONFIRMATION_VALIDATION_PATH],
  });

export const signInSchema = object({
  email: string({
    required_error: EMAIL_REQUIRED_ERR_MSG,
    invalid_type_error: EMAIL_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: EMAIL_NON_EMPTY_ERR_MSG })
    .max(EMAIL_MAX_LENGTH, {
      message: EMAIL_MAX_LENGTH_ERR_MSG,
    })
    .email({ message: EMAIL_INVALID_ERR_MSG })
    .trim(),
  password: string({
    required_error: PASSWORD_REQUIRED_ERR_MSG,
    invalid_type_error: PASSWORD_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: PASSWORD_NON_EMPTY_ERR_MSG })
    .max(PASSWORD_MAX_LENGTH, {
      message: PASSWORD_MAX_LENGTH_ERR_MSG,
    }),
}).refine((values) => values.email === values.email.toLowerCase(), {
  message: EMAIL_LOWERCASE_ERR_MSG,
  path: [EMAIL_VALIDATION_PATH],
});

export const resetPasswordSchema = object({
  email: string({
    required_error: EMAIL_REQUIRED_ERR_MSG,
    invalid_type_error: EMAIL_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: EMAIL_NON_EMPTY_ERR_MSG })
    .max(EMAIL_MAX_LENGTH, {
      message: EMAIL_MAX_LENGTH_ERR_MSG,
    })
    .email({ message: EMAIL_INVALID_ERR_MSG })
    .trim(),
}).refine((values) => values.email === values.email.toLowerCase(), {
  message: EMAIL_LOWERCASE_ERR_MSG,
  path: [EMAIL_VALIDATION_PATH],
});

export const updatePasswordSchema = object({
  password: string({
    required_error: PASSWORD_REQUIRED_ERR_MSG,
    invalid_type_error: PASSWORD_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: PASSWORD_NON_EMPTY_ERR_MSG })
    .min(PASSWORD_MIN_LENGTH, {
      message: PASSWORD_MIN_LENGTH_ERR_MSG,
    })
    .max(PASSWORD_MAX_LENGTH, {
      message: PASSWORD_MAX_LENGTH_ERR_MSG,
    }),
  passwordConfirmation: string({
    required_error: PASSWORD_REQUIRED_ERR_MSG,
    invalid_type_error: PASSWORD_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: PASSWORD_NON_EMPTY_ERR_MSG })
    .min(PASSWORD_MIN_LENGTH, {
      message: PASSWORD_MIN_LENGTH_ERR_MSG,
    })
    .max(PASSWORD_MAX_LENGTH, {
      message: PASSWORD_MAX_LENGTH_ERR_MSG,
    }),
}).refine((values) => values.password === values.passwordConfirmation, {
  message: PASSWORD_CONFIRMATION_ERR_MSG,
  path: [PASSWORD_CONFIRMATION_VALIDATION_PATH],
});

export const updateEmailAddressSchema = object({
  email: string({
    required_error: EMAIL_REQUIRED_ERR_MSG,
    invalid_type_error: EMAIL_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: EMAIL_NON_EMPTY_ERR_MSG })
    .max(EMAIL_MAX_LENGTH, {
      message: EMAIL_MAX_LENGTH_ERR_MSG,
    })
    .email({ message: EMAIL_INVALID_ERR_MSG })
    .trim(),
}).refine((values) => values.email === values.email.toLowerCase(), {
  message: EMAIL_LOWERCASE_ERR_MSG,
  path: [EMAIL_VALIDATION_PATH],
});

export const updatePasswordFromProfileSchema = object({
  currentPassword: string({
    required_error: PASSWORD_REQUIRED_ERR_MSG,
    invalid_type_error: PASSWORD_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: PASSWORD_NON_EMPTY_ERR_MSG })
    .min(PASSWORD_MIN_LENGTH, {
      message: PASSWORD_MIN_LENGTH_ERR_MSG,
    })
    .max(PASSWORD_MAX_LENGTH, {
      message: PASSWORD_MAX_LENGTH_ERR_MSG,
    }),
  password: string({
    required_error: PASSWORD_REQUIRED_ERR_MSG,
    invalid_type_error: PASSWORD_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: PASSWORD_NON_EMPTY_ERR_MSG })
    .min(PASSWORD_MIN_LENGTH, {
      message: PASSWORD_MIN_LENGTH_ERR_MSG,
    })
    .max(PASSWORD_MAX_LENGTH, {
      message: PASSWORD_MAX_LENGTH_ERR_MSG,
    }),
  passwordConfirmation: string({
    required_error: PASSWORD_REQUIRED_ERR_MSG,
    invalid_type_error: PASSWORD_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: PASSWORD_NON_EMPTY_ERR_MSG })
    .min(PASSWORD_MIN_LENGTH, {
      message: PASSWORD_MIN_LENGTH_ERR_MSG,
    })
    .max(PASSWORD_MAX_LENGTH, {
      message: PASSWORD_MAX_LENGTH_ERR_MSG,
    }),
}).refine((values) => values.password === values.passwordConfirmation, {
  message: PASSWORD_CONFIRMATION_ERR_MSG,
  path: [PASSWORD_CONFIRMATION_VALIDATION_PATH],
});
