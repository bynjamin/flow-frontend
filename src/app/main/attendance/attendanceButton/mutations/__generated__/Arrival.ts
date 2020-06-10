/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Arrival
// ====================================================

export interface Arrival_arrival {
  __typename: "Attendance";
  /**
   * User start of work
   */
  start: string | null;
}

export interface Arrival {
  /**
   * User arrival to work.
   */
  arrival: Arrival_arrival;
}
