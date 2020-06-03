/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ProjectTasksFragment__data
// ====================================================

export interface ProjectTasksFragment__data_tasks_assignees {
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

export interface ProjectTasksFragment__data_tasks_createdBy {
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

export interface ProjectTasksFragment__data_tasks {
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
  status: TaskState;
  /**
   * Deleted
   */
  deleted: boolean;
  /**
   * Assignees of task
   */
  assignees: ProjectTasksFragment__data_tasks_assignees[];
  /**
   * Creator of task
   */
  createdBy: ProjectTasksFragment__data_tasks_createdBy;
}

export interface ProjectTasksFragment__data {
  __typename: "Project";
  /**
   * ID of Project
   */
  id: string;
  /**
   * Name of module
   */
  name: string;
  /**
   * Tasks of project
   */
  tasks: ProjectTasksFragment__data_tasks[];
}
