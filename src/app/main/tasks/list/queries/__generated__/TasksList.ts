/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: TasksList
// ====================================================

export interface TasksList_tasks_items_createdBy {
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

export interface TasksList_tasks_items_assignees {
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

export interface TasksList_tasks_items_project {
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

export interface TasksList_tasks_items {
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
   * Status of task
   */
  status: TaskState;
  /**
   * Deadline of task
   */
  deadline: string;
  /**
   * Creator of task
   */
  createdBy: TasksList_tasks_items_createdBy;
  /**
   * Assignees of task
   */
  assignees: TasksList_tasks_items_assignees[];
  /**
   * Project for this task
   */
  project: TasksList_tasks_items_project;
}

export interface TasksList_tasks {
  __typename: "TaskPagination";
  /**
   * Total task count
   */
  count: number;
  /**
   * List of tasks
   */
  items: TasksList_tasks_items[];
}

export interface TasksList {
  /**
   * Get all tasks
   */
  tasks: TasksList_tasks;
}

export interface TasksListVariables {
  first?: number | null;
  skip?: number | null;
  orderBy?: string | null;
  orderDirection?: string | null;
  search?: string | null;
}
