/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegistrationMutation
// ====================================================

export interface RegistrationMutation_newRegistration {
  __typename: "Tenant";
  /**
   * Tenant fqdn
   */
  fqdn: string;
}

export interface RegistrationMutation {
  /**
   * Create new registration and send activation mail if success.
   */
  newRegistration: RegistrationMutation_newRegistration;
}

export interface RegistrationMutationVariables {
  company: string;
  mail: string;
  fullName: string;
  password: string;
  passwordConfirm: string;
  captcha: string;
  siteAddress: string;
}
