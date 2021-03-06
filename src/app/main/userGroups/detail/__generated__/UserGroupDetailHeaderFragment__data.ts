/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserGroupDetailHeaderFragment__data
// ====================================================

export interface UserGroupDetailHeaderFragment__data_members {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
  /**
   * User email
   */
  email: string;
}

export interface UserGroupDetailHeaderFragment__data {
  __typename: "UserGroup";
  /**
   * User group name
   */
  name: string;
  /**
   * User group ID
   */
  id: number;
  /**
   * User group description
   */
  description: string;
  /**
   * User group users
   */
  members: UserGroupDetailHeaderFragment__data_members[];
}
