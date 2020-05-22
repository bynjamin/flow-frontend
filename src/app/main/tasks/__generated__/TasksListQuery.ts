/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TasksListQuery
// ====================================================

export interface TasksListQuery_tasks_items_createdBy {
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

export interface TasksListQuery_tasks_items_assignees {
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

export interface TasksListQuery_tasks_items_project {
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

export interface TasksListQuery_tasks_items {
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
  status: string;
  /**
   * Deadline of task
   */
  deadline: string;
  /**
   * Creator of task
   */
  createdBy: TasksListQuery_tasks_items_createdBy;
  /**
   * Assignees of task
   */
  assignees: TasksListQuery_tasks_items_assignees[];
  /**
   * Project for this task
   */
  project: TasksListQuery_tasks_items_project;
}

export interface TasksListQuery_tasks {
  __typename: "TaskPagination";
  /**
   * Total task count
   */
  count: number;
  /**
   * List of tasks
   */
  items: TasksListQuery_tasks_items[];
}

export interface TasksListQuery {
  /**
   * Get all tasks
   */
  tasks: TasksListQuery_tasks;
}

export interface TasksListQueryVariables {
  first?: number | null;
  skip?: number | null;
  orderBy?: string | null;
  orderDirection?: string | null;
  search?: string | null;
}
