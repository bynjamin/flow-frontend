/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TestUsersQuery
// ====================================================

export interface TestUsersQuery_users_items {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
  /**
   * User full name
   */
  fullName: string;
  /**
   * User email
   */
  email: string;
}

export interface TestUsersQuery_users {
  __typename: "UserPagination";
  /**
   * Total user count
   */
  count: number;
  /**
   * List of users
   */
  items: TestUsersQuery_users_items[];
}

export interface TestUsersQuery {
  /**
   * Get all users
   */
  users: TestUsersQuery_users;
}
