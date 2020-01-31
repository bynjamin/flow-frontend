/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UsersQuery
// ====================================================

export interface UsersQuery_usersQuery {
  __typename: "User";
  /**
   * User ID
   */
  id: string;
}

export interface UsersQuery {
  /**
   * Get all users
   */
  usersQuery: (UsersQuery_usersQuery | null)[];
}
