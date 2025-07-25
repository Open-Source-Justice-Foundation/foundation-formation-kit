import { object, string, z } from "zod";

export const form1023ScheduleAChurchesYesNoRadioSchema = object({
  radioInput: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
});

export const form1023ScheduleAChurchesYesNoRadioWithTextAreaSchema = object({
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

export const form1023ScheduleAChurchesTextAreaSchema = object({
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

export const form1023ScheduleAChurchesStep7Schema = object({
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
  averageAttendance: string({
    required_error: "Required",
    invalid_type_error: "Input must be a string",
  })
    .nonempty({ message: "Required" })
    .max(1000, {
      message: "Input can be at most 1000 characters",
    })
    .trim(),
});

export const form1023ScheduleAChurchesStep9Schema = object({
  input1: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  input2: string({
    required_error: "Required",
    invalid_type_error: "Input must be a string",
  })
    .nonempty({
      message: "Required",
    })
    .max(100, {
      message: "Input can be at most 100 characters",
    })
    .trim(),
  input3: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  input4: string({
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
  input5: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  input6: string({
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
  input7: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  input8: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
});
