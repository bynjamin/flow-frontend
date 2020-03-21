/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TestUserRoleQuery
// ====================================================

export interface TestUserRoleQuery_userRole_users {
  __typename: "User";
  /**
   * User ID
   */
  id: string;
}

export interface TestUserRoleQuery_userRole {
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
  users: TestUserRoleQuery_userRole_users[];
}

export interface TestUserRoleQuery {
  /**
   * Get user role
   */
  userRole: TestUserRoleQuery_userRole;
}
