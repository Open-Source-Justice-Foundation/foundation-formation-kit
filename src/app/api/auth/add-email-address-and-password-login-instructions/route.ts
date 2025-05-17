import { render } from "@react-email/render";
import { auth } from "~/auth";
import {
  AUTH_FROM_FIELD,
  RESEND_API_ENDPOINT,
} from "~/lib/auth/constants/constants";
import { generateEmailAddressVerificationToken } from "~/lib/auth/emails/utils";
import { saltAndHashPassword } from "~/lib/auth/passwords/utils";
import {
  AddEmailAddressAndPasswordLoginRequestEmailTemplate,
  AddEmailAddressAndPasswordLoginWarningEmailTemplate,
} from "~/lib/auth/providers/email";
import { addEmailAddressAndPasswordLoginFromProfileSchema } from "~/lib/auth/validation/schemas";
import {
  checkIfEmailAlreadyExistsForAnotherUser,
  updatePasswordHashByUserId,
} from "~/services/database/queries/auth";
import type { UserWithEmailVerifiedAndPasswordHash } from "~/types";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  const user = <UserWithEmailVerifiedAndPasswordHash>session?.user;

  const userId = user?.id;
  const userEmail = user?.email;

  if (!userEmail || user?.emailVerified || user?.password_hash) {
    throw new Error("Invalid session");
  }

  try {
    const data = await request.json();

    const { email, password } =
      addEmailAddressAndPasswordLoginFromProfileSchema.parse(data);

    if (typeof userId === "number") {
      await checkIfEmailAlreadyExistsForAnotherUser(email, userId);

      const passwordHash = await saltAndHashPassword(password);

      await updatePasswordHashByUserId(passwordHash, userId);
    } else {
      throw new Error("Incorrect user id data type");
    }

    if (userEmail !== email) {
      const addEmailAddressAndPasswordLoginWarningSubject =
        "Add email address and password login requested";

      const addEmailAddressAndPasswordLoginWarningHtml = await render(
        AddEmailAddressAndPasswordLoginWarningEmailTemplate(),
        {
          pretty: true,
        },
      );

      // Email text body
      // Fallback for email clients that don't render HTML, e.g. feature phones
      const addEmailAddressAndPasswordLoginWarningText = await render(
        AddEmailAddressAndPasswordLoginWarningEmailTemplate(),
        {
          plainText: true,
        },
      );

      const addEmailAddressAndPasswordLoginWarningResendResponse = await fetch(
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
            subject: addEmailAddressAndPasswordLoginWarningSubject,
            html: addEmailAddressAndPasswordLoginWarningHtml,
            text: addEmailAddressAndPasswordLoginWarningText,
          }),
        },
      );

      if (!addEmailAddressAndPasswordLoginWarningResendResponse?.ok) {
        throw new Error(
          `Add email address and password login warning resend status: ${addEmailAddressAndPasswordLoginWarningResendResponse?.status}`,
        );
      }
    }

    const token = await generateEmailAddressVerificationToken(email, userId);

    const addEmailAddressAndPasswordLoginLink = `${process.env.DOMAIN}/add-email-address-and-password-login?token=${token}`;

    const addEmailAddressAndPasswordLoginSubject =
      "Add email address and password login link";

    const addEmailAddressAndPasswordLoginHtml = await render(
      AddEmailAddressAndPasswordLoginRequestEmailTemplate({
        url: addEmailAddressAndPasswordLoginLink,
      }),
      {
        pretty: true,
      },
    );

    // Email text body
    // Fallback for email clients that don't render HTML, e.g. feature phones
    const addEmailAddressAndPasswordLoginText = await render(
      AddEmailAddressAndPasswordLoginRequestEmailTemplate({
        url: addEmailAddressAndPasswordLoginLink,
      }),
      {
        plainText: true,
      },
    );

    const addEmailAddressAndPasswordLoginResendResponse = await fetch(
      RESEND_API_ENDPOINT,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: AUTH_FROM_FIELD,
          to: email,
          subject: addEmailAddressAndPasswordLoginSubject,
          html: addEmailAddressAndPasswordLoginHtml,
          text: addEmailAddressAndPasswordLoginText,
        }),
      },
    );

    if (!addEmailAddressAndPasswordLoginResendResponse?.ok) {
      throw new Error(
        `Add email address and password login request resend status: ${addEmailAddressAndPasswordLoginResendResponse?.status}`,
      );
    }
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    if (err instanceof ZodError) {
      throw new Error(
        "Failed to send add email address and password login instructions from profile: invalid credentials",
      );
    }
    console.error(err);
    throw new Error(
      "Failed to send add email address and password login instructions from profile",
    );
  }

  return NextResponse.json(
    { message: "Add email address and password login instructions sent" },
    { status: 200 },
  );
}
