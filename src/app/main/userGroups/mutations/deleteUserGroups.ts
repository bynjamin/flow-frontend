import gql from 'graphql-tag';

export const DELETE_USER_GROUPS = gql`
  mutation DeleteUserGroups($ids: [Int!]!) {
    deleteUserGroups(groupIds: $ids)
  }
`;
