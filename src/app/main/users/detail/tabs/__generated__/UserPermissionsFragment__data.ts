/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserPermissionsFragment__data
// ====================================================

export interface UserPermissionsFragment__data_permissions_actions_basic {
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

export interface UserPermissionsFragment__data_permissions_actions_global {
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

export interface UserPermissionsFragment__data_permissions_actions {
  __typename: "Actions";
  /**
   * Basic actions
   */
  basic: UserPermissionsFragment__data_permissions_actions_basic;
  /**
   * Global actions
   */
  global: UserPermissionsFragment__data_permissions_actions_global;
}

export interface UserPermissionsFragment__data_permissions {
  __typename: "Module";
  /**
   * Model of module
   */
  model: string;
  /**
   * CRUD actions
   */
  actions: UserPermissionsFragment__data_permissions_actions;
}

export interface UserPermissionsFragment__data {
  __typename: "User";
  /**
   * User access
   */
  permissions: UserPermissionsFragment__data_permissions[];
}
