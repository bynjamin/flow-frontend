import gql from 'graphql-tag';

export const TASKS_LIST = gql`
  query TasksList(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
    $search: String
  ) {
    tasks(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      search: $search
    ) {
      count
      items {
        id
        name
        description
        deleted
        status
        deadline
        createdBy {
          id
          fullName
        }
        assignees {
          id
          fullName
        }
        project {
          id
          name
        }
      }
    }
  }
`;
