/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserListQuery
// ====================================================

export interface UserListQuery_users_items {
  __typename: "User";
  /**
   * User ID
   */
  id: string;
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

export interface UserListQuery_users {
  __typename: "UserPagination";
  /**
   * Total user count
   */
  count: number;
  /**
   * List of users
   */
  items: UserListQuery_users_items[];
}

export interface UserListQuery {
  /**
   * Get all users
   */
  users: UserListQuery_users;
}

export interface UserListQueryVariables {
  first?: number | null;
  skip?: number | null;
  orderBy?: string | null;
  orderDirection?: string | null;
}
