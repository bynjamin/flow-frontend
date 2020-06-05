/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskState } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: TaskDetailHeaderFragment__data
// ====================================================

export interface TaskDetailHeaderFragment__data_createdBy {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
}

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

export interface TaskDetailHeaderFragment__data_project_managers {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
}

export interface TaskDetailHeaderFragment__data_project {
  __typename: "Project";
  /**
   * ID of Project
   */
  id: string;
  /**
   * Managers of project
   */
  managers: TaskDetailHeaderFragment__data_project_managers[];
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
   * Creator of task
   */
  createdBy: TaskDetailHeaderFragment__data_createdBy;
  /**
   * Assignees of task
   */
  assignees: TaskDetailHeaderFragment__data_assignees[];
  /**
   * Project for this task
   */
  project: TaskDetailHeaderFragment__data_project;
  /**
   * Description of task
   */
  description: string;
  /**
   * Status of task
   */
  status: TaskState;
  /**
   * Deadline of task
   */
  deadline: string;
}
