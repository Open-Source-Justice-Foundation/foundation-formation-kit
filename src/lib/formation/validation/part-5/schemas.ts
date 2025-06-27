import { object, string, z } from "zod";

export const form1023Part5CompensationAndOtherFinancialArrangementsStep1Schema =
  object({
    input1: z.enum(["Yes", "No"], {
      required_error: "Required",
    }),
    input2: z.enum(["Yes", "No"], {
      required_error: "Required",
    }),
    input3: z.enum(["Yes", "No"], {
      required_error: "Required",
    }),
    input4: z.enum(["Yes", "No"], {
      required_error: "Required",
    }),
    input5: z.enum(["Yes", "No"], {
      required_error: "Required",
    }),
    input6: z.enum(["Yes", "No"], {
      required_error: "Required",
    }),
    input7: z.enum(["Yes", "No"], {
      required_error: "Required",
    }),
    input8: z.enum(["Yes", "No"], {
      required_error: "Required",
    }),
    input8Explanation: string({
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

export const form1023Part5CompensationAndOtherFinancialArrangementsYesNoRadioSchema =
  object({
    input: z.enum(["Yes", "No"], {
      required_error: "Required",
    }),
  });

export const form1023Part5CompensationAndOtherFinancialArrangementsYesNoRadioWithTextAreaSchema =
  object({
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
