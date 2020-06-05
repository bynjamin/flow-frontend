/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RoleAboutFragment__data
// ====================================================

export interface RoleAboutFragment__data_members {
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
   * User email
   */
  email: string;
}

export interface RoleAboutFragment__data {
  __typename: "UserRole";
  /**
   * User role ID
   */
  id: number;
  /**
   * User role name
   */
  name: string;
  /**
   * User role description
   */
  description: string;
  /**
   * User role users count
   */
  memberCount: number;
  /**
   * User role users
   */
  members: RoleAboutFragment__data_members[];
}
