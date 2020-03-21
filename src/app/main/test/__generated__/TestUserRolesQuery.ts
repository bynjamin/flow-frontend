/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TestUserRolesQuery
// ====================================================

export interface TestUserRolesQuery_userRoles_users {
  __typename: "User";
  /**
   * User ID
   */
  id: string;
}

export interface TestUserRolesQuery_userRoles {
  __typename: "UserRole";
  /**
   * User role ID
   */
  id: string;
  /**
   * User role name
   */
  name: string;
  /**
   * User role users
   */
  users: TestUserRolesQuery_userRoles_users[];
}

export interface TestUserRolesQuery {
  /**
   * Get user roles
   */
  userRoles: TestUserRolesQuery_userRoles[];
}
