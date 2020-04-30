/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserGroupDetailQuery
// ====================================================

export interface UserGroupDetailQuery_userGroup_members_role {
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

export interface UserGroupDetailQuery_userGroup_members {
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
   * User first name
   */
  firstName: string;
  /**
   * User last name
   */
  lastName: string;
  /**
   * User email
   */
  email: string;
  /**
   * User role
   */
  role: UserGroupDetailQuery_userGroup_members_role;
}

export interface UserGroupDetailQuery_userGroup_permissions_actions_basic {
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

export interface UserGroupDetailQuery_userGroup_permissions_actions_global {
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

export interface UserGroupDetailQuery_userGroup_permissions_actions {
  __typename: "Actions";
  /**
   * Basic actions
   */
  basic: UserGroupDetailQuery_userGroup_permissions_actions_basic;
  /**
   * Global actions
   */
  global: UserGroupDetailQuery_userGroup_permissions_actions_global;
}

export interface UserGroupDetailQuery_userGroup_permissions {
  __typename: "Module";
  /**
   * Model of module
   */
  model: string;
  /**
   * CRUD actions
   */
  actions: UserGroupDetailQuery_userGroup_permissions_actions;
}

export interface UserGroupDetailQuery_userGroup {
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
  members: UserGroupDetailQuery_userGroup_members[];
  /**
   * User group access
   */
  permissions: UserGroupDetailQuery_userGroup_permissions[];
}

export interface UserGroupDetailQuery {
  /**
   * Get user group
   */
  userGroup: UserGroupDetailQuery_userGroup;
}

export interface UserGroupDetailQueryVariables {
  id: number;
}
