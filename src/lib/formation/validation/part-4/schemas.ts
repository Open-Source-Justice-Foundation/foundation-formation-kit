import { array, object, string, z } from "zod";

import {
  FUNDRAISING_ACTIVITIES_REQUIRED_ERR_MSG,
  NTEE_CODE_INVALID_TYPE_ERR_MSG,
  NTEE_CODE_MAX_LENGTH,
  NTEE_CODE_MAX_LENGTH_ERR_MSG,
  NTEE_CODE_NON_EMPTY_ERR_MSG,
  NTEE_CODE_REQUIRED_ERR_MSG,
  PAST_PRESENT_AND_PLANNED_ACTIVITIES_INVALID_TYPE_ERR_MSG,
  PAST_PRESENT_AND_PLANNED_ACTIVITIES_MAX_LENGTH,
  PAST_PRESENT_AND_PLANNED_ACTIVITIES_MAX_LENGTH_ERR_MSG,
  PAST_PRESENT_AND_PLANNED_ACTIVITIES_NON_EMPTY_ERR_MSG,
  PAST_PRESENT_AND_PLANNED_ACTIVITIES_REQUIRED_ERR_MSG,
  PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_EXPLANATION_INVALID_TYPE_ERR_MSG,
  PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_EXPLANATION_MAX_LENGTH,
  PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_EXPLANATION_MAX_LENGTH_ERR_MSG,
  PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_EXPLANATION_NON_EMPTY_ERR_MSG,
  PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_EXPLANATION_REQUIRED_ERR_MSG,
  PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_REQUIRED_ERR_MSG,
  SELECT_NTEE_CODE_BY_IRS_REQUIRED_ERR_MSG,
} from "../../constants/part-4/constants";

export const form1023Part4YourActivitiesStep1Schema = object({
  pastPresentAndPlannedActivities: string({
    required_error: PAST_PRESENT_AND_PLANNED_ACTIVITIES_REQUIRED_ERR_MSG,
    invalid_type_error:
      PAST_PRESENT_AND_PLANNED_ACTIVITIES_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({
      message: PAST_PRESENT_AND_PLANNED_ACTIVITIES_NON_EMPTY_ERR_MSG,
    })
    .max(PAST_PRESENT_AND_PLANNED_ACTIVITIES_MAX_LENGTH, {
      message: PAST_PRESENT_AND_PLANNED_ACTIVITIES_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
});

// TODO
// Check if selectNteeCodeByIrs should be an arrary
export const form1023Part4YourActivitiesStep2Schema = object({
  nteeCode: string({
    required_error: NTEE_CODE_REQUIRED_ERR_MSG,
    invalid_type_error: NTEE_CODE_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: NTEE_CODE_NON_EMPTY_ERR_MSG })
    .max(NTEE_CODE_MAX_LENGTH, {
      message: NTEE_CODE_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
  selectNteeCodeByIrs: array(string()).refine(
    (value) => value.some((item) => item),
    {
      message: SELECT_NTEE_CODE_BY_IRS_REQUIRED_ERR_MSG,
    },
  ),
});

// TODO
// Update this
export const form1023Part4YourActivitiesStep3Schema = object({
  programsLimitProvisionOfGoodsServicesOrFunds: z.enum(["Yes", "No"], {
    required_error:
      PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_REQUIRED_ERR_MSG,
  }),
  programsLimitProvisionOfGoodsServicesOrFundsExplanation: string({
    required_error:
      PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_EXPLANATION_REQUIRED_ERR_MSG,
    invalid_type_error:
      PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_EXPLANATION_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({
      message:
        PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_EXPLANATION_NON_EMPTY_ERR_MSG,
    })
    .max(
      PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_EXPLANATION_MAX_LENGTH,
      {
        message:
          PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_EXPLANATION_MAX_LENGTH_ERR_MSG,
      },
    )
    .trim(),
});

export const form1023Part4YourActivitiesYesNoRadioSchema = object({
  input: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
});

export const form1023Part4YourActivitiesStep16Schema = object({
  fundraisingActivities: array(string()).refine(
    (value) => value.some((item) => item),
    {
      message: FUNDRAISING_ACTIVITIES_REQUIRED_ERR_MSG,
    },
  ),
});
