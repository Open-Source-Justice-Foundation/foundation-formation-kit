import { array, object, string, z } from "zod";

export const form1023ScheduleBYesNoRadioSchema = object({
  radioInput: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
});

export const form1023ScheduleBYesNoRadioWithTextAreaSchema = object({
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

export const form1023ScheduleBTextAreaSchema = object({
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

export const form1023ScheduleBStep2Schema = object({
  input1: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  input2: array(string()).refine((value) => value.some((item) => item), {
    message: "Required",
  }),
  input3: string({
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

export const form1023ScheduleBStep8Schema = object({
  radioInput: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  confirmStudentPolicyInContent: array(string()).refine(
    (value) => value.some((item) => item),
    {
      message: "Required",
    },
  ),
});

export const form1023ScheduleBStep9Schema = object({
  radioInput: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  confirmStudentPolicyAwareness: array(string()).refine(
    (value) => value.some((item) => item),
    {
      message: "Required",
    },
  ),
});
