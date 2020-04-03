/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserGroupsListQuery
// ====================================================

export interface UserGroupsListQuery_userGroups_items_members {
  __typename: "User";
  /**
   * User ID
   */
  id: string;
}

export interface UserGroupsListQuery_userGroups_items {
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
  members: UserGroupsListQuery_userGroups_items_members[];
}

export interface UserGroupsListQuery_userGroups {
  __typename: "UserGroupPagination";
  /**
   * Total user group count
   */
  count: number;
  /**
   * List of users groups
   */
  items: UserGroupsListQuery_userGroups_items[];
}

export interface UserGroupsListQuery {
  /**
   * Get user groups
   */
  userGroups: UserGroupsListQuery_userGroups;
}

export interface UserGroupsListQueryVariables {
  first?: number | null;
  skip?: number | null;
  orderBy?: string | null;
  orderDirection?: string | null;
}
