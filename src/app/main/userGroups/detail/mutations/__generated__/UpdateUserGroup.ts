/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserGroup
// ====================================================

export interface UpdateUserGroup_updateUserGroup_members_role {
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

export interface UpdateUserGroup_updateUserGroup_members {
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
  role: UpdateUserGroup_updateUserGroup_members_role;
}

export interface UpdateUserGroup_updateUserGroup {
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
   * User group description
   */
  description: string;
  /**
   * User group users
   */
  members: UpdateUserGroup_updateUserGroup_members[];
}

export interface UpdateUserGroup {
  /**
   * Update user group.
   */
  updateUserGroup: UpdateUserGroup_updateUserGroup;
}

export interface UpdateUserGroupVariables {
  groupId: number;
  name: string;
  description: string;
  memberIds: number[];
}
