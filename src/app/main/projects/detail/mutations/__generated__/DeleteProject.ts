/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteProject
// ====================================================

export interface DeleteProject {
  /**
   * Delete project.
   */
  deleteProject: number;
}

export interface DeleteProjectVariables {
  id: number;
  deleteTasks?: boolean | null;
}
