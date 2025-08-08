// Auth email
export const AUTH_FROM_EMAIL_ADDRESS = "auth@foundationformationkit.org";
export const AUTH_FROM_FIELD = `FFK Team <${AUTH_FROM_EMAIL_ADDRESS}>`;

// Email addresses
export const EMAIL_MAX_LENGTH = 255;
export const EMAIL_REQUIRED_ERR_MSG = "Email address is required";
export const EMAIL_INVALID_TYPE_ERR_MSG = "Email address must be a string";
export const EMAIL_NON_EMPTY_ERR_MSG = "Email address is required";
export const EMAIL_MAX_LENGTH_ERR_MSG = `Email address can be at most ${EMAIL_MAX_LENGTH} characters`;
export const EMAIL_INVALID_ERR_MSG = "Email address is invalid";
export const EMAIL_LOWERCASE_ERR_MSG = "Email address must be lowercase";
export const EMAIL_VALIDATION_PATH = "email";
export const EMAIL_CONFIRMATION_ERR_MSG = "Emails do not match";
export const EMAIL_CONFIRMATION_VALIDATION_PATH = "emailConfirmation";

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

// Email address and password reset tokens
export const EMAIL_ADDRESS_RESET_TOKEN_BYTE_SIZE = 32;
export const PASSWORD_RESET_TOKEN_BYTE_SIZE = 32;

// Email address verification tokens
export const EMAIL_ADDRESS_VERIFICATION_TOKEN_BYTE_SIZE = 32;

// OAuth usernames
export const OAUTH_PROVIDER_MAX_LENGTH = 255;
export const OAUTH_SUPPORTED_PROVIDER = "github";
export const OAUTH_PROVIDER_REQUIRED_ERR_MSG = "OAuth provider is required";
export const OAUTH_PROVIDER_INVALID_TYPE_ERR_MSG =
  "OAuth provider must be a string";
export const OAUTH_PROVIDER_NON_EMPTY_ERR_MSG = "OAuth provider is required";
export const OAUTH_PROVIDER_MAX_LENGTH_ERR_MSG = `OAuth provider can be at most ${OAUTH_PROVIDER_MAX_LENGTH} characters`;
export const OAUTH_SUPPORTED_PROVIDER_ERR_MSG = `OAuth provider must be ${OAUTH_SUPPORTED_PROVIDER}`;
export const OAUTH_SUPPORTED_PROVIDER_VALIDATION_PATH = "provider";

export const OAUTH_PROVIDER_ACCOUNT_ID_MAX_LENGTH = 255;
export const OAUTH_PROVIDER_ACCOUNT_ID_REQUIRED_ERR_MSG =
  "OAuth provider account ID is required";
export const OAUTH_PROVIDER_ACCOUNT_ID_INVALID_TYPE_ERR_MSG =
  "OAuth provider account ID must be a string";
export const OAUTH_PROVIDER_ACCOUNT_ID_NON_EMPTY_ERR_MSG =
  "OAuth provider account ID is required";
export const OAUTH_PROVIDER_ACCOUNT_ID_MAX_LENGTH_ERR_MSG = `OAuth provider account ID can be at most ${OAUTH_PROVIDER_ACCOUNT_ID_MAX_LENGTH} characters`;

export const OAUTH_USERNAME_MAX_LENGTH = 255;
export const OAUTH_USERNAME_REQUIRED_ERR_MSG = "OAuth username is required";
export const OAUTH_USERNAME_INVALID_TYPE_ERR_MSG =
  "OAuth username must be a string";
export const OAUTH_USERNAME_NON_EMPTY_ERR_MSG = "OAuth username is required";
export const OAUTH_USERNAME_MAX_LENGTH_ERR_MSG = `OAuth username can be at most ${OAUTH_USERNAME_MAX_LENGTH} characters`;
