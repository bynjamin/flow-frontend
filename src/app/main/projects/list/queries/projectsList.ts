import gql from 'graphql-tag';

export const PROJECTS_LIST = gql`
  query ProjectsList(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
    $search: String
  ) {
    projects(
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
        createdBy {
          id
          fullName
        }
        managers {
          id
          fullName
        }
        assignees {
          id
          fullName
        }
        tasks {
          id
        }
      }
    }
  }
`;
