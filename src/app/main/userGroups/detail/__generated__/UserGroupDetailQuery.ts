/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserGroupDetailQuery
// ====================================================

export interface UserGroupDetailQuery_userGroups_users {
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

export interface UserGroupDetailQuery_userGroups {
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
  users: UserGroupDetailQuery_userGroups_users[];
}

export interface UserGroupDetailQuery {
  /**
   * Get user groups
   */
  userGroups: UserGroupDetailQuery_userGroups[];
}

export interface UserGroupDetailQueryVariables {
  id: number;
}
