/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: TaskDetail
// ====================================================

export interface TaskDetail_task_assignees {
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

export interface TaskDetail_task_project {
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

export interface TaskDetail_task_createdBy {
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

export interface TaskDetail_task {
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
  status: TaskState;
  /**
   * Deadline of task
   */
  deadline: string;
  /**
   * Assignees of task
   */
  assignees: TaskDetail_task_assignees[];
  /**
   * Project for this task
   */
  project: TaskDetail_task_project;
  /**
   * Creator of task
   */
  createdBy: TaskDetail_task_createdBy;
}

export interface TaskDetail {
  /**
   * Get task with given id
   */
  task: TaskDetail_task | null;
}

export interface TaskDetailVariables {
  id: number;
}
