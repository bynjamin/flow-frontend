import gql from 'graphql-tag';

export const DELETE_USERS = gql`
  mutation DeleteUsers($ids: [Int!]!) {
    deleteUsers(userIds: $ids)
  }
`;
