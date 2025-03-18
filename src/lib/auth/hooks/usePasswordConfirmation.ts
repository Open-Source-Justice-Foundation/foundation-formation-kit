import { useEffect } from "react";

import {
  PASSWORD_CONFIRMATION_ERR_MSG,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "~/lib/auth/constants/constants";
import {
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormSetError,
} from "react-hook-form";

export function usePasswordConfirmation<
  TFieldValues extends FieldValues = FieldValues,
>(
  isSubmitted: boolean,
  watchPassword: string,
  watchPasswordConfirmation: string,
  setError: UseFormSetError<TFieldValues>,
  clearErrors: UseFormClearErrors<TFieldValues>,
  name: Path<TFieldValues>,
) {
  useEffect(() => {
    if (
      isSubmitted &&
      watchPasswordConfirmation.length >= PASSWORD_MIN_LENGTH &&
      watchPasswordConfirmation.length <= PASSWORD_MAX_LENGTH
    ) {
      if (watchPassword !== watchPasswordConfirmation) {
        setError(
          name,
          {
            type: "manual",
            message: PASSWORD_CONFIRMATION_ERR_MSG,
          },
          {
            shouldFocus: false,
          },
        );
      } else {
        clearErrors(name);
      }
    }
  }, [watchPassword]);
}
