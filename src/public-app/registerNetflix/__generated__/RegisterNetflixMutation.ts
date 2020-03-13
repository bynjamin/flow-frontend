/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterNetflixMutation
// ====================================================

export interface RegisterNetflixMutation_newRegistration {
  __typename: "Tenant";
  /**
   * Tenant fqdn
   */
  fqdn: string;
}

export interface RegisterNetflixMutation {
  /**
   * Create new registration and send activation mail if success.
   */
  newRegistration: RegisterNetflixMutation_newRegistration;
}
