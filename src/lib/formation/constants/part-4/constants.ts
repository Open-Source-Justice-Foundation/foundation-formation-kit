// Form 1023 Part 4 Your Activites

// Past, present, and planned activites
export const PAST_PRESENT_AND_PLANNED_ACTIVITIES_MAX_LENGTH = 1000;
export const PAST_PRESENT_AND_PLANNED_ACTIVITIES_REQUIRED_ERR_MSG = "Required";
export const PAST_PRESENT_AND_PLANNED_ACTIVITIES_INVALID_TYPE_ERR_MSG =
  "Input must be a string";
export const PAST_PRESENT_AND_PLANNED_ACTIVITIES_NON_EMPTY_ERR_MSG = "Required";
export const PAST_PRESENT_AND_PLANNED_ACTIVITIES_MAX_LENGTH_ERR_MSG = `Input can be at most ${PAST_PRESENT_AND_PLANNED_ACTIVITIES_MAX_LENGTH} characters`;

// NTEE code
export const NTEE_CODE_MAX_LENGTH = 3;
export const NTEE_CODE_REQUIRED_ERR_MSG = "Required";
export const NTEE_CODE_INVALID_TYPE_ERR_MSG = "Input must be a string";
export const NTEE_CODE_NON_EMPTY_ERR_MSG = "Required";
export const NTEE_CODE_MAX_LENGTH_ERR_MSG = `Input can be at most ${NTEE_CODE_MAX_LENGTH} characters`;

// TODO
// Make this optional
export const SELECT_NTEE_CODE_BY_IRS = [
  {
    id: "select-ntee-code-by-irs",
    label:
      "Or check here if you want the IRS to select the NTEE code that best describes your activities.",
  },
];
export const SELECT_NTEE_CODE_BY_IRS_REQUIRED_ERR_MSG = "Required";

// Programs limiting provision of goods, services, or funds
export const PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_REQUIRED_ERR_MSG =
  "Required";

export const PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_EXPLANATION_MAX_LENGTH = 1000;
export const PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_EXPLANATION_REQUIRED_ERR_MSG =
  "Required";
export const PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_EXPLANATION_INVALID_TYPE_ERR_MSG =
  "Input must be a string";
export const PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_EXPLANATION_NON_EMPTY_ERR_MSG =
  "Required";
export const PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_EXPLANATION_MAX_LENGTH_ERR_MSG = `Input can be at most ${PROGRAMS_LIMIT_PROVISION_OF_GOODS_SERVICES_OR_FUNDS_EXPLANATION_MAX_LENGTH} characters`;

// Fundraising activities
export const FUNDRAISING_ACTIVITIES = [
  {
    id: "website-mail-email-personal-and-or-phone-solicitations",
    label: "Website, mail, email, personal, and/or phone solicitations",
  },
  {
    id: "foundation-grant-solicitations",
    label: "Foundation grant solicitations",
  },
  {
    id: "receive-donations-from-another-organizations-website",
    label: "Receive donations from another organization's website",
  },
  {
    id: "government-grant-solicitations",
    label: "Government grant solicitations",
  },
  {
    id: "bingo",
    label: "Bingo",
  },
  {
    id: "other-non-bingo-gaming-activities",
    label: "Other (non-bingo) gaming activities",
  },
  {
    id: "other-describe",
    label: "Other (describe)",
  },
  {
    id: "we-will-not-engage-in-fundraising-activities",
    label: "We will not engage in fundraising activities.",
  },
];

export const FUNDRAISING_ACTIVITIES_REQUIRED_ERR_MSG = "Required";
