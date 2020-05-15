/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangePassword
// ====================================================

export interface ChangePassword_updatePassword {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
}

export interface ChangePassword {
  /**
   * Update user password.
   */
  updatePassword: ChangePassword_updatePassword;
}

export interface ChangePasswordVariables {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}
