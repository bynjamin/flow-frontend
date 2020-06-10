/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserDetail
// ====================================================

export interface UserDetail_user_role {
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

export interface UserDetail_user_address {
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

export interface UserDetail_user_groups {
  __typename: "UserGroup";
  /**
   * User group ID
   */
  id: number;
  /**
   * User group name
   */
  name: string;
  /**
   * User group users count
   */
  memberCount: number;
}

export interface UserDetail_user_permissions_actions_basic {
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

export interface UserDetail_user_permissions_actions_global {
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

export interface UserDetail_user_permissions_actions {
  __typename: "Actions";
  /**
   * Basic actions
   */
  basic: UserDetail_user_permissions_actions_basic;
  /**
   * Global actions
   */
  global: UserDetail_user_permissions_actions_global;
}

export interface UserDetail_user_permissions {
  __typename: "Module";
  /**
   * Model of module
   */
  model: string;
  /**
   * CRUD actions
   */
  actions: UserDetail_user_permissions_actions;
}

export interface UserDetail_user {
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
   * User title
   */
  title: string;
  /**
   * User first name
   */
  firstName: string;
  /**
   * User last name
   */
  lastName: string;
  /**
   * User role
   */
  role: UserDetail_user_role;
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
  address: UserDetail_user_address;
  /**
   * User email
   */
  email: string;
  /**
   * User groups
   */
  groups: (UserDetail_user_groups | null)[];
  /**
   * User access
   */
  permissions: UserDetail_user_permissions[];
}

export interface UserDetail_userRoles {
  __typename: "UserRole";
  /**
   * User role ID
   */
  id: number;
  /**
   * User role name
   */
  name: string;
  /**
   * User role level
   */
  level: number;
}

export interface UserDetail {
  /**
   * Get actual user data. if set id then return data for user with id = id
   */
  user: UserDetail_user | null;
  /**
   * Get user roles
   */
  userRoles: UserDetail_userRoles[];
}

export interface UserDetailVariables {
  id: number;
}
