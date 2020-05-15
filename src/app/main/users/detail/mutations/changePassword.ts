import gql from 'graphql-tag';

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $oldPassword: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    updatePassword(
      oldPassword: $oldPassword
      password: $password
      passwordConfirm: $passwordConfirm
    ) {
      id
    }
  }
`;
