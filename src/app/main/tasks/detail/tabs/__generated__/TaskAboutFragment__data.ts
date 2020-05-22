/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TaskAboutFragment__data
// ====================================================

export interface TaskAboutFragment__data_assignees {
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

export interface TaskAboutFragment__data_project {
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

export interface TaskAboutFragment__data_createdBy {
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

export interface TaskAboutFragment__data {
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
   * Status of task
   */
  status: string;
  /**
   * Deadline of task
   */
  deadline: string;
  /**
   * Assignees of task
   */
  assignees: TaskAboutFragment__data_assignees[];
  /**
   * Project for this task
   */
  project: TaskAboutFragment__data_project;
  /**
   * Creator of task
   */
  createdBy: TaskAboutFragment__data_createdBy;
}
