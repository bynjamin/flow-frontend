/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUserGroup
// ====================================================

export interface CreateUserGroup_createUserGroup_members {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
  /**
   * User email
   */
  email: string;
  /**
   * User full name
   */
  fullName: string;
}

export interface CreateUserGroup_createUserGroup {
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
  members: CreateUserGroup_createUserGroup_members[];
}

export interface CreateUserGroup {
  /**
   * Create new user group.
   */
  createUserGroup: CreateUserGroup_createUserGroup;
}

export interface CreateUserGroupVariables {
  name: string;
  description: string;
  memberIds: number[];
}
