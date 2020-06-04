/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserGroupsList
// ====================================================

export interface UserGroupsList_userGroups_items_members {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
  /**
   * User full name
   */
  fullName: string;
}

export interface UserGroupsList_userGroups_items {
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
  members: UserGroupsList_userGroups_items_members[];
}

export interface UserGroupsList_userGroups {
  __typename: "UserGroupPagination";
  /**
   * Total user group count
   */
  count: number;
  /**
   * List of users groups
   */
  items: UserGroupsList_userGroups_items[];
}

export interface UserGroupsList {
  /**
   * Get user groups
   */
  userGroups: UserGroupsList_userGroups;
}

export interface UserGroupsListVariables {
  first?: number | null;
  skip?: number | null;
  orderBy?: string | null;
  orderDirection?: string | null;
  search?: string | null;
}
