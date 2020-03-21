/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TestUserGroupsQuery
// ====================================================

export interface TestUserGroupsQuery_userGroups_items_users {
  __typename: "User";
  /**
   * User ID
   */
  id: string;
}

export interface TestUserGroupsQuery_userGroups_items {
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
  users: TestUserGroupsQuery_userGroups_items_users[];
}

export interface TestUserGroupsQuery_userGroups {
  __typename: "UserGroupPagination";
  /**
   * Total user group count
   */
  count: number;
  /**
   * List of users groups
   */
  items: TestUserGroupsQuery_userGroups_items[];
}

export interface TestUserGroupsQuery {
  /**
   * Get user groups
   */
  userGroups: TestUserGroupsQuery_userGroups;
}
