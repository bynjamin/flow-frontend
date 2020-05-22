import gql from 'graphql-tag';

export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(taskId: $id)
  }
`;
