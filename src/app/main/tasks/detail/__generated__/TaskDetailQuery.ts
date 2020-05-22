/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TaskDetailQuery
// ====================================================

export interface TaskDetailQuery_task_assignees {
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

export interface TaskDetailQuery_task_project {
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

export interface TaskDetailQuery_task_createdBy {
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

export interface TaskDetailQuery_task {
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
  assignees: TaskDetailQuery_task_assignees[];
  /**
   * Project for this task
   */
  project: TaskDetailQuery_task_project;
  /**
   * Creator of task
   */
  createdBy: TaskDetailQuery_task_createdBy;
}

export interface TaskDetailQuery {
  /**
   * Get task with given id
   */
  task: TaskDetailQuery_task | null;
}

export interface TaskDetailQueryVariables {
  id: number;
}
