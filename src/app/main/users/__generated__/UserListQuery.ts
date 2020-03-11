/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserListQuery
// ====================================================

export interface UserListQuery_usersQuery_users {
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

export interface UserListQuery_usersQuery {
  __typename: "UserPagination";
  /**
   * Total user count
   */
  count: number;
  /**
   * List of users
   */
  users: UserListQuery_usersQuery_users[];
}

export interface UserListQuery {
  /**
   * Get all users
   */
  usersQuery: UserListQuery_usersQuery;
}

export interface UserListQueryVariables {
  first?: number | null;
  skip?: number | null;
  orderBy?: string | null;
  orderDirection?: string | null;
}
