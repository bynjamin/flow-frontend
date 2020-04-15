/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccessInput } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserPermissions
// ====================================================

export interface UpdateUserPermissions_updateUserPermissions_permissions_actions_basic {
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

export interface UpdateUserPermissions_updateUserPermissions_permissions_actions_global {
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

export interface UpdateUserPermissions_updateUserPermissions_permissions_actions {
  __typename: "Actions";
  /**
   * Basic actions
   */
  basic: UpdateUserPermissions_updateUserPermissions_permissions_actions_basic;
  /**
   * Global actions
   */
  global: UpdateUserPermissions_updateUserPermissions_permissions_actions_global;
}

export interface UpdateUserPermissions_updateUserPermissions_permissions {
  __typename: "Module";
  /**
   * Model of module
   */
  model: string;
  /**
   * CRUD actions
   */
  actions: UpdateUserPermissions_updateUserPermissions_permissions_actions;
}

export interface UpdateUserPermissions_updateUserPermissions {
  __typename: "User";
  /**
   * User ID
   */
  id: string;
  /**
   * User access
   */
  permissions: UpdateUserPermissions_updateUserPermissions_permissions[];
}

export interface UpdateUserPermissions {
  /**
   * Update user permissions/access.
   */
  updateUserPermissions: UpdateUserPermissions_updateUserPermissions;
}

export interface UpdateUserPermissionsVariables {
  userId: number;
  model: string;
  permissions: AccessInput;
}
