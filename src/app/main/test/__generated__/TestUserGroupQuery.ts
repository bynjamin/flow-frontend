/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TestUserGroupQuery
// ====================================================

export interface TestUserGroupQuery_userGroup_users {
  __typename: "User";
  /**
   * User ID
   */
  id: string;
}

export interface TestUserGroupQuery_userGroup {
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
   * User group users
   */
  users: TestUserGroupQuery_userGroup_users[];
}

export interface TestUserGroupQuery {
  /**
   * Get user group
   */
  userGroup: TestUserGroupQuery_userGroup;
}
