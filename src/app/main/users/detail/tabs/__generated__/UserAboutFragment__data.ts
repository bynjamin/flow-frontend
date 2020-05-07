/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserAboutFragment__data
// ====================================================

export interface UserAboutFragment__data_role {
  __typename: "UserRole";
  /**
   * User role ID
   */
  id: number;
  /**
   * User role name
   */
  name: string;
}

export interface UserAboutFragment__data_address {
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

export interface UserAboutFragment__data_groups {
  __typename: "UserGroup";
  /**
   * User group ID
   */
  id: number;
  /**
   * User group name
   */
  name: string;
  /**
   * User group users count
   */
  memberCount: number;
}

export interface UserAboutFragment__data {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
  /**
   * User title
   */
  title: string;
  /**
   * User first name
   */
  firstName: string;
  /**
   * User last name
   */
  lastName: string;
  /**
   * User email
   */
  email: string;
  /**
   * User role
   */
  role: UserAboutFragment__data_role;
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
  address: UserAboutFragment__data_address;
  /**
   * User groups
   */
  groups: (UserAboutFragment__data_groups | null)[];
}
