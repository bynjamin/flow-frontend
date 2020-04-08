/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserGroupAboutFragment__data
// ====================================================

export interface UserGroupAboutFragment__data_members {
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
}

export interface UserGroupAboutFragment__data {
  __typename: "UserGroup";
  /**
   * User group ID
   */
  id: string;
  /**
   * User group name
   */
  name: string;
  /**
   * User group description
   */
  description: string;
  /**
   * User group users
   */
  members: UserGroupAboutFragment__data_members[];
}
