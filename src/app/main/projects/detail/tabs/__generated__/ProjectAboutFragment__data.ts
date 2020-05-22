/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProjectAboutFragment__data
// ====================================================

export interface ProjectAboutFragment__data_assignees {
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

export interface ProjectAboutFragment__data_managers {
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

export interface ProjectAboutFragment__data_createdBy {
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

export interface ProjectAboutFragment__data {
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
   * Tasks of project
   */
  assignees: ProjectAboutFragment__data_assignees[];
  /**
   * Managers of project
   */
  managers: ProjectAboutFragment__data_managers[];
  /**
   * Creator of project
   */
  createdBy: ProjectAboutFragment__data_createdBy;
}
