/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: InviteUserDialogRolesQuery
// ====================================================

export interface InviteUserDialogRolesQuery_userRoles {
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

export interface InviteUserDialogRolesQuery {
  /**
   * Get user roles
   */
  userRoles: InviteUserDialogRolesQuery_userRoles[];
}
