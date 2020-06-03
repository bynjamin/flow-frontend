import gql from 'graphql-tag';

export const USERS_LIST = gql`
  query UsersList(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
    $search: String
  ) {
    users(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      search: $search
    ) {
      count
      items {
        id
        title
        firstName
        lastName
        email
        phone
        role {
          id
          name
        }
        groups {
          id
          name
        }
      }
    }
  }
`;
