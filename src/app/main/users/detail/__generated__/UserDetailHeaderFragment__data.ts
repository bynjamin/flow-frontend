/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserDetailHeaderFragment__data
// ====================================================

export interface UserDetailHeaderFragment__data_role {
  __typename: "UserRole";
  /**
   * User role ID
   */
  id: number;
}

export interface UserDetailHeaderFragment__data_address {
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

export interface UserDetailHeaderFragment__data {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
  /**
   * User full name
   */
  fullName: string;
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
  role: UserDetailHeaderFragment__data_role;
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
  address: UserDetailHeaderFragment__data_address;
}
