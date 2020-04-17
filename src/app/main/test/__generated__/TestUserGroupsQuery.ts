/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TestUserGroupsQuery
// ====================================================

export interface TestUserGroupsQuery_userGroups_items_members {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
}

export interface TestUserGroupsQuery_userGroups_items {
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
   * User group users
   */
  members: TestUserGroupsQuery_userGroups_items_members[];
  /**
   * User group users count
   */
  memberCount: number;
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
