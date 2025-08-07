"use client";

import { useEffect, useState } from "react";

import {
  ProfileAddEmailAddressAndPasswordLoginCard,
  ProfileAddEmailAddressAndPasswordLoginPendingCard,
  ProfileAuthenticationCard,
  ProfileDeleteAccountCard,
  ProfileEmailAddressCard,
  ProfileHeading,
  ProfileResetEmailAddressCard,
  ProfileUpdatePasswordCard,
} from "~/features/profile";
import { FullPageLoadingSpinner } from "~/features/spinners";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [passwordPresent, setPasswordPresent] = useState<boolean | null>(null);
  const [githubAccountLinked, setGithubAccountLinked] = useState<
    boolean | null
  >(null);
  const [githubAccountUsername, setGithubAccountUsername] = useState<
    string | null
  >(null);
  const [githubAccountConnectedOn, setGithubAccountConnectedOn] = useState<
    string | null
  >(null);

  const [newEmailAddressForLoginForm, setNewEmailAddressForLoginForm] =
    useState<string | null>("");

  useEffect(() => {
    if (session === null) {
      router.push("/");
    } else if (session) {
      const checkProfileState = async () => {
        const url = "/api/profile/get-profile-state";
        let getProfileStateResponse: Response = new Response();

        try {
          getProfileStateResponse = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (getProfileStateResponse?.status !== 200) {
            throw new Error(
              `Get profile state response status: ${getProfileStateResponse?.status}`,
            );
          }

          const profileStateData = await getProfileStateResponse.json();

          if (profileStateData?.profileState?.emailVerified === true) {
            setEmailVerified(true);
          } else if (profileStateData?.profileState?.emailVerified === false) {
            setEmailVerified(false);
          } else {
            router.push("/profile-error");
          }

          if (profileStateData?.profileState?.passwordPresent === true) {
            setPasswordPresent(true);
          } else if (
            profileStateData?.profileState?.passwordPresent === false
          ) {
            setPasswordPresent(false);
          } else {
            router.push("/profile-error");
          }

          if (profileStateData?.profileState?.githubAccountLinked === true) {
            setGithubAccountLinked(true);
            setGithubAccountUsername(
              profileStateData?.profileState?.githubAccountUsername,
            );
            setGithubAccountConnectedOn(
              profileStateData?.profileState?.githubAccountConnectedOn,
            );
          } else if (
            profileStateData?.profileState?.githubAccountLinked === false
          ) {
            setGithubAccountLinked(false);
          } else {
            router.push("/profile-error");
          }

          if (
            profileStateData?.profileState?.emailVerified === false &&
            profileStateData?.profileState?.passwordPresent === true &&
            profileStateData?.profileState?.githubAccountLinked === true
          ) {
            setNewEmailAddressForLoginForm(
              profileStateData?.profileState
                ?.addEmailAddressAndPasswordLoginEmail,
            );
          }
        } catch (err) {
          // TODO
          // Don't log the err value, do something else with it to avoid deployment error
          console.error(err);
          router.push("/profile-error");
        }
      };

      checkProfileState();

      return () => { };
    }
  }, [session, router]);

  return (
    <div className="flex w-full flex-col min-[421px]:w-[85%] sm:w-[80%] md:w-3/4">
      {session === undefined && (
        <FullPageLoadingSpinner loadingText={"Loading profile..."} />
      )}
      {session === null && (
        <FullPageLoadingSpinner loadingText={"Redirecting to homepage..."} />
      )}
      {session && (
        <>
          {(() => {
            if (
              emailVerified === null ||
              passwordPresent === null ||
              githubAccountLinked === null
            ) {
              return (
                <FullPageLoadingSpinner loadingText={"Loading profile..."} />
              );
            }
            if (
              emailVerified &&
              passwordPresent &&
              githubAccountLinked !== null
            ) {
              return (
                <>
                  <ProfileHeading />
                  <ProfileEmailAddressCard
                    email={session?.user?.email}
                    emailVerified={emailVerified}
                    passwordPresent={passwordPresent}
                  />
                  <ProfileResetEmailAddressCard
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                  <ProfileUpdatePasswordCard
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                  <ProfileAuthenticationCard
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    emailVerified={emailVerified}
                    passwordPresent={passwordPresent}
                    githubAccountLinked={githubAccountLinked}
                    setGithubAccountLinked={setGithubAccountLinked}
                    githubAccountUsername={githubAccountUsername}
                    setGithubAccountUsername={setGithubAccountUsername}
                    githubAccountConnectedOn={githubAccountConnectedOn}
                    setGithubAccountConnectedOn={setGithubAccountConnectedOn}
                  />
                  <ProfileDeleteAccountCard
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </>
              );
            } else if (
              emailVerified === false &&
              passwordPresent === false &&
              githubAccountLinked
            ) {
              return (
                <>
                  <ProfileHeading />
                  <ProfileEmailAddressCard
                    email={session?.user?.email}
                    emailVerified={emailVerified}
                    passwordPresent={passwordPresent}
                    githubAccountLinked={githubAccountLinked}
                  />
                  <ProfileAddEmailAddressAndPasswordLoginCard
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    setPasswordPresent={setPasswordPresent}
                    setNewEmailAddressForLoginForm={
                      setNewEmailAddressForLoginForm
                    }
                  />
                  <ProfileAuthenticationCard
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    emailVerified={emailVerified}
                    passwordPresent={passwordPresent}
                    githubAccountLinked={githubAccountLinked}
                    setGithubAccountLinked={setGithubAccountLinked}
                    githubAccountUsername={githubAccountUsername}
                    setGithubAccountUsername={setGithubAccountUsername}
                    githubAccountConnectedOn={githubAccountConnectedOn}
                    setGithubAccountConnectedOn={setGithubAccountConnectedOn}
                  />

                  <ProfileDeleteAccountCard
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </>
              );
            } else if (
              emailVerified === false &&
              passwordPresent &&
              githubAccountLinked
            ) {
              return (
                <>
                  <ProfileHeading />
                  <ProfileEmailAddressCard
                    email={session?.user?.email}
                    emailVerified={emailVerified}
                    passwordPresent={passwordPresent}
                    githubAccountLinked={githubAccountLinked}
                  />
                  <ProfileAddEmailAddressAndPasswordLoginPendingCard
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    setPasswordPresent={setPasswordPresent}
                    newEmailAddressForLoginForm={newEmailAddressForLoginForm}
                    setNewEmailAddressForLoginForm={
                      setNewEmailAddressForLoginForm
                    }
                  />
                  <ProfileAuthenticationCard
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    emailVerified={emailVerified}
                    passwordPresent={passwordPresent}
                    githubAccountLinked={githubAccountLinked}
                    setGithubAccountLinked={setGithubAccountLinked}
                    githubAccountUsername={githubAccountUsername}
                    setGithubAccountUsername={setGithubAccountUsername}
                    githubAccountConnectedOn={githubAccountConnectedOn}
                    setGithubAccountConnectedOn={setGithubAccountConnectedOn}
                  />
                  <ProfileDeleteAccountCard
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </>
              );
            } else {
              router.push("/profile-error");
            }
          })()}
        </>
      )}
    </div>
  );
}
