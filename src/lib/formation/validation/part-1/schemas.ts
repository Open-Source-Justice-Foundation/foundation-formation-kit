import {
  CARE_OF_NAME_INVALID_TYPE_ERR_MSG,
  CARE_OF_NAME_MAX_LENGTH,
  CARE_OF_NAME_MAX_LENGTH_ERR_MSG,
  CARE_OF_NAME_NON_EMPTY_ERR_MSG,
  CARE_OF_NAME_REQUIRED_ERR_MSG,
  CITY_INVALID_TYPE_ERR_MSG,
  CITY_MAX_LENGTH,
  CITY_MAX_LENGTH_ERR_MSG,
  CITY_NON_EMPTY_ERR_MSG,
  CITY_REQUIRED_ERR_MSG,
  CONTACT_TELEPHONE_NUMBER_INVALID_TYPE_ERR_MSG,
  CONTACT_TELEPHONE_NUMBER_MAX_LENGTH,
  CONTACT_TELEPHONE_NUMBER_MAX_LENGTH_ERR_MSG,
  CONTACT_TELEPHONE_NUMBER_NON_EMPTY_ERR_MSG,
  CONTACT_TELEPHONE_NUMBER_REQUIRED_ERR_MSG,
  COUNTRY_INVALID_TYPE_ERR_MSG,
  COUNTRY_NON_EMPTY_ERR_MSG,
  COUNTRY_REQUIRED_ERR_MSG,
  EMPLOYER_IDENTIFICATION_NUMBER_INVALID_TYPE_ERR_MSG,
  EMPLOYER_IDENTIFICATION_NUMBER_MAX_LENGTH,
  EMPLOYER_IDENTIFICATION_NUMBER_MAX_LENGTH_ERR_MSG,
  EMPLOYER_IDENTIFICATION_NUMBER_NON_EMPTY_ERR_MSG,
  EMPLOYER_IDENTIFICATION_NUMBER_REQUIRED_ERR_MSG,
  FAX_NUMBER_INVALID_TYPE_ERR_MSG,
  FAX_NUMBER_MAX_LENGTH,
  FAX_NUMBER_MAX_LENGTH_ERR_MSG,
  FAX_NUMBER_NON_EMPTY_ERR_MSG,
  FAX_NUMBER_REQUIRED_ERR_MSG,
  FIRST_NAME_INVALID_TYPE_ERR_MSG,
  FIRST_NAME_MAX_LENGTH,
  FIRST_NAME_MAX_LENGTH_ERR_MSG,
  FIRST_NAME_NON_EMPTY_ERR_MSG,
  FIRST_NAME_REQUIRED_ERR_MSG,
  FULL_NAME_OF_ORGANIZATION_INVALID_TYPE_ERR_MSG,
  FULL_NAME_OF_ORGANIZATION_MAX_LENGTH,
  FULL_NAME_OF_ORGANIZATION_MAX_LENGTH_ERR_MSG,
  FULL_NAME_OF_ORGANIZATION_NON_EMPTY_ERR_MSG,
  FULL_NAME_OF_ORGANIZATION_REQUIRED_ERR_MSG,
  LAST_NAME_INVALID_TYPE_ERR_MSG,
  LAST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH_ERR_MSG,
  LAST_NAME_NON_EMPTY_ERR_MSG,
  LAST_NAME_REQUIRED_ERR_MSG,
  MAILING_ADDRESS_INVALID_TYPE_ERR_MSG,
  MAILING_ADDRESS_MAX_LENGTH,
  MAILING_ADDRESS_MAX_LENGTH_ERR_MSG,
  MAILING_ADDRESS_NON_EMPTY_ERR_MSG,
  MAILING_ADDRESS_REQUIRED_ERR_MSG,
  MONTH_TAX_YEAR_ENDS_INVALID_TYPE_ERR_MSG,
  MONTH_TAX_YEAR_ENDS_NON_EMPTY_ERR_MSG,
  MONTH_TAX_YEAR_ENDS_REQUIRED_ERR_MSG,
  ORGANIZATIONS_WEBSITE_INVALID_TYPE_ERR_MSG,
  ORGANIZATIONS_WEBSITE_MAX_LENGTH,
  ORGANIZATIONS_WEBSITE_MAX_LENGTH_ERR_MSG,
  ORGANIZATIONS_WEBSITE_NON_EMPTY_ERR_MSG,
  ORGANIZATIONS_WEBSITE_REQUIRED_ERR_MSG,
  PERSON_TO_CONTACT_INVALID_TYPE_ERR_MSG,
  PERSON_TO_CONTACT_MAX_LENGTH,
  PERSON_TO_CONTACT_MAX_LENGTH_ERR_MSG,
  PERSON_TO_CONTACT_NON_EMPTY_ERR_MSG,
  PERSON_TO_CONTACT_REQUIRED_ERR_MSG,
  STATE_INVALID_TYPE_ERR_MSG,
  STATE_NON_EMPTY_ERR_MSG,
  STATE_REQUIRED_ERR_MSG,
  TITLE_INVALID_TYPE_ERR_MSG,
  TITLE_MAX_LENGTH,
  TITLE_MAX_LENGTH_ERR_MSG,
  TITLE_NON_EMPTY_ERR_MSG,
  TITLE_REQUIRED_ERR_MSG,
  USER_FEE_SUBMITTED_INVALID_TYPE_ERR_MSG,
  USER_FEE_SUBMITTED_MAX_LENGTH,
  USER_FEE_SUBMITTED_MAX_LENGTH_ERR_MSG,
  USER_FEE_SUBMITTED_NON_EMPTY_ERR_MSG,
  USER_FEE_SUBMITTED_REQUIRED_ERR_MSG,
  ZIP_CODE_INVALID_TYPE_ERR_MSG,
  ZIP_CODE_MAX_LENGTH,
  ZIP_CODE_MAX_LENGTH_ERR_MSG,
  ZIP_CODE_NON_EMPTY_ERR_MSG,
  ZIP_CODE_PLUS_FOUR_INVALID_TYPE_ERR_MSG,
  ZIP_CODE_PLUS_FOUR_MAX_LENGTH,
  ZIP_CODE_PLUS_FOUR_MAX_LENGTH_ERR_MSG,
  ZIP_CODE_PLUS_FOUR_NON_EMPTY_ERR_MSG,
  ZIP_CODE_PLUS_FOUR_REQUIRED_ERR_MSG,
  ZIP_CODE_REQUIRED_ERR_MSG,
} from "~/lib/formation/constants/part-1/constants";
import { object, string } from "zod";

export const form1023Part1IdentificationOfApplicantStep1Schema = object({
  fullNameOfOrganization: string({
    required_error: FULL_NAME_OF_ORGANIZATION_REQUIRED_ERR_MSG,
    invalid_type_error: FULL_NAME_OF_ORGANIZATION_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: FULL_NAME_OF_ORGANIZATION_NON_EMPTY_ERR_MSG })
    .max(FULL_NAME_OF_ORGANIZATION_MAX_LENGTH, {
      message: FULL_NAME_OF_ORGANIZATION_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
  careOfName: string({
    required_error: CARE_OF_NAME_REQUIRED_ERR_MSG,
    invalid_type_error: CARE_OF_NAME_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: CARE_OF_NAME_NON_EMPTY_ERR_MSG })
    .max(CARE_OF_NAME_MAX_LENGTH, {
      message: CARE_OF_NAME_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
  mailingAddress: string({
    required_error: MAILING_ADDRESS_REQUIRED_ERR_MSG,
    invalid_type_error: MAILING_ADDRESS_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: MAILING_ADDRESS_NON_EMPTY_ERR_MSG })
    .max(MAILING_ADDRESS_MAX_LENGTH, {
      message: MAILING_ADDRESS_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
  city: string({
    required_error: CITY_REQUIRED_ERR_MSG,
    invalid_type_error: CITY_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: CITY_NON_EMPTY_ERR_MSG })
    .max(CITY_MAX_LENGTH, {
      message: CITY_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
  country: string({
    required_error: COUNTRY_REQUIRED_ERR_MSG,
    invalid_type_error: COUNTRY_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: COUNTRY_NON_EMPTY_ERR_MSG })
    .trim(),
  state: string({
    required_error: STATE_REQUIRED_ERR_MSG,
    invalid_type_error: STATE_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: STATE_NON_EMPTY_ERR_MSG })
    .trim(),
  zipCodePlusFour: string({
    required_error: ZIP_CODE_PLUS_FOUR_REQUIRED_ERR_MSG,
    invalid_type_error: ZIP_CODE_PLUS_FOUR_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: ZIP_CODE_PLUS_FOUR_NON_EMPTY_ERR_MSG })
    .max(ZIP_CODE_PLUS_FOUR_MAX_LENGTH, {
      message: ZIP_CODE_PLUS_FOUR_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
});

export const form1023Part1IdentificationOfApplicantStep2Schema = object({
  employerIdentificationNumber: string({
    required_error: EMPLOYER_IDENTIFICATION_NUMBER_REQUIRED_ERR_MSG,
    invalid_type_error: EMPLOYER_IDENTIFICATION_NUMBER_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: EMPLOYER_IDENTIFICATION_NUMBER_NON_EMPTY_ERR_MSG })
    .max(EMPLOYER_IDENTIFICATION_NUMBER_MAX_LENGTH, {
      message: EMPLOYER_IDENTIFICATION_NUMBER_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
});

export const form1023Part1IdentificationOfApplicantStep3Schema = object({
  monthTaxYearEnds: string({
    required_error: MONTH_TAX_YEAR_ENDS_REQUIRED_ERR_MSG,
    invalid_type_error: MONTH_TAX_YEAR_ENDS_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: MONTH_TAX_YEAR_ENDS_NON_EMPTY_ERR_MSG })
    .trim(),
});

export const form1023Part1IdentificationOfApplicantStep4Schema = object({
  personToContact: string({
    required_error: PERSON_TO_CONTACT_REQUIRED_ERR_MSG,
    invalid_type_error: PERSON_TO_CONTACT_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: PERSON_TO_CONTACT_NON_EMPTY_ERR_MSG })
    .max(PERSON_TO_CONTACT_MAX_LENGTH, {
      message: PERSON_TO_CONTACT_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
});

export const form1023Part1IdentificationOfApplicantStep5Schema = object({
  contactTelephoneNumber: string({
    required_error: CONTACT_TELEPHONE_NUMBER_REQUIRED_ERR_MSG,
    invalid_type_error: CONTACT_TELEPHONE_NUMBER_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: CONTACT_TELEPHONE_NUMBER_NON_EMPTY_ERR_MSG })
    .max(CONTACT_TELEPHONE_NUMBER_MAX_LENGTH, {
      message: CONTACT_TELEPHONE_NUMBER_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
});

export const form1023Part1IdentificationOfApplicantStep6Schema = object({
  faxNumber: string({
    required_error: FAX_NUMBER_REQUIRED_ERR_MSG,
    invalid_type_error: FAX_NUMBER_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: FAX_NUMBER_NON_EMPTY_ERR_MSG })
    .max(FAX_NUMBER_MAX_LENGTH, {
      message: FAX_NUMBER_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
});

export const form1023Part1IdentificationOfApplicantStep7Schema = object({
  userFeeSubmitted: string({
    required_error: USER_FEE_SUBMITTED_REQUIRED_ERR_MSG,
    invalid_type_error: USER_FEE_SUBMITTED_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: USER_FEE_SUBMITTED_NON_EMPTY_ERR_MSG })
    .max(USER_FEE_SUBMITTED_MAX_LENGTH, {
      message: USER_FEE_SUBMITTED_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
});

export const form1023Part1IdentificationOfApplicantStep8Schema = object({
  organizationsWebsite: string({
    required_error: ORGANIZATIONS_WEBSITE_REQUIRED_ERR_MSG,
    invalid_type_error: ORGANIZATIONS_WEBSITE_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: ORGANIZATIONS_WEBSITE_NON_EMPTY_ERR_MSG })
    .max(ORGANIZATIONS_WEBSITE_MAX_LENGTH, {
      message: ORGANIZATIONS_WEBSITE_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
});

export const form1023Part1IdentificationOfApplicantStep9Schema = object({
  firstName: string({
    required_error: FIRST_NAME_REQUIRED_ERR_MSG,
    invalid_type_error: FIRST_NAME_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: FIRST_NAME_NON_EMPTY_ERR_MSG })
    .max(FIRST_NAME_MAX_LENGTH, {
      message: FIRST_NAME_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
  lastName: string({
    required_error: LAST_NAME_REQUIRED_ERR_MSG,
    invalid_type_error: LAST_NAME_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: LAST_NAME_NON_EMPTY_ERR_MSG })
    .max(LAST_NAME_MAX_LENGTH, {
      message: LAST_NAME_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
  title: string({
    required_error: TITLE_REQUIRED_ERR_MSG,
    invalid_type_error: TITLE_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: TITLE_NON_EMPTY_ERR_MSG })
    .max(TITLE_MAX_LENGTH, {
      message: TITLE_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
  mailingAddress: string({
    required_error: MAILING_ADDRESS_REQUIRED_ERR_MSG,
    invalid_type_error: MAILING_ADDRESS_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: MAILING_ADDRESS_NON_EMPTY_ERR_MSG })
    .max(MAILING_ADDRESS_MAX_LENGTH, {
      message: MAILING_ADDRESS_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
  city: string({
    required_error: CITY_REQUIRED_ERR_MSG,
    invalid_type_error: CITY_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: CITY_NON_EMPTY_ERR_MSG })
    .max(CITY_MAX_LENGTH, {
      message: CITY_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
  state: string({
    required_error: STATE_REQUIRED_ERR_MSG,
    invalid_type_error: STATE_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: STATE_NON_EMPTY_ERR_MSG })
    .trim(),
  zipCode: string({
    required_error: ZIP_CODE_REQUIRED_ERR_MSG,
    invalid_type_error: ZIP_CODE_INVALID_TYPE_ERR_MSG,
  })
    .nonempty({ message: ZIP_CODE_NON_EMPTY_ERR_MSG })
    .max(ZIP_CODE_MAX_LENGTH, {
      message: ZIP_CODE_MAX_LENGTH_ERR_MSG,
    })
    .trim(),
});
