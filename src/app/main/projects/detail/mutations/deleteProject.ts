import gql from 'graphql-tag';

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: Int!, $deleteTasks: Boolean) {
    deleteProject(projectId: $id, deleteTasks: $deleteTasks)
  }
`;
