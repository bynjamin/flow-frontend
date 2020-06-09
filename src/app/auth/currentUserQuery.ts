import gql from 'graphql-tag';

export const CURRENT_USER = gql`
  query CurrentUserQuery {
    user {
      id
      fullName
      email
      role {
        id
        name
      }
      workState
      allPermissions {
        model
        actions {
          basic {
            create
            read
            update
            delete
          }
          global {
            read
            update
            delete
          }
        }
      }
    }
  }
`;
