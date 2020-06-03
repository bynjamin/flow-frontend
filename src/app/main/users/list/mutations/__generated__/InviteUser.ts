/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InviteUser
// ====================================================

export interface InviteUser {
  /**
   * Invite new user.
   */
  inviteUser: boolean | null;
}

export interface InviteUserVariables {
  email: string;
  firstName: string;
  lastName: string;
  title?: string | null;
  roleId: number;
  phone?: string | null;
  gender?: string | null;
  position?: string | null;
  employmentType?: string | null;
  street?: string | null;
  city?: string | null;
  zip?: string | null;
  country?: string | null;
}
