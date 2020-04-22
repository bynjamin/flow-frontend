/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UpdateUserDialogFragment__data
// ====================================================

export interface UpdateUserDialogFragment__data_role {
  __typename: "UserRole";
  /**
   * User role ID
   */
  id: number;
}

export interface UpdateUserDialogFragment__data_address {
  __typename: "Address";
  /**
   * Street
   */
  street: string | null;
  /**
   * Zip
   */
  zip: string | null;
  /**
   * City
   */
  city: string | null;
  /**
   * Country
   */
  country: string | null;
}

export interface UpdateUserDialogFragment__data {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
  /**
   * User first name
   */
  firstName: string;
  /**
   * User last name
   */
  lastName: string;
  /**
   * User title
   */
  title: string;
  /**
   * User role
   */
  role: UpdateUserDialogFragment__data_role;
  /**
   * User gender
   */
  gender: string;
  /**
   * User about
   */
  about: string;
  /**
   * User phone
   */
  phone: string;
  /**
   * User gdpr
   */
  gdpr: boolean;
  /**
   * User position
   */
  position: string;
  /**
   * User employmentType
   */
  employmentType: string;
  /**
   * User address
   */
  address: UpdateUserDialogFragment__data_address;
}
