// Form 1023 Part 7 Foundation Classification

export const FOUNDATION_CLASSIFICATIONS = [
  {
    id: "509-a-1-and-170-b-1-A-vi",
    label:
      "You are described in 509(a)(1) and 170(b)(1)(A)(vi) as an organization that receives a substantial part of its financial support in the form of contributions from publicly supported organizations, from a governmental unit, or from the general public.",
  },
  {
    id: "509-a-2",
    label:
      "You are described in 509(a)(2) as an organization that normally receives not more than one-third of its financial support from gross investment income and receives more than one-third of its financial support from contributions, membership fees, and gross receipts from activities related to its exempt functions (subject to certain exceptions).",
  },
  {
    id: "509-a-1-and-170-b-1-A-i",
    label:
      "You are described in 509(a)(1) and 170(b)(1)(A)(i) as a church or a convention or association of churches. Complete Schedule A.",
  },
  {
    id: "509-a-1-and-170-b-1-A-ii",
    label:
      "You are described in 509(a)(1) and 170(b)(1)(A)(ii) as a school. Complete Schedule B.",
  },
  {
    id: "509-a-1-and-170-b-1-A-iii",
    label:
      "You are described in 509(a)(1) and 170(b)(1)(A)(iii) as a hospital, a cooperative hospital service organization, or a medical research organization operated in conjunction with a hospital. Complete Schedule C.",
  },
  {
    id: "509-a-1-and-170-b-1-A-iv",
    label:
      "You are described in 509(a)(1) and 170(b)(1)(A)(iv) as an organization operated for the benefit of a college or university that is owned or operated by a governmental unit.",
  },
  {
    id: "509-a-1-and-170-b-1-A-ix",
    label:
      "You are described in 509(a)(1) and 170(b)(1)(A)(ix) as an agricultural research organization directly engaged in the continuous active conduct of agricultural research in conjunction with a college or university.",
  },
  {
    id: "509-a-3",
    label:
      "You are described in 509(a)(3) as an organization supporting either one or more organizations described in 509(a)(1) or 509(a)(2) or a publicly supported section 501(c)(4), (5), or (6) organization. Complete Schedule D.",
  },
  {
    id: "509-a-4",
    label:
      "You are described in 509(a)(4) as an organization organized and operated exclusively for testing for public safety.",
  },
  {
    id: "publicly-supported-organization",
    label:
      "You are a publicly supported organization and would like the IRS to decide your correct classification.",
  },
  {
    id: "private-foundation",
    label: "You are a private foundation.",
  },
];
export const FOUNDATION_CLASSIFICATION_REQUIRED_ERR_MSG = "Required";

// TODO
// Make optional
export const PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_CONFIRMATION_CHECKBOX = [
  {
    id: "private-foundation-special-provisions-confirmation-checkbox",
    label:
      "As a private foundation, section 508(e) requires special provisions in your organizing document in addition to those that apply to all organizations described in section 501(c)(3). Check this box to confirm that your organizing document includes these provisions or you rely on state law.",
  },
];
export const PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_CONFIRMATION_CHECKBOX_REQUIRED_ERR_MSG =
  "Required";

export const PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_REFERENCE_MAX_LENGTH = 1000;
export const PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_REFERENCE_REQUIRED_ERR_MSG =
  "Required";
export const PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_REFERENCE_INVALID_TYPE_ERR_MSG =
  "Input must be a string";
export const PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_REFERENCE_NON_EMPTY_ERR_MSG =
  "Required";
export const PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_REFERENCE_MAX_LENGTH_ERR_MSG = `Input can be at most ${PRIVATE_FOUNDATION_SPECIAL_PROVISIONS_REFERENCE_MAX_LENGTH} characters`;

export const EDUCATIONAL_SUPPORT_REQUIRED_ERR_MSG = "Required";

export const PRIVATE_OPERATING_FOUNDATION_CONFIRMATION_REQUIRED_ERR_MSG =
  "Required";

export const PRIVATE_OPERATING_FOUNDATION_STATUS_EXPLANATION_MAX_LENGTH = 1000;
export const PRIVATE_OPERATING_FOUNDATION_STATUS_EXPLANATION_REQUIRED_ERR_MSG =
  "Required";
export const PRIVATE_OPERATING_FOUNDATION_STATUS_EXPLANATION_INVALID_TYPE_ERR_MSG =
  "Input must be a string";
export const PRIVATE_OPERATING_FOUNDATION_STATUS_EXPLANATION_NON_EMPTY_ERR_MSG =
  "Required";
export const PRIVATE_OPERATING_FOUNDATION_STATUS_EXPLANATION_MAX_LENGTH_ERR_MSG = `Input can be at most ${PRIVATE_OPERATING_FOUNDATION_STATUS_EXPLANATION_MAX_LENGTH} characters`;
