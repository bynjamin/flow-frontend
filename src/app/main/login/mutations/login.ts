import publicGql from 'graphql-tag';

export const LOGIN = publicGql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      tokenType
      expiresIn
      fqdn
      user {
        id
        email
        fullName
        workState
        role {
          id
          name
          level
        }
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
  }
`;
