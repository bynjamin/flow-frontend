/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserDetailQuery
// ====================================================

export interface UserDetailQuery_userQuery {
  __typename: "User";
  /**
   * User ID
   */
  id: string;
  /**
   * User full name
   */
  fullName: string;
}

export interface UserDetailQuery {
  /**
   * Get actual user data. if set id then return data for user with id = id
   */
  userQuery: UserDetailQuery_userQuery | null;
}

export interface UserDetailQueryVariables {
  id: string;
}
