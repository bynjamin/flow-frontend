import gql from 'graphql-tag';

export const ADD_USERS_TO_GROUP = gql`
  mutation AddUsersToUserGroup($groupId: Int!, $userIds: [Int!]!) {
    addUsersToUserGroup(groupId: $groupId, users: $userIds) {
      id
      name
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
