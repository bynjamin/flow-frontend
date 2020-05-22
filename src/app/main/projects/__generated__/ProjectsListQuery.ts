/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectsListQuery
// ====================================================

export interface ProjectsListQuery_projects_items_createdBy {
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

export interface ProjectsListQuery_projects_items_managers {
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

export interface ProjectsListQuery_projects_items_assignees {
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

export interface ProjectsListQuery_projects_items_tasks {
  __typename: "Task";
  /**
   * ID of task
   */
  id: string;
}

export interface ProjectsListQuery_projects_items {
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
   * Deleted
   */
  deleted: boolean;
  /**
   * Creator of project
   */
  createdBy: ProjectsListQuery_projects_items_createdBy;
  /**
   * Managers of project
   */
  managers: ProjectsListQuery_projects_items_managers[];
  /**
   * Tasks of project
   */
  assignees: ProjectsListQuery_projects_items_assignees[];
  /**
   * Tasks of project
   */
  tasks: ProjectsListQuery_projects_items_tasks[];
}

export interface ProjectsListQuery_projects {
  __typename: "ProjectPagination";
  /**
   * Total project count
   */
  count: number;
  /**
   * List of projects
   */
  items: ProjectsListQuery_projects_items[];
}

export interface ProjectsListQuery {
  /**
   * Get all projects
   */
  projects: ProjectsListQuery_projects;
}

export interface ProjectsListQueryVariables {
  first?: number | null;
  skip?: number | null;
  orderBy?: string | null;
  orderDirection?: string | null;
  search?: string | null;
}
