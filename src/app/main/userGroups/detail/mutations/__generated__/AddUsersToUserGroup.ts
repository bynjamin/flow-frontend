/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddUsersToUserGroup
// ====================================================

export interface AddUsersToUserGroup_addUsersToUserGroup_members_role {
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

export interface AddUsersToUserGroup_addUsersToUserGroup_members {
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
  role: AddUsersToUserGroup_addUsersToUserGroup_members_role;
}

export interface AddUsersToUserGroup_addUsersToUserGroup {
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
   * User group users
   */
  members: AddUsersToUserGroup_addUsersToUserGroup_members[];
}

export interface AddUsersToUserGroup {
  /**
   * Add users to user group.
   */
  addUsersToUserGroup: AddUsersToUserGroup_addUsersToUserGroup;
}

export interface AddUsersToUserGroupVariables {
  groupId: number;
  userIds: number[];
}
