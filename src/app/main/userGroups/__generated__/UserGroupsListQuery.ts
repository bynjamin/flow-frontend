/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserGroupsListQuery
// ====================================================

export interface UserGroupsListQuery_userGroups_users {
  __typename: "User";
  /**
   * User ID
   */
  id: string;
}

export interface UserGroupsListQuery_userGroups {
  __typename: "UserGroup";
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
  users: UserGroupsListQuery_userGroups_users[];
}

export interface UserGroupsListQuery {
  /**
   * Get user groups
   */
  userGroups: UserGroupsListQuery_userGroups[];
}
