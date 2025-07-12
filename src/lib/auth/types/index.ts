import type {
  Account,
  CookieOption,
  DefaultSession,
  Profile,
  Session,
  User,
} from "@auth/core/types";

// Session
export interface SessionWithId extends Session {
  id: number;
}

export interface SessionWithSessionToken extends DefaultSession {
  sessionToken: Partial<CookieOption>;
}

// User
export interface UserWithEmailVerified extends User {
  emailVerified: string | null;
}

export interface UserWithPasswordHash extends User {
  password_hash: string | null;
}

export interface UserWithEmailVerifiedAndPasswordHash extends User {
  emailVerified: string | null;
  password_hash: string | null;
}

export interface AdapterUser extends User {
  /** A unique identifier for the user. */
  id: string;
  /** The user's email address. */
  email: string;
  /**
   * Whether the user has verified their email address via an [Email provider](https://authjs.dev/getting-started/authentication/email).
   * It is `null` if the user has not signed in with the Email provider yet, or the date of the first successful signin.
   */
  emailVerified: Date | null;
}

// Email
interface CustomEmailConfig {
  from?: string | undefined;
  apiKey: string | undefined;
}

export type CustomEmailProviderSendVerificationRequestParams = {
  identifier: string;
  url: string;
  provider: CustomEmailConfig;
};

export type CustomSendVerificationRequestEmailTemplateProps = {
  url: string;
};

// OAuth providers
export type SupportedOAuthProvider = "github";

// Sign in callback params
export interface SignInCallbackParams {
  user: User | AdapterUser;
  account?: Account | null | undefined;
  profile?: Profile;
}
