/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TestUserRoleQuery
// ====================================================

export interface TestUserRoleQuery_userRole_members {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
}

export interface TestUserRoleQuery_userRole {
  __typename: "UserRole";
  /**
   * User role ID
   */
  id: number;
  /**
   * User role name
   */
  name: string;
  /**
   * User role users
   */
  members: TestUserRoleQuery_userRole_members[];
}

export interface TestUserRoleQuery {
  /**
   * Get user role
   */
  userRole: TestUserRoleQuery_userRole;
}
