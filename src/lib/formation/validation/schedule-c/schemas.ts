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

export const form1023ScheduleCStep9Schema = object({
  boardOfDirectorsCommunityRepresentationStatus: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  boardOfDirectorsDescription: string({
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

export const form1023ScheduleCStep10Schema = object({
  facilityRequirementsStatus: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  communityHealthNeedsAssessmentStatus: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  communityHealthNeedsAssessmentDescription: string({
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
  financialAssistancePolicyStatus: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  financialAssistancePolicyDescription: string({
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
  financialAssistancePolicyChargesStatus: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  financialAssistancePolicyChargesDescription: string({
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
  financialAssistancePolicyEffortsStatus: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  financialAssistancePolicyEffortsDescription: string({
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
