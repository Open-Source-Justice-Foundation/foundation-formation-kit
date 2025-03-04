import type { User } from "@auth/core/types";

export interface UserWithEmailVerified extends User {
  emailVerified: string | null;
}
