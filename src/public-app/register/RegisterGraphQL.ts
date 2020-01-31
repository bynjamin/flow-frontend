import publicGql from 'graphql-tag';

export const REGISTER = publicGql`
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
    ) {
      fqdn
    }
  }
`;

export const SITE_ADDRESS_CHECK = publicGql`
  query IsSiteAddressAvailable($siteAddress: String!) {
    isSiteAddressAvailable(siteAddress: $siteAddress)
  }
`;
