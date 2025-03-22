// Email addresses
export const EMAIL_MAX_LENGTH = 255;
export const EMAIL_REQUIRED_ERR_MSG = "Email address is required";
export const EMAIL_INVALID_TYPE_ERR_MSG = "Email address must be a string";
export const EMAIL_NON_EMPTY_ERR_MSG = "Email address is required";
export const EMAIL_MAX_LENGTH_ERR_MSG = `Email address can be at most ${EMAIL_MAX_LENGTH} characters`;
export const EMAIL_INVALID_ERR_MSG = "Email address is invalid";
export const EMAIL_LOWERCASE_ERR_MSG = "Email address must be lowercase";
export const EMAIL_VALIDATION_PATH = "email";

// Passwords
export const PASSWORD_MIN_LENGTH = 16;
export const PASSWORD_MAX_LENGTH = 256;
export const PASSWORD_REQUIRED_ERR_MSG = "Password is required";
export const PASSWORD_INVALID_TYPE_ERR_MSG = "Password must be a string";
export const PASSWORD_NON_EMPTY_ERR_MSG = "Password is required";
export const PASSWORD_MIN_LENGTH_ERR_MSG = `Password must contain at least ${PASSWORD_MIN_LENGTH} characters`;
export const PASSWORD_MAX_LENGTH_ERR_MSG = `Password can be at most ${PASSWORD_MAX_LENGTH} characters`;
export const PASSWORD_CONFIRMATION_ERR_MSG = "Passwords do not match";
export const PASSWORD_CONFIRMATION_VALIDATION_PATH = "passwordConfirmation";
