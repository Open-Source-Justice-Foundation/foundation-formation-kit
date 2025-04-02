import {
  LEGAL_FIRST_NAME_INVALID_TYPE_ERR_MSG,
  LEGAL_FIRST_NAME_MAX_LENGTH,
  LEGAL_FIRST_NAME_MAX_LENGTH_ERR_MSG,
  LEGAL_FIRST_NAME_NON_EMPTY_ERR_MSG,
  LEGAL_FIRST_NAME_REQUIRED_ERR_MSG,
  LEGAL_LAST_NAME_INVALID_TYPE_ERR_MSG,
  LEGAL_LAST_NAME_MAX_LENGTH,
  LEGAL_LAST_NAME_MAX_LENGTH_ERR_MSG,
  LEGAL_LAST_NAME_NON_EMPTY_ERR_MSG,
  LEGAL_LAST_NAME_REQUIRED_ERR_MSG,
} from "~/lib/formation/constants/constants";
import { object, string } from "zod";

export const legalNameSchema = object({
  firstName: string({
    required_error: LEGAL_FIRST_NAME_REQUIRED_ERR_MSG,
    invalid_type_error: LEGAL_FIRST_NAME_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: LEGAL_FIRST_NAME_NON_EMPTY_ERR_MSG })
    .max(LEGAL_FIRST_NAME_MAX_LENGTH, {
      message: LEGAL_FIRST_NAME_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
  lastName: string({
    required_error: LEGAL_LAST_NAME_REQUIRED_ERR_MSG,
    invalid_type_error: LEGAL_LAST_NAME_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: LEGAL_LAST_NAME_NON_EMPTY_ERR_MSG })
    .max(LEGAL_LAST_NAME_MAX_LENGTH, {
      message: LEGAL_LAST_NAME_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
});
