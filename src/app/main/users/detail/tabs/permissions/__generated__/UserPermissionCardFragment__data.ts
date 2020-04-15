/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserPermissionCardFragment__data
// ====================================================

export interface UserPermissionCardFragment__data_actions_basic {
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

export interface UserPermissionCardFragment__data_actions_global {
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

export interface UserPermissionCardFragment__data_actions {
  __typename: "Actions";
  /**
   * Basic actions
   */
  basic: UserPermissionCardFragment__data_actions_basic;
  /**
   * Global actions
   */
  global: UserPermissionCardFragment__data_actions_global;
}

export interface UserPermissionCardFragment__data {
  __typename: "Module";
  /**
   * Model of module
   */
  model: string;
  /**
   * CRUD actions
   */
  actions: UserPermissionCardFragment__data_actions;
}
