import gql from 'graphql-tag';

export const USERGROUPS_LIST = gql`
  query UserGroupsList(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
  ) {
    userGroups(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      count
      items {
        id
        name
        description
        members {
          id
          fullName
        }
      }
    }
  }
`;
