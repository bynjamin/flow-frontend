/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserDetailQuery
// ====================================================

export interface UserDetailQuery_user_role {
  __typename: "UserRole";
  /**
   * User role name
   */
  name: string;
}

export interface UserDetailQuery_user_address {
  __typename: "Address";
  /**
   * Street
   */
  street: string | null;
  /**
   * Zip
   */
  zip: string | null;
  /**
   * City
   */
  city: string | null;
  /**
   * Country
   */
  country: string | null;
}

export interface UserDetailQuery_user_permissions_actions_basic {
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

export interface UserDetailQuery_user_permissions_actions_global {
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

export interface UserDetailQuery_user_permissions_actions {
  __typename: "Actions";
  /**
   * Basic actions
   */
  basic: UserDetailQuery_user_permissions_actions_basic;
  /**
   * Global actions
   */
  global: UserDetailQuery_user_permissions_actions_global;
}

export interface UserDetailQuery_user_permissions {
  __typename: "Module";
  /**
   * Model of module
   */
  model: string;
  /**
   * CRUD actions
   */
  actions: UserDetailQuery_user_permissions_actions;
}

export interface UserDetailQuery_user {
  __typename: "User";
  /**
   * User ID
   */
  id: string;
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
  role: UserDetailQuery_user_role;
  /**
   * User gender
   */
  gender: string;
  /**
   * User about
   */
  about: string;
  /**
   * User phone
   */
  phone: string;
  /**
   * User gdpr
   */
  gdpr: boolean;
  /**
   * User position
   */
  position: string;
  /**
   * User employmentType
   */
  employmentType: string;
  /**
   * User address
   */
  address: UserDetailQuery_user_address;
  /**
   * User access
   */
  permissions: UserDetailQuery_user_permissions[];
}

export interface UserDetailQuery {
  /**
   * Get actual user data. if set id then return data for user with id = id
   */
  user: UserDetailQuery_user | null;
}

export interface UserDetailQueryVariables {
  id: number;
}
