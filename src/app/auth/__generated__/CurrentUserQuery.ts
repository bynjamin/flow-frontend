/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUserQuery
// ====================================================

export interface CurrentUserQuery_user_role {
  __typename: "UserRole";
  /**
   * User role ID
   */
  id: number;
  /**
   * User role name
   */
  name: string;
}

export interface CurrentUserQuery_user_allPermissions_actions_basic {
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

export interface CurrentUserQuery_user_allPermissions_actions_global {
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

export interface CurrentUserQuery_user_allPermissions_actions {
  __typename: "Actions";
  /**
   * Basic actions
   */
  basic: CurrentUserQuery_user_allPermissions_actions_basic;
  /**
   * Global actions
   */
  global: CurrentUserQuery_user_allPermissions_actions_global;
}

export interface CurrentUserQuery_user_allPermissions {
  __typename: "Module";
  /**
   * Model of module
   */
  model: string;
  /**
   * CRUD actions
   */
  actions: CurrentUserQuery_user_allPermissions_actions;
}

export interface CurrentUserQuery_user {
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
  /**
   * User role
   */
  role: CurrentUserQuery_user_role;
  /**
   * All user access, including access from user groups and user roles
   */
  allPermissions: CurrentUserQuery_user_allPermissions[];
}

export interface CurrentUserQuery {
  /**
   * Get actual user data. if set id then return data for user with id = id
   */
  user: CurrentUserQuery_user | null;
}
