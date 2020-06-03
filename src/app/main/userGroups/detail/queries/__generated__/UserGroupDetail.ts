/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserGroupDetail
// ====================================================

export interface UserGroupDetail_userGroup_members_role {
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

export interface UserGroupDetail_userGroup_members {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
  /**
   * User title
   */
  title: string;
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
  role: UserGroupDetail_userGroup_members_role;
}

export interface UserGroupDetail_userGroup_permissions_actions_basic {
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

export interface UserGroupDetail_userGroup_permissions_actions_global {
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

export interface UserGroupDetail_userGroup_permissions_actions {
  __typename: "Actions";
  /**
   * Basic actions
   */
  basic: UserGroupDetail_userGroup_permissions_actions_basic;
  /**
   * Global actions
   */
  global: UserGroupDetail_userGroup_permissions_actions_global;
}

export interface UserGroupDetail_userGroup_permissions {
  __typename: "Module";
  /**
   * Model of module
   */
  model: string;
  /**
   * CRUD actions
   */
  actions: UserGroupDetail_userGroup_permissions_actions;
}

export interface UserGroupDetail_userGroup {
  __typename: "UserGroup";
  /**
   * User group name
   */
  name: string;
  /**
   * User group ID
   */
  id: number;
  /**
   * User group description
   */
  description: string;
  /**
   * User group users
   */
  members: UserGroupDetail_userGroup_members[];
  /**
   * User group access
   */
  permissions: UserGroupDetail_userGroup_permissions[];
}

export interface UserGroupDetail {
  /**
   * Get user group
   */
  userGroup: UserGroupDetail_userGroup;
}

export interface UserGroupDetailVariables {
  id: number;
}
