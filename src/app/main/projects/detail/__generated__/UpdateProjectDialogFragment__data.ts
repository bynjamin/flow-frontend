/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UpdateProjectDialogFragment__data
// ====================================================

export interface UpdateProjectDialogFragment__data_managers {
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

export interface UpdateProjectDialogFragment__data {
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
  managers: UpdateProjectDialogFragment__data_managers[];
}
