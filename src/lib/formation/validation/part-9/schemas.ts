import { array, object, string, z } from "zod";

import { EXCEPTED_FROM_FILING_REQUIRED_ERR_MSG } from "../../constants/part-9/constants";

export const form1023Part9AnnualFilingRequirementsStep1Schema = object({
  excusedFromFiling: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  exceptedFromFiling: array(string()).refine(
    (value) => value.some((item) => item),
    {
      message: EXCEPTED_FROM_FILING_REQUIRED_ERR_MSG,
    },
  ),
  otherDescription: string({
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
