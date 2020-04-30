/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoleDetailQuery
// ====================================================

export interface RoleDetailQuery_userRole_members {
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

export interface RoleDetailQuery_userRole_permissions_actions_basic {
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

export interface RoleDetailQuery_userRole_permissions_actions_global {
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

export interface RoleDetailQuery_userRole_permissions_actions {
  __typename: "Actions";
  /**
   * Basic actions
   */
  basic: RoleDetailQuery_userRole_permissions_actions_basic;
  /**
   * Global actions
   */
  global: RoleDetailQuery_userRole_permissions_actions_global;
}

export interface RoleDetailQuery_userRole_permissions {
  __typename: "Module";
  /**
   * Model of module
   */
  model: string;
  /**
   * CRUD actions
   */
  actions: RoleDetailQuery_userRole_permissions_actions;
}

export interface RoleDetailQuery_userRole {
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
   * User group users count
   */
  memberCount: number;
  /**
   * User role users
   */
  members: RoleDetailQuery_userRole_members[];
  /**
   * User role access
   */
  permissions: RoleDetailQuery_userRole_permissions[];
}

export interface RoleDetailQuery {
  /**
   * Get user role
   */
  userRole: RoleDetailQuery_userRole;
}

export interface RoleDetailQueryVariables {
  id: number;
}
