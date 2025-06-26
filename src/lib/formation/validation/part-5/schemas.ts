import { object, z } from "zod";

export const form1023Part5CompensationAndOtherFinancialArrangementsYesNoRadioSchema =
  object({
    input: z.enum(["Yes", "No"], {
      required_error: "Required",
    }),
  });
