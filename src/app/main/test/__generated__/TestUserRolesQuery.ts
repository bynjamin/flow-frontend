/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TestUserRolesQuery
// ====================================================

export interface TestUserRolesQuery_userRoles_members {
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
  members: TestUserRolesQuery_userRoles_members[];
}

export interface TestUserRolesQuery {
  /**
   * Get user roles
   */
  userRoles: TestUserRolesQuery_userRoles[];
}
