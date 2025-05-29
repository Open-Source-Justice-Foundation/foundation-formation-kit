// Profile state for the profile page
export type ProfileState = {
  emailVerified: boolean | null;
  passwordPresent: boolean | null;
  githubAccountLinked: boolean | null;
  githubAccountUsername: string | null;
  githubAccountConnectedOn: Date | null;
};
