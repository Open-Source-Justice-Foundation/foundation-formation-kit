import { object, string, z } from "zod";

export const form1023ScheduleGYesNoRadioWithTextAreaSchema = object({
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

export const form1023ScheduleGTextAreaSchema = object({
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
