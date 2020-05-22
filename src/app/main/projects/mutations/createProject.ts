import gql from 'graphql-tag';

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $name: String!
    $description: String!
    $managersId: [Int!]!
  ) {
    createProject(
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
