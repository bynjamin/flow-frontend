/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Leave
// ====================================================

export interface Leave_leave {
  __typename: "Attendance";
  /**
   * User start of work
   */
  start: string;
  /**
   * User end of work
   */
  end: string | null;
}

export interface Leave {
  /**
   * User leave from work.
   */
  leave: Leave_leave;
}
