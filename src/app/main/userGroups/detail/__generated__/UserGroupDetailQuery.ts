/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserGroupDetailQuery
// ====================================================

export interface UserGroupDetailQuery_userGroup_users {
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

export interface UserGroupDetailQuery_userGroup {
  __typename: "UserGroup";
  /**
   * User group name
   */
  name: string;
  /**
   * User group ID
   */
  id: string;
  /**
   * User group description
   */
  description: string;
  /**
   * User group users
   */
  users: UserGroupDetailQuery_userGroup_users[];
}

export interface UserGroupDetailQuery {
  /**
   * Get user group
   */
  userGroup: UserGroupDetailQuery_userGroup;
}

export interface UserGroupDetailQueryVariables {
  id: number;
}
