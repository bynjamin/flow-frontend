import gql from 'graphql-tag';

export const INVITE_USER = gql`
  mutation InviteUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $title: String
    $phone: String
    $gender: String
    $position: String
    $employmentType: String
    $street: String
    $city: String
    $zip: String
    $country: String
  ) {
    inviteUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      title: $title
      phone: $phone
      gender: $gender
      position: $position
      employmentType: $employmentType
      street: $street
      city: $city
      zip: $zip
      country: $country
    )
  }
`;
