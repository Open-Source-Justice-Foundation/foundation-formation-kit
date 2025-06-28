import { object, z } from "zod";

export const form1023Part6FinancialDataYesNoRadioSchema = object({
  input: z.enum(
    [
      "You completed less than one tax year.",
      "You completed at least one tax year but fewer than five.",
      "You completed five or more tax years.",
    ],
    {
      required_error: "Required",
    },
  ),
});
