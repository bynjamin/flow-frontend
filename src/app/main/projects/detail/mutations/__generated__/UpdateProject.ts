/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateProject
// ====================================================

export interface UpdateProject_updateProject_managers {
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

export interface UpdateProject_updateProject {
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
  managers: UpdateProject_updateProject_managers[];
}

export interface UpdateProject {
  /**
   * Update project.
   */
  updateProject: UpdateProject_updateProject;
}

export interface UpdateProjectVariables {
  projectId: number;
  name: string;
  description: string;
  managersId: number[];
}
