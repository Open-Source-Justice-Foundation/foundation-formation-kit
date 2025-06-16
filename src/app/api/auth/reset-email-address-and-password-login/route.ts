import { render } from "@react-email/render";
import { auth } from "~/auth";
import {
  AUTH_FROM_FIELD,
  RESEND_API_ENDPOINT,
} from "~/lib/auth/constants/constants";
import { ResetEmailAddressAndPasswordLoginWarningEmailTemplate } from "~/lib/auth/providers/email";
import type { UserWithEmailVerifiedAndPasswordHash } from "~/lib/auth/types";
import { deleteAllEmailAddressVerificationTokensByUserId } from "~/services/database/queries/auth";
import { updatePasswordHashByUserId } from "~/services/database/queries/auth/passwords";
import { NextResponse } from "next/server";

export async function DELETE(): Promise<NextResponse> {
  const session = await auth();

  const user = <UserWithEmailVerifiedAndPasswordHash>session?.user;

  const userId = user?.id;
  const userEmail = user?.email;

  if (!userEmail || user?.emailVerified || !user?.password_hash) {
    throw new Error("Invalid session");
  }

  try {
    if (typeof userId === "number") {
      await deleteAllEmailAddressVerificationTokensByUserId(userId);
      await updatePasswordHashByUserId(null, userId);
    } else {
      throw new Error("Incorrect user id data type");
    }

    const resetEmailAddressAndPasswordLoginWarningSubject =
      "Reset email address and password login requested";

    const resetEmailAddressAndPasswordLoginWarningHtml = await render(
      ResetEmailAddressAndPasswordLoginWarningEmailTemplate(),
      {
        pretty: true,
      },
    );

    // Email text body
    // Fallback for email clients that don't render HTML, e.g. feature phones
    const resetEmailAddressAndPasswordLoginWarningText = await render(
      ResetEmailAddressAndPasswordLoginWarningEmailTemplate(),
      {
        plainText: true,
      },
    );

    const resetEmailAddressAndPasswordLoginWarningResendResponse = await fetch(
      RESEND_API_ENDPOINT,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: AUTH_FROM_FIELD,
          to: userEmail,
          subject: resetEmailAddressAndPasswordLoginWarningSubject,
          html: resetEmailAddressAndPasswordLoginWarningHtml,
          text: resetEmailAddressAndPasswordLoginWarningText,
        }),
      },
    );

    if (!resetEmailAddressAndPasswordLoginWarningResendResponse?.ok) {
      throw new Error(
        `Reset email address and password login warning resend status: ${resetEmailAddressAndPasswordLoginWarningResendResponse?.status}`,
      );
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to reset email address and password login");
  }

  return NextResponse.json(
    { message: "Email address and password login reset successfully" },
    { status: 200 },
  );
}
