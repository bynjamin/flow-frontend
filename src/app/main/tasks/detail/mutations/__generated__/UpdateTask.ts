/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTask
// ====================================================

export interface UpdateTask_updateTask_assignees {
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

export interface UpdateTask_updateTask_project {
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

export interface UpdateTask_updateTask {
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
  status: string;
  /**
   * Assignees of task
   */
  assignees: UpdateTask_updateTask_assignees[];
  /**
   * Project for this task
   */
  project: UpdateTask_updateTask_project;
}

export interface UpdateTask {
  /**
   * Update task.
   */
  updateTask: UpdateTask_updateTask;
}

export interface UpdateTaskVariables {
  taskId: number;
  name: string;
  description: string;
  deadline: string;
  status: string;
  assigneeIds: number[];
  projectId: number;
}
