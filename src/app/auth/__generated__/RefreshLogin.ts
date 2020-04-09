/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RefreshLogin
// ====================================================

export interface RefreshLogin_refreshLogin {
  __typename: "Login";
  /**
   * Token
   */
  accessToken: string;
  /**
   * Token type
   */
  tokenType: string;
  /**
   * Token expires in
   */
  expiresIn: number;
}

export interface RefreshLogin {
  /**
   * Refresh login
   */
  refreshLogin: RefreshLogin_refreshLogin;
}
