/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UsersSearchQuery
// ====================================================

export interface UsersSearchQuery_users_items {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
  /**
   * User title
   */
  title: string;
  /**
   * User first name
   */
  firstName: string;
  /**
   * User last name
   */
  lastName: string;
  /**
   * User email
   */
  email: string;
}

export interface UsersSearchQuery_users {
  __typename: "UserPagination";
  /**
   * Total user count
   */
  count: number;
  /**
   * List of users
   */
  items: UsersSearchQuery_users_items[];
}

export interface UsersSearchQuery {
  /**
   * Get all users
   */
  users: UsersSearchQuery_users;
}

export interface UsersSearchQueryVariables {
  first?: number | null;
  search?: string | null;
}
