import { object, string, z } from "zod";

export const form1023ScheduleDYesNoRadioSchema = object({
  radioInput: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
});

export const form1023ScheduleDYesNoRadioWithTextAreaSchema = object({
  radioInput: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  textAreaInput: string({
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

export const form1023ScheduleDTextAreaSchema = object({
  textAreaInput: string({
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

export const form1023ScheduleDStep2Schema = object({
  supportedOrganizationsPublicCharityStatuses: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  supportedOrganizationsTaxExemptStatuses: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  supportedOrganizationsPublicCharityExplanation: string({
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

export const form1023ScheduleDStep3Schema = object({
  radioInput: z.enum(
    [
      "type-I-supporting-organization",
      "type-II-supporting-organization",
      "type-III-supporting-organization",
    ],
    {
      required_error: "Required",
    },
  ),
});

export const form1023ScheduleDStep7Schema = object({
  supportedOrganizationsSpecifiedByName: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  supportedOrganizationsSimilarPurpose: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
});

export const form1023ScheduleDStep13Schema = object({
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
  radioInput2: z.enum(["Yes", "No"], {
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
});
