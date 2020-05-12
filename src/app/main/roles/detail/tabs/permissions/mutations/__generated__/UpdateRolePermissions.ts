/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccessInput } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateRolePermissions
// ====================================================

export interface UpdateRolePermissions_updateUserRolePermissions_permissions_actions_basic {
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

export interface UpdateRolePermissions_updateUserRolePermissions_permissions_actions_global {
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

export interface UpdateRolePermissions_updateUserRolePermissions_permissions_actions {
  __typename: "Actions";
  /**
   * Basic actions
   */
  basic: UpdateRolePermissions_updateUserRolePermissions_permissions_actions_basic;
  /**
   * Global actions
   */
  global: UpdateRolePermissions_updateUserRolePermissions_permissions_actions_global;
}

export interface UpdateRolePermissions_updateUserRolePermissions_permissions {
  __typename: "Module";
  /**
   * Model of module
   */
  model: string;
  /**
   * CRUD actions
   */
  actions: UpdateRolePermissions_updateUserRolePermissions_permissions_actions;
}

export interface UpdateRolePermissions_updateUserRolePermissions {
  __typename: "UserRole";
  /**
   * User role ID
   */
  id: number;
  /**
   * User role access
   */
  permissions: UpdateRolePermissions_updateUserRolePermissions_permissions[];
}

export interface UpdateRolePermissions {
  /**
   * Update user role permissions/access.
   */
  updateUserRolePermissions: UpdateRolePermissions_updateUserRolePermissions;
}

export interface UpdateRolePermissionsVariables {
  roleId: number;
  model: string;
  permissions: AccessInput;
}
