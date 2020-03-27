/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUserGroup
// ====================================================

export interface CreateUserGroup_CreateUserGroup {
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
  CreateUserGroup: CreateUserGroup_CreateUserGroup;
}

export interface CreateUserGroupVariables {
  name: string;
  description: string;
}
