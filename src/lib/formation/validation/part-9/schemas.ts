import { array, object, string } from "zod";

import { SELECT_EXCEPTED_FROM_FILING_REQUIRED_ERR_MSG } from "../../constants/part-9/constants";

export const form1023Part9AnnualFilingRequirementsStep1Schema = object({
  selectExceptedFromFiling: array(string()).refine(
    (value) => value.some((item) => item),
    {
      message: SELECT_EXCEPTED_FROM_FILING_REQUIRED_ERR_MSG,
    },
  ),
});
