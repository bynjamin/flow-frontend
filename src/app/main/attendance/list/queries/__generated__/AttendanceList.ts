/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AttendanceList
// ====================================================

export interface AttendanceList_attendances_items_user {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
  /**
   * User full name
   */
  fullName: string;
}

export interface AttendanceList_attendances_items {
  __typename: "Attendance";
  /**
   * User start of work
   */
  start: string;
  /**
   * User end of work
   */
  end: string | null;
  /**
   * User
   */
  user: AttendanceList_attendances_items_user;
}

export interface AttendanceList_attendances {
  __typename: "AttendancePagination";
  /**
   * Total attendance count
   */
  count: number;
  /**
   * List of attendance
   */
  items: AttendanceList_attendances_items[];
}

export interface AttendanceList {
  /**
   * Get all attendances
   */
  attendances: AttendanceList_attendances;
}

export interface AttendanceListVariables {
  first?: number | null;
  skip?: number | null;
  orderBy?: string | null;
  orderDirection?: string | null;
  userId?: number | null;
}
