/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUserGroup
// ====================================================

export interface CreateUserGroup_createUserGroup {
  __typename: "UserGroup";
  /**
   * User group ID
   */
  id: string;
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
}
