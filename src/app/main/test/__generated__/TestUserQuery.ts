/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TestUserQuery
// ====================================================

export interface TestUserQuery_user {
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

export interface TestUserQuery {
  /**
   * Get actual user data. if set id then return data for user with id = id
   */
  user: TestUserQuery_user | null;
}
