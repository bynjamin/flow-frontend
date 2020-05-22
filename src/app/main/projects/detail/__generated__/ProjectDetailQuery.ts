/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectDetailQuery
// ====================================================

export interface ProjectDetailQuery_project_managers {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
  /**
   * User email
   */
  email: string;
  /**
   * User full name
   */
  fullName: string;
}

export interface ProjectDetailQuery_project_assignees {
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

export interface ProjectDetailQuery_project_createdBy {
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

export interface ProjectDetailQuery_project_tasks_assignees {
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

export interface ProjectDetailQuery_project_tasks_createdBy {
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

export interface ProjectDetailQuery_project_tasks {
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
   * Assignees of task
   */
  assignees: ProjectDetailQuery_project_tasks_assignees[];
  /**
   * Creator of task
   */
  createdBy: ProjectDetailQuery_project_tasks_createdBy;
}

export interface ProjectDetailQuery_project {
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
   * Description
   */
  description: string;
  /**
   * Managers of project
   */
  managers: ProjectDetailQuery_project_managers[];
  /**
   * Deleted
   */
  deleted: boolean;
  /**
   * Tasks of project
   */
  assignees: ProjectDetailQuery_project_assignees[];
  /**
   * Creator of project
   */
  createdBy: ProjectDetailQuery_project_createdBy;
  /**
   * Tasks of project
   */
  tasks: ProjectDetailQuery_project_tasks[];
}

export interface ProjectDetailQuery {
  /**
   * Get project with given id
   */
  project: ProjectDetailQuery_project | null;
}

export interface ProjectDetailQueryVariables {
  id: number;
}
