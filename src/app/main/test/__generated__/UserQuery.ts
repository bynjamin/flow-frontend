/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserQuery
// ====================================================

export interface UserQuery_usersQuery {
  __typename: "User";
  /**
   * User ID
   */
  id: string;
}

export interface UserQuery {
  /**
   * Get all users
   */
  usersQuery: (UserQuery_usersQuery | null)[];
}
