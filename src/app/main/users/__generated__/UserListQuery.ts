/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserListQuery
// ====================================================

export interface UserListQuery_usersQuery {
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

export interface UserListQuery {
  /**
   * Get all users
   */
  usersQuery: (UserListQuery_usersQuery | null)[];
}
