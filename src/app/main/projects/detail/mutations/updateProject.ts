import gql from 'graphql-tag';

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $projectId: Int!
    $name: String!
    $description: String!
    $managersId: [Int!]!
  ) {
    updateProject(
      projectId: $projectId
      name: $name
      description: $description
      managersId: $managersId
    ) {
      id
      name
      description
      managers {
        id
        fullName
      }
    }
  }
`;
