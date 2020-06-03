/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Task state
 */
export enum TaskState {
  FINISHED = "FINISHED",
  IN_PROGRESS = "IN_PROGRESS",
  NOT_STARTED = "NOT_STARTED",
  WAITING = "WAITING",
}

/**
 * Access input type
 */
export interface AccessInput {
  basic: ActionInput;
  global: ActionInput;
}

/**
 * Action input type
 */
export interface ActionInput {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
