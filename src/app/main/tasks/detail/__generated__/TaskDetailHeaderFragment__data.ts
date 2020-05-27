/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TaskDetailHeaderFragment__data
// ====================================================

export interface TaskDetailHeaderFragment__data_assignees {
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

export interface TaskDetailHeaderFragment__data_project {
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

export interface TaskDetailHeaderFragment__data {
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
   * Deleted
   */
  deleted: boolean;
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
  assignees: TaskDetailHeaderFragment__data_assignees[];
  /**
   * Project for this task
   */
  project: TaskDetailHeaderFragment__data_project;
}