/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoleDetail
// ====================================================

export interface RoleDetail_userRole_members {
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

export interface RoleDetail_userRole_permissions_actions_basic {
  __typename: "Action";
  /**
   * Create
   */
  create: boolean | null;
  /**
   * Read
   */
  read: boolean | null;
  /**
   * Update
   */
  update: boolean | null;
  /**
   * Delete
   */
  delete: boolean | null;
}

export interface RoleDetail_userRole_permissions_actions_global {
  __typename: "Action";
  /**
   * Read
   */
  read: boolean | null;
  /**
   * Update
   */
  update: boolean | null;
  /**
   * Delete
   */
  delete: boolean | null;
}

export interface RoleDetail_userRole_permissions_actions {
  __typename: "Actions";
  /**
   * Basic actions
   */
  basic: RoleDetail_userRole_permissions_actions_basic;
  /**
   * Global actions
   */
  global: RoleDetail_userRole_permissions_actions_global;
}

export interface RoleDetail_userRole_permissions {
  __typename: "Module";
  /**
   * Model of module
   */
  model: string;
  /**
   * CRUD actions
   */
  actions: RoleDetail_userRole_permissions_actions;
}

export interface RoleDetail_userRole {
  __typename: "UserRole";
  /**
   * User role name
   */
  name: string;
  /**
   * User role ID
   */
  id: number;
  /**
   * User role description
   */
  description: string;
  /**
   * User role users count
   */
  memberCount: number;
  /**
   * User role users
   */
  members: RoleDetail_userRole_members[];
  /**
   * User role level
   */
  level: number;
  /**
   * User role access
   */
  permissions: RoleDetail_userRole_permissions[];
}

export interface RoleDetail {
  /**
   * Get user role
   */
  userRole: RoleDetail_userRole;
}

export interface RoleDetailVariables {
  id: number;
}
