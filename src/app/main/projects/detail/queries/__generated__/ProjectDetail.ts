/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ProjectDetail
// ====================================================

export interface ProjectDetail_project_managers {
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

export interface ProjectDetail_project_createdBy {
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

export interface ProjectDetail_project_tasks_assignees {
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

export interface ProjectDetail_project_tasks_createdBy {
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

export interface ProjectDetail_project_tasks {
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
  assignees: ProjectDetail_project_tasks_assignees[];
  /**
   * Creator of task
   */
  createdBy: ProjectDetail_project_tasks_createdBy;
}

export interface ProjectDetail_project_assignees {
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

export interface ProjectDetail_project {
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
   * Deleted
   */
  deleted: boolean;
  /**
   * Managers of project
   */
  managers: ProjectDetail_project_managers[];
  /**
   * Creator of project
   */
  createdBy: ProjectDetail_project_createdBy;
  /**
   * Description
   */
  description: string;
  /**
   * Tasks of project
   */
  tasks: ProjectDetail_project_tasks[];
  /**
   * Tasks of project
   */
  assignees: ProjectDetail_project_assignees[];
}

export interface ProjectDetail {
  /**
   * Get project with given id
   */
  project: ProjectDetail_project | null;
}

export interface ProjectDetailVariables {
  id: number;
}
