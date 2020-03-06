/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserDetailQuery
// ====================================================

export interface UserDetailQuery_userQuery_address {
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

export interface UserDetailQuery_userQuery {
  __typename: "User";
  /**
   * User ID
   */
  id: string;
  /**
   * User full name
   */
  fullName: string;
  /**
   * User email
   */
  email: string;
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
   * User address
   */
  address: UserDetailQuery_userQuery_address;
}

export interface UserDetailQuery {
  /**
   * Get actual user data. if set id then return data for user with id = id
   */
  userQuery: UserDetailQuery_userQuery | null;
}

export interface UserDetailQueryVariables {
  id: number;
}
