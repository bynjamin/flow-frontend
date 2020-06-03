import gql from 'graphql-tag';

export const ROLES = gql`
  query InviteUserDialogRoles {
    userRoles {
      id
      name
    }
  }
`;
