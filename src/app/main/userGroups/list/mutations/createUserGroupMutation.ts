import gql from 'graphql-tag';

export const CREATE_USER_GROUP = gql`
  mutation CreateUserGroup(
    $name: String!
    $description: String!
    $memberIds: [Int!]!
  ) {
    createUserGroup(
      name: $name
      description: $description
      memberIds: $memberIds
    ) {
      id
      name
      members {
        id
        email
        fullName
      }
    }
  }
`;
