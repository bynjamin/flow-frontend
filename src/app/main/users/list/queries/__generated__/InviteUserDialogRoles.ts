/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: InviteUserDialogRoles
// ====================================================

export interface InviteUserDialogRoles_userRoles {
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

export interface InviteUserDialogRoles {
  /**
   * Get user roles
   */
  userRoles: InviteUserDialogRoles_userRoles[];
}
