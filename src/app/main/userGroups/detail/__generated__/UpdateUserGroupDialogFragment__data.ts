/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UpdateUserGroupDialogFragment__data
// ====================================================

export interface UpdateUserGroupDialogFragment__data_members {
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

export interface UpdateUserGroupDialogFragment__data {
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
   * User group description
   */
  description: string;
  /**
   * User group users
   */
  members: UpdateUserGroupDialogFragment__data_members[];
}
