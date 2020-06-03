import gql from 'graphql-tag';

export const ROLES_LIST = gql`
  query RolesList {
    userRoles {
      id
      name
      description
      members {
        id
        fullName
        email
      }
      memberCount
    }
  }
`;
