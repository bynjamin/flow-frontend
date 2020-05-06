/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RolePermissionsFragment__data
// ====================================================

export interface RolePermissionsFragment__data_permissions_actions_basic {
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

export interface RolePermissionsFragment__data_permissions_actions_global {
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

export interface RolePermissionsFragment__data_permissions_actions {
  __typename: "Actions";
  /**
   * Basic actions
   */
  basic: RolePermissionsFragment__data_permissions_actions_basic;
  /**
   * Global actions
   */
  global: RolePermissionsFragment__data_permissions_actions_global;
}

export interface RolePermissionsFragment__data_permissions {
  __typename: "Module";
  /**
   * Model of module
   */
  model: string;
  /**
   * CRUD actions
   */
  actions: RolePermissionsFragment__data_permissions_actions;
}

export interface RolePermissionsFragment__data {
  __typename: "UserRole";
  /**
   * User role access
   */
  permissions: RolePermissionsFragment__data_permissions[];
}
