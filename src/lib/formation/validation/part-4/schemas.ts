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

export const form1023Part4YourActivitiesStep6Schema = object({
  influenceLegislation: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  influenceLegislationExplanation: string({
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
  legislativeActivityMeasuredByExpenditures: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  legislativeActivityMeasuredByExpendituresExplanation: string({
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

export const form1023Part4YourActivitiesYesNoRadioSchema = object({
  input: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
});

export const form1023Part4YourActivitiesStep9Schema = object({
  radioInput1: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  textAreaInput1: string({
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
  radioInput2: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  textAreaInput2: string({
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
  radioInput3: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  textAreaInput3: string({
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
  radioInput4: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  textAreaInput4: string({
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
  radioInput5: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  textAreaInput5: string({
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
  radioInput6: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  textAreaInput6: string({
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
  radioInput7: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  textAreaInput7: string({
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
  radioInput8: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  textAreaInput8: string({
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
  radioInput9: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  radioInput10: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
});

export const form1023Part4YourActivitiesStep10Schema = object({
  radioInput1: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  textAreaInput1: string({
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
  radioInput2: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  textAreaInput2: string({
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
  radioInput3: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  radioInput4: z.enum(["Yes", "No"], {
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
