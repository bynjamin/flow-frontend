import gql from 'graphql-tag';

export const DELETE_USER_GROUP = gql`
  mutation DeleteUserGroup($id: Int!) {
    deleteUserGroup(groupId: $id)
  }
`;
