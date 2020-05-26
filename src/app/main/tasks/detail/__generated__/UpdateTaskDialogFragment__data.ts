/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UpdateTaskDialogFragment__data
// ====================================================

export interface UpdateTaskDialogFragment__data_assignees {
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

export interface UpdateTaskDialogFragment__data_project {
  __typename: "Project";
  /**
   * ID of Project
   */
  id: string;
  /**
   * Name of module
   */
  name: string;
}

export interface UpdateTaskDialogFragment__data {
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
   * Status of task
   */
  status: string;
  /**
   * Deadline of task
   */
  deadline: string;
  /**
   * Assignees of task
   */
  assignees: UpdateTaskDialogFragment__data_assignees[];
  /**
   * Project for this task
   */
  project: UpdateTaskDialogFragment__data_project;
}
