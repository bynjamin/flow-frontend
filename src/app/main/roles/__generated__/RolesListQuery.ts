/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RolesListQuery
// ====================================================

export interface RolesListQuery_userRoles_members {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
  /**
   * User full name
   */
  fullName: string;
}

export interface RolesListQuery_userRoles {
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
   * User role description
   */
  description: string;
  /**
   * User role users
   */
  members: RolesListQuery_userRoles_members[];
  /**
   * User group users count
   */
  memberCount: number;
}

export interface RolesListQuery {
  /**
   * Get user roles
   */
  userRoles: RolesListQuery_userRoles[];
}
