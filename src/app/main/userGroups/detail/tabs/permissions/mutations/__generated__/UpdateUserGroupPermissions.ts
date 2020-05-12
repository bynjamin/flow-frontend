/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccessInput } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserGroupPermissions
// ====================================================

export interface UpdateUserGroupPermissions_updateUserGroupPermissions_permissions_actions_basic {
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

export interface UpdateUserGroupPermissions_updateUserGroupPermissions_permissions_actions_global {
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

export interface UpdateUserGroupPermissions_updateUserGroupPermissions_permissions_actions {
  __typename: "Actions";
  /**
   * Basic actions
   */
  basic: UpdateUserGroupPermissions_updateUserGroupPermissions_permissions_actions_basic;
  /**
   * Global actions
   */
  global: UpdateUserGroupPermissions_updateUserGroupPermissions_permissions_actions_global;
}

export interface UpdateUserGroupPermissions_updateUserGroupPermissions_permissions {
  __typename: "Module";
  /**
   * Model of module
   */
  model: string;
  /**
   * CRUD actions
   */
  actions: UpdateUserGroupPermissions_updateUserGroupPermissions_permissions_actions;
}

export interface UpdateUserGroupPermissions_updateUserGroupPermissions {
  __typename: "UserGroup";
  /**
   * User group ID
   */
  id: number;
  /**
   * User group access
   */
  permissions: UpdateUserGroupPermissions_updateUserGroupPermissions_permissions[];
}

export interface UpdateUserGroupPermissions {
  /**
   * Update user group permissions/access.
   */
  updateUserGroupPermissions: UpdateUserGroupPermissions_updateUserGroupPermissions;
}

export interface UpdateUserGroupPermissionsVariables {
  groupId: number;
  model: string;
  permissions: AccessInput;
}
