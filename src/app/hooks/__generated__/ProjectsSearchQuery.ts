/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectsSearchQuery
// ====================================================

export interface ProjectsSearchQuery_projects_items {
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

export interface ProjectsSearchQuery_projects {
  __typename: "ProjectPagination";
  /**
   * Total project count
   */
  count: number;
  /**
   * List of projects
   */
  items: ProjectsSearchQuery_projects_items[];
}

export interface ProjectsSearchQuery {
  /**
   * Get all projects
   */
  projects: ProjectsSearchQuery_projects;
}

export interface ProjectsSearchQueryVariables {
  first?: number | null;
  search?: string | null;
}
