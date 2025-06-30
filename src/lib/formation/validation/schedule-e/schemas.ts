import { object, z } from "zod";

export const form1023ScheduleEYesNoRadioSchema = object({
  radioInput: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
});
