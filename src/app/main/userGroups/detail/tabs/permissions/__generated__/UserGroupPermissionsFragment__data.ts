/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserGroupPermissionsFragment__data
// ====================================================

export interface UserGroupPermissionsFragment__data_permissions_actions_basic {
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

export interface UserGroupPermissionsFragment__data_permissions_actions_global {
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

export interface UserGroupPermissionsFragment__data_permissions_actions {
  __typename: "Actions";
  /**
   * Basic actions
   */
  basic: UserGroupPermissionsFragment__data_permissions_actions_basic;
  /**
   * Global actions
   */
  global: UserGroupPermissionsFragment__data_permissions_actions_global;
}

export interface UserGroupPermissionsFragment__data_permissions {
  __typename: "Module";
  /**
   * Model of module
   */
  model: string;
  /**
   * CRUD actions
   */
  actions: UserGroupPermissionsFragment__data_permissions_actions;
}

export interface UserGroupPermissionsFragment__data {
  __typename: "UserGroup";
  /**
   * User group ID
   */
  id: number;
  /**
   * User group access
   */
  permissions: UserGroupPermissionsFragment__data_permissions[];
}
