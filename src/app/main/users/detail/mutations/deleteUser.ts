import gql from 'graphql-tag';

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(userId: $id)
  }
`;
