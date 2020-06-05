/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RolesList
// ====================================================

export interface RolesList_userRoles_members {
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

export interface RolesList_userRoles {
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
  members: RolesList_userRoles_members[];
  /**
   * User role users count
   */
  memberCount: number;
}

export interface RolesList {
  /**
   * Get user roles
   */
  userRoles: RolesList_userRoles[];
}
