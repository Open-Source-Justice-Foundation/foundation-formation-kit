import { object, string, z } from "zod";

export const form1023ScheduleCYesNoRadioSchema = object({
  radioInput: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
});

export const form1023ScheduleCYesNoRadioWithTextAreaSchema = object({
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

export const form1023ScheduleCStep1Schema = object({
  medicalResearchOrganizationStatus: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  hospitalRelationshipsDescription: string({
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
  assetsDescription: string({
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

export const form1023ScheduleCStep5Schema = object({
  fullTimeEmergencyRoomStatus: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  specialtyHospitalStatus: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
});
