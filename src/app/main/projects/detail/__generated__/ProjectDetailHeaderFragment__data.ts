/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProjectDetailHeaderFragment__data
// ====================================================

export interface ProjectDetailHeaderFragment__data_managers {
  __typename: "User";
  /**
   * User ID
   */
  id: number;
  /**
   * User email
   */
  email: string;
}

export interface ProjectDetailHeaderFragment__data {
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
  managers: ProjectDetailHeaderFragment__data_managers[];
}
