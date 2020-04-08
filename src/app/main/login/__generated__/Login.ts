/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_user_role {
  __typename: "UserRole";
  /**
   * User role name
   */
  name: string;
}

export interface Login_login_user_allPermissions_actions_basic {
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

export interface Login_login_user_allPermissions_actions_global {
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

export interface Login_login_user_allPermissions_actions {
  __typename: "Actions";
  /**
   * Basic actions
   */
  basic: Login_login_user_allPermissions_actions_basic;
  /**
   * Global actions
   */
  global: Login_login_user_allPermissions_actions_global;
}

export interface Login_login_user_allPermissions {
  __typename: "Module";
  /**
   * Model of module
   */
  model: string;
  /**
   * CRUD actions
   */
  actions: Login_login_user_allPermissions_actions;
}

export interface Login_login_user {
  __typename: "User";
  /**
   * User ID
   */
  id: string;
  /**
   * User email
   */
  email: string;
  /**
   * User full name
   */
  fullName: string;
  /**
   * User role
   */
  role: Login_login_user_role;
  /**
   * All user access, including access from user groups and user roles
   */
  allPermissions: Login_login_user_allPermissions[];
}

export interface Login_login {
  __typename: "Login";
  /**
   * Token
   */
  accessToken: string;
  /**
   * Token type
   */
  tokenType: string;
  /**
   * Token expires in
   */
  expiresIn: number;
  /**
   * FQDN
   */
  fqdn: string;
  /**
   * User
   */
  user: Login_login_user;
}

export interface Login {
  /**
   * Login user
   */
  login: Login_login;
}

export interface LoginVariables {
  email: string;
  password: string;
}
