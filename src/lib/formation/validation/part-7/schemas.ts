import { array, object, string, z } from "zod";

import {
  EDUCATIONAL_SUPPORT_REQUIRED_ERR_MSG,
  PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_CONFIRMATION_CHECKBOX_REQUIRED_ERR_MSG,
  PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_REFERENCE_INVALID_TYPE_ERR_MSG,
  PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_REFERENCE_MAX_LENGTH,
  PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_REFERENCE_MAX_LENGTH_ERR_MSG,
  PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_REFERENCE_NON_EMPTY_ERR_MSG,
  PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_REFERENCE_REQUIRED_ERR_MSG,
  PRIVATE_OPERATING_FOUNDATION_CONFIRMATION_REQUIRED_ERR_MSG,
  PRIVATE_OPERATING_FOUNDATION_STATUS_EXPLANATION_INVALID_TYPE_ERR_MSG,
  PRIVATE_OPERATING_FOUNDATION_STATUS_EXPLANATION_MAX_LENGTH,
  PRIVATE_OPERATING_FOUNDATION_STATUS_EXPLANATION_MAX_LENGTH_ERR_MSG,
  PRIVATE_OPERATING_FOUNDATION_STATUS_EXPLANATION_NON_EMPTY_ERR_MSG,
  PRIVATE_OPERATING_FOUNDATION_STATUS_EXPLANATION_REQUIRED_ERR_MSG,
  SELECT_FOUNDATION_CLASSIFICATION_REQUIRED_ERR_MSG,
} from "../../constants/part-7/constants";

export const form1023Part7FoundationClassificationStep1Schema = object({
  selectFoundationClassification: array(string()).refine(
    (value) => value.some((item) => item),
    {
      message: SELECT_FOUNDATION_CLASSIFICATION_REQUIRED_ERR_MSG,
    },
  ),
  privateFoundationSpecialProvisionsConfirmationCheckbox: array(
    string(),
  ).refine((value) => value.some((item) => item), {
    message:
      PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_CONFIRMATION_CHECKBOX_REQUIRED_ERR_MSG,
  }),
  privateFoundationSpecialProvisionsReference: string({
    required_error:
      PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_REFERENCE_REQUIRED_ERR_MSG,
    invalid_type_error:
      PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_REFERENCE_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({
      message:
        PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_REFERENCE_NON_EMPTY_ERR_MSG,
    })
    .max(PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_REFERENCE_MAX_LENGTH, {
      message:
        PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_REFERENCE_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
  educationalSupport: z.enum(["Yes", "No"], {
    required_error: EDUCATIONAL_SUPPORT_REQUIRED_ERR_MSG,
  }),
  privateOperatingFoundationConfirmation: z.enum(["Yes", "No"], {
    required_error: PRIVATE_OPERATING_FOUNDATION_CONFIRMATION_REQUIRED_ERR_MSG,
  }),
  privateOperatingFoundationStatusExplanation: string({
    required_error:
      PRIVATE_OPERATING_FOUNDATION_STATUS_EXPLANATION_REQUIRED_ERR_MSG,
    invalid_type_error:
      PRIVATE_OPERATING_FOUNDATION_STATUS_EXPLANATION_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({
      message:
        PRIVATE_OPERATING_FOUNDATION_STATUS_EXPLANATION_NON_EMPTY_ERR_MSG,
    })
    .max(PRIVATE_OPERATING_FOUNDATION_STATUS_EXPLANATION_MAX_LENGTH, {
      message:
        PRIVATE_OPERATING_FOUNDATION_STATUS_EXPLANATION_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
});

export const form1023Part7FoundationClassificationStep2Schema = object({
  input1: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  input2: string({
    required_error: "Required",
    invalid_type_error: "Input must be a string",
  })
    .nonempty({
      message: "Required",
    })
    .max(1000, {
      message: "Input can be at most 1000 characters",
    })
    .trim(),
});
