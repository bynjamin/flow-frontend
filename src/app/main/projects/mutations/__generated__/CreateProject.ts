/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateProject
// ====================================================

export interface CreateProject_createProject_managers {
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

export interface CreateProject_createProject {
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
  managers: CreateProject_createProject_managers[];
}

export interface CreateProject {
  /**
   * Create project.
   */
  createProject: CreateProject_createProject;
}

export interface CreateProjectVariables {
  name: string;
  description: string;
  managersId: number[];
}
