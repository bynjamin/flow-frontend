/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TestQuery
// ====================================================

export interface TestQuery_usersQuery_users {
  __typename: "User";
  /**
   * User ID
   */
  id: string;
  /**
   * User full name
   */
  fullName: string;
  /**
   * User email
   */
  email: string;
}

export interface TestQuery_usersQuery {
  __typename: "UserPagination";
  /**
   * Total user count
   */
  count: number;
  /**
   * List of users
   */
  users: TestQuery_usersQuery_users[];
}

export interface TestQuery_userQuery {
  __typename: "User";
  /**
   * User ID
   */
  id: string;
  /**
   * User full name
   */
  fullName: string;
  /**
   * User email
   */
  email: string;
}

export interface TestQuery {
  /**
   * Get all users
   */
  usersQuery: TestQuery_usersQuery;
  /**
   * Get actual user data. if set id then return data for user with id = id
   */
  userQuery: TestQuery_userQuery | null;
}
