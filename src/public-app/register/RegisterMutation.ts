import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation RegistrationMutation(
    $company: String!
    $mail: String!
    $fullName: String!
    $password: String!
    $passwordConfirm: String!
    $captcha: String!
    $siteAddress: String!
  ) {
    newRegistration(
      company: $company
      mail: $mail
      fullName: $fullName
      password: $password
      passwordConfirm: $passwordConfirm
      captcha: $captcha
      siteAddress: $siteAddress
    )
  }
`;
