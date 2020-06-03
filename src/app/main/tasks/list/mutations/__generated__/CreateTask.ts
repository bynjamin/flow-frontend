/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateTask
// ====================================================

export interface CreateTask_createTask_assignees {
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

export interface CreateTask_createTask_project {
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

export interface CreateTask_createTask {
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
   * Deadline of task
   */
  deadline: string;
  /**
   * Status of task
   */
  status: TaskState;
  /**
   * Assignees of task
   */
  assignees: CreateTask_createTask_assignees[];
  /**
   * Project for this task
   */
  project: CreateTask_createTask_project;
}

export interface CreateTask {
  /**
   * Create task.
   */
  createTask: CreateTask_createTask;
}

export interface CreateTaskVariables {
  name: string;
  description: string;
  deadline: string;
  status: TaskState;
  assigneeIds: number[];
  projectId: number;
}
