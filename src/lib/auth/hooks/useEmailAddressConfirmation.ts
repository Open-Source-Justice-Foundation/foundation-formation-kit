import { useEffect } from "react";

import {
  EMAIL_CONFIRMATION_ERR_MSG,
  EMAIL_MAX_LENGTH,
} from "~/lib/auth/constants/constants";
import {
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormSetError,
} from "react-hook-form";
import { z } from "zod";

const validEmailAddressSchema = z.string().email();

export function useEmailAddressConfirmation<
  TFieldValues extends FieldValues = FieldValues,
>(
  isSubmitted: boolean,
  watchEmail: string,
  watchEmailConfirmation: string,
  setError: UseFormSetError<TFieldValues>,
  clearErrors: UseFormClearErrors<TFieldValues>,
  name: Path<TFieldValues>,
) {
  useEffect(() => {
    const isWatchEmailConfirmationValid = validEmailAddressSchema.safeParse(
      watchEmailConfirmation,
    );

    if (
      isSubmitted &&
      watchEmailConfirmation.length >= 1 &&
      watchEmailConfirmation.length <= EMAIL_MAX_LENGTH &&
      isWatchEmailConfirmationValid.success &&
      watchEmailConfirmation === watchEmailConfirmation.toLowerCase()
    ) {
      if (watchEmail !== watchEmailConfirmation) {
        setError(
          name,
          {
            type: "manual",
            message: EMAIL_CONFIRMATION_ERR_MSG,
          },
          {
            shouldFocus: false,
          },
        );
      } else {
        clearErrors(name);
      }
    }
  }, [watchEmail]);
}
