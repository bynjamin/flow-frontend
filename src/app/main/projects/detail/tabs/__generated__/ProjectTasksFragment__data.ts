/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProjectTasksFragment__data
// ====================================================

export interface ProjectTasksFragment__data_assignees {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
  /**
   * User full name
   */
  fullName: string;
  /**
   * User email
   */
  email: string;
}

export interface ProjectTasksFragment__data_createdBy {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
  /**
   * User full name
   */
  fullName: string;
  /**
   * User email
   */
  email: string;
}

export interface ProjectTasksFragment__data {
  __typename: "Task";
  /**
   * ID of task
   */
  id: string;
  /**
   * Name of task
   */
  name: string;
  /**
   * Description of task
   */
  description: string;
  /**
   * Deleted
   */
  deleted: boolean;
  /**
   * Assignees of task
   */
  assignees: ProjectTasksFragment__data_assignees[];
  /**
   * Creator of task
   */
  createdBy: ProjectTasksFragment__data_createdBy;
}
