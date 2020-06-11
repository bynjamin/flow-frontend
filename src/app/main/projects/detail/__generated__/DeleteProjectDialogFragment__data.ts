/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DeleteProjectDialogFragment__data
// ====================================================

export interface DeleteProjectDialogFragment__data_tasks {
  __typename: "Task";
  /**
   * ID of task
   */
  id: string;
  /**
   * Name of task
   */
  name: string;
}

export interface DeleteProjectDialogFragment__data {
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
   * Tasks of project
   */
  tasks: DeleteProjectDialogFragment__data_tasks[];
}
