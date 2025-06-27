import {
  ADOPTED_BYLAWS_REQUIRED_ERR_MSG,
  DATE_YOU_FORMED_REQUIRED_ERR_MSG,
  ORGANIZATION_TYPE_REQUIRED_ERR_MSG,
  STATE_OF_FORMATION_INVALID_TYPE_ERR_MSG,
  STATE_OF_FORMATION_NON_EMPTY_ERR_MSG,
  STATE_OF_FORMATION_REQUIRED_ERR_MSG,
  SUCCESSOR_TO_ANOTHER_ORGANIZATION_REQUIRED_ERR_MSG,
} from "~/lib/formation/constants/part-2/constants";
import { date, object, string, z } from "zod";

// TODO
// Should invalid_type_error be added?
// Should nonempty be added?
// Should other validation checks be added?
export const form1023Part2OrganizationalStructureStep1Schema = object({
  organizationType: z.enum(
    [
      "Corporation",
      "Limited Liability Company (LLC)",
      "Unincorporated Association",
      "Trust",
    ],
    {
      required_error: ORGANIZATION_TYPE_REQUIRED_ERR_MSG,
    },
  ),
});

export const form1023Part2OrganizationalStructureStep2Schema = object({
  dateYouFormed: date({
    required_error: DATE_YOU_FORMED_REQUIRED_ERR_MSG,
  }),
});

export const form1023Part2OrganizationalStructureStep3Schema = object({
  stateOfFormation: string({
    required_error: STATE_OF_FORMATION_REQUIRED_ERR_MSG,
    invalid_type_error: STATE_OF_FORMATION_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: STATE_OF_FORMATION_NON_EMPTY_ERR_MSG })
    .trim(),
});

export const form1023Part2OrganizationalStructureStep4Schema = object({
  adoptedBylaws: z.enum(["Yes", "No"], {
    required_error: ADOPTED_BYLAWS_REQUIRED_ERR_MSG,
  }),
  adoptedBylawsNoResponseExplanation: string({
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

export const form1023Part2OrganizationalStructureStep5Schema = object({
  successorToAnotherOrganization: z.enum(["Yes", "No"], {
    required_error: SUCCESSOR_TO_ANOTHER_ORGANIZATION_REQUIRED_ERR_MSG,
  }),
});
