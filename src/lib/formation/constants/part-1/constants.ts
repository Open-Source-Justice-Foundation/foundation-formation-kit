// Form 1023 Part 1 Identification Of Applicant

// Full name of organization
export const FULL_NAME_OF_ORGANIZATION_MAX_LENGTH = 255;
export const FULL_NAME_OF_ORGANIZATION_REQUIRED_ERR_MSG =
  "Full name of organization is required";
export const FULL_NAME_OF_ORGANIZATION_INVALID_TYPE_ERR_MSG =
  "Full name of organization must be a string";
export const FULL_NAME_OF_ORGANIZATION_NON_EMPTY_ERR_MSG =
  "Full name of organization is required";
export const FULL_NAME_OF_ORGANIZATION_MAX_LENGTH_ERR_MSG = `Full name of organization can be at most ${FULL_NAME_OF_ORGANIZATION_MAX_LENGTH} characters`;

// Care of name (optional)
// TODO
// Should be optional, not required
export const CARE_OF_NAME_MAX_LENGTH = 255;
export const CARE_OF_NAME_REQUIRED_ERR_MSG = "Care of name is required";
export const CARE_OF_NAME_INVALID_TYPE_ERR_MSG =
  "Care of name must be a string";
export const CARE_OF_NAME_NON_EMPTY_ERR_MSG = "Care of name is required";
export const CARE_OF_NAME_MAX_LENGTH_ERR_MSG = `Care of name can be at most ${CARE_OF_NAME_MAX_LENGTH} characters`;

// Mailing address
// TODO
// Look into an address autocomplete and verifier
export const MAILING_ADDRESS_MAX_LENGTH = 255;
export const MAILING_ADDRESS_REQUIRED_ERR_MSG = "Mailing address is required";
export const MAILING_ADDRESS_INVALID_TYPE_ERR_MSG =
  "Mailing address must be a string";
export const MAILING_ADDRESS_NON_EMPTY_ERR_MSG = "Mailing address is required";
export const MAILING_ADDRESS_MAX_LENGTH_ERR_MSG = `Mailing address can be at most ${MAILING_ADDRESS_MAX_LENGTH} characters`;

// City
// TODO
// Look into a city autocomplete and verifier based on address
export const CITY_MAX_LENGTH = 255;
export const CITY_REQUIRED_ERR_MSG = "City is required";
export const CITY_INVALID_TYPE_ERR_MSG = "City must be a string";
export const CITY_NON_EMPTY_ERR_MSG = "City is required";
export const CITY_MAX_LENGTH_ERR_MSG = `City can be at most ${CITY_MAX_LENGTH} characters`;

// Country
// TODO
// Look into a country autocomplete and verifier based on address
export const COUNTRY_REQUIRED_ERR_MSG = "Country is required";
export const COUNTRY_INVALID_TYPE_ERR_MSG = "Country must be a string";
export const COUNTRY_NON_EMPTY_ERR_MSG = "Country is required";
export const SUPPORTED_COUNTRIES = [
  {
    value: "United States",
    label: "United States",
  },
];

// State
// TODO
// Look into a state autocomplete and verifier based on address
export const STATE_REQUIRED_ERR_MSG = "State is required";
export const STATE_INVALID_TYPE_ERR_MSG = "State must be a string";
export const STATE_NON_EMPTY_ERR_MSG = "State is required";
export const SUPPORTED_STATE_ABBREVIATIONS = [
  {
    value: "DE",
    label: "DE",
  },
];

// Zip Code + 4
// TODO
// Look into a zip code + 4 autocomplete and verifier based on address
export const ZIP_CODE_PLUS_FOUR_MAX_LENGTH = 9;
export const ZIP_CODE_PLUS_FOUR_REQUIRED_ERR_MSG = "Zip code is required";
export const ZIP_CODE_PLUS_FOUR_INVALID_TYPE_ERR_MSG =
  "Zip code must be a string";
export const ZIP_CODE_PLUS_FOUR_NON_EMPTY_ERR_MSG = "Zip code is required";
export const ZIP_CODE_PLUS_FOUR_MAX_LENGTH_ERR_MSG = `Zip code can be at most ${ZIP_CODE_PLUS_FOUR_MAX_LENGTH} characters`;

// Employer identification number
export const EMPLOYER_IDENTIFICATION_NUMBER_MAX_LENGTH = 10;
export const EMPLOYER_IDENTIFICATION_NUMBER_REQUIRED_ERR_MSG =
  "Employer identification number is required";
export const EMPLOYER_IDENTIFICATION_NUMBER_INVALID_TYPE_ERR_MSG =
  "Employer identification number must be a string";
export const EMPLOYER_IDENTIFICATION_NUMBER_NON_EMPTY_ERR_MSG =
  "Employer identification number is required";
export const EMPLOYER_IDENTIFICATION_NUMBER_MAX_LENGTH_ERR_MSG = `Employer identification number can be at most ${EMPLOYER_IDENTIFICATION_NUMBER_MAX_LENGTH} characters`;

// Month tax year ends
export const MONTH_TAX_YEAR_ENDS_REQUIRED_ERR_MSG =
  "Month tax year is required";
export const MONTH_TAX_YEAR_ENDS_INVALID_TYPE_ERR_MSG =
  "Month tax year must be a string";
export const MONTH_TAX_YEAR_ENDS_NON_EMPTY_ERR_MSG =
  "Month tax year is required";
export const MONTHS_TAX_YEAR_ENDS = [
  {
    value: "January",
    label: "January",
  },
  {
    value: "February",
    label: "February",
  },
  {
    value: "March",
    label: "March",
  },
  {
    value: "April",
    label: "April",
  },
  {
    value: "May",
    label: "May",
  },
  {
    value: "June",
    label: "June",
  },
  {
    value: "July",
    label: "July",
  },
  {
    value: "August",
    label: "August",
  },
  {
    value: "September",
    label: "September",
  },
  {
    value: "October",
    label: "October",
  },
  {
    value: "November",
    label: "November",
  },
  {
    value: "December",
    label: "December",
  },
];

// Person to contact if more information is needed
export const PERSON_TO_CONTACT_MAX_LENGTH = 255;
export const PERSON_TO_CONTACT_REQUIRED_ERR_MSG =
  "Person to contact is required";
export const PERSON_TO_CONTACT_INVALID_TYPE_ERR_MSG =
  "Person to contact must be a string";
export const PERSON_TO_CONTACT_NON_EMPTY_ERR_MSG =
  "Person to contact is required";
export const PERSON_TO_CONTACT_MAX_LENGTH_ERR_MSG = `Person to contact can be at most ${PERSON_TO_CONTACT_MAX_LENGTH} characters`;

// Contact telephone number
export const CONTACT_TELEPHONE_NUMBER_MAX_LENGTH = 10;
export const CONTACT_TELEPHONE_NUMBER_REQUIRED_ERR_MSG =
  "Contact telephone number is required";
export const CONTACT_TELEPHONE_NUMBER_INVALID_TYPE_ERR_MSG =
  "Contact telephone number must be a string";
export const CONTACT_TELEPHONE_NUMBER_NON_EMPTY_ERR_MSG =
  "Contact telephone number is required";
export const CONTACT_TELEPHONE_NUMBER_MAX_LENGTH_ERR_MSG = `Contact telephone number can be at most ${CONTACT_TELEPHONE_NUMBER_MAX_LENGTH} characters`;

// Fax number (optional)
// TODO
// Should be optional, not required
export const FAX_NUMBER_MAX_LENGTH = 10;
export const FAX_NUMBER_REQUIRED_ERR_MSG = "Fax number is required";
export const FAX_NUMBER_INVALID_TYPE_ERR_MSG = "Fax number must be a string";
export const FAX_NUMBER_NON_EMPTY_ERR_MSG = "Fax number is required";
export const FAX_NUMBER_MAX_LENGTH_ERR_MSG = `Fax number can be at most ${FAX_NUMBER_MAX_LENGTH} characters`;

// User fee submitted
export const USER_FEE_SUBMITTED_MAX_LENGTH = 8;
export const USER_FEE_SUBMITTED_REQUIRED_ERR_MSG =
  "User fee submitted is required";
export const USER_FEE_SUBMITTED_INVALID_TYPE_ERR_MSG =
  "User fee submitted must be a string";
export const USER_FEE_SUBMITTED_NON_EMPTY_ERR_MSG =
  "User fee submitted is required";
export const USER_FEE_SUBMITTED_MAX_LENGTH_ERR_MSG = `User fee submitted can be at most ${USER_FEE_SUBMITTED_MAX_LENGTH} characters`;

// TODO
// URL validation & make it optional
// Organization's website (if available)
export const ORGANIZATIONS_WEBSITE_MAX_LENGTH = 255;
export const ORGANIZATIONS_WEBSITE_REQUIRED_ERR_MSG =
  "Organization's website is required";
export const ORGANIZATIONS_WEBSITE_INVALID_TYPE_ERR_MSG =
  "Organization's website must be a string";
export const ORGANIZATIONS_WEBSITE_NON_EMPTY_ERR_MSG =
  "Organization's website is required";
export const ORGANIZATIONS_WEBSITE_MAX_LENGTH_ERR_MSG = `Organization's website can be at most ${ORGANIZATIONS_WEBSITE_MAX_LENGTH} characters`;

// Names, titles, and mailing addresses of officers, directors, and/or trustees
// Mailing address - use same as before for now
// City - use same as before for now
// State (or Province) - use same as before for now

// First name
export const FIRST_NAME_MAX_LENGTH = 255;
export const FIRST_NAME_REQUIRED_ERR_MSG = "First name is required";
export const FIRST_NAME_INVALID_TYPE_ERR_MSG = "First name must be a string";
export const FIRST_NAME_NON_EMPTY_ERR_MSG = "First name is required";
export const FIRST_NAME_MAX_LENGTH_ERR_MSG = `First name can be at most ${FIRST_NAME_MAX_LENGTH} characters`;

// Last name
export const LAST_NAME_MAX_LENGTH = 255;
export const LAST_NAME_REQUIRED_ERR_MSG = "Last name is required";
export const LAST_NAME_INVALID_TYPE_ERR_MSG = "Last name must be a string";
export const LAST_NAME_NON_EMPTY_ERR_MSG = "Last name is required";
export const LAST_NAME_MAX_LENGTH_ERR_MSG = `Last name can be at most ${LAST_NAME_MAX_LENGTH} characters`;

// Title
export const TITLE_MAX_LENGTH = 255;
export const TITLE_REQUIRED_ERR_MSG = "Title is required";
export const TITLE_INVALID_TYPE_ERR_MSG = "Title must be a string";
export const TITLE_NON_EMPTY_ERR_MSG = "Title is required";
export const TITLE_MAX_LENGTH_ERR_MSG = `Title can be at most ${TITLE_MAX_LENGTH} characters`;

// Zip Code (or Foreign Postal Code)
// TODO
// Don't support foreign postal code for now
// Look into a zip code autocomplete and verifier based on address
export const ZIP_CODE_MAX_LENGTH = 5;
export const ZIP_CODE_REQUIRED_ERR_MSG = "Zip code is required";
export const ZIP_CODE_INVALID_TYPE_ERR_MSG = "Zip code must be a string";
export const ZIP_CODE_NON_EMPTY_ERR_MSG = "Zip code is required";
export const ZIP_CODE_MAX_LENGTH_ERR_MSG = `Zip code can be at most ${ZIP_CODE_MAX_LENGTH} characters`;
