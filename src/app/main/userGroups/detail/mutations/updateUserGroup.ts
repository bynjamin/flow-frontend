import gql from 'graphql-tag';

export const UPDATE_USER_GROUP = gql`
  mutation UpdateUserGroup(
    $groupId: Int!
    $name: String!
    $description: String!
    $memberIds: [Int!]!
  ) {
    updateUserGroup(
      groupId: $groupId
      name: $name
      description: $description
      memberIds: $memberIds
    ) {
      id
      name
      description
      members {
        id
        title
        fullName
        email
        role {
          id
          name
        }
      }
    }
  }
`;
