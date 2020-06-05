import gql from 'graphql-tag';

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $userId: Int
    $firstName: String
    $lastName: String
    $title: String
    $phone: String
    $about: String
    $gender: String
    $gdpr: Boolean
    $position: String
    $employmentType: String
    $street: String
    $city: String
    $zip: String
    $country: String
    $roleId: Int
  ) {
    updateUser(
      userId: $userId
      firstName: $firstName
      lastName: $lastName
      title: $title
      phone: $phone
      about: $about
      gender: $gender
      gdpr: $gdpr
      position: $position
      employmentType: $employmentType
      street: $street
      city: $city
      zip: $zip
      country: $country
      roleId: $roleId
    ) {
      id
      title
      fullName
      firstName
      lastName
      email
      role {
        id
        name
      }
      gender
      about
      phone
      gdpr
      position
      employmentType
      address {
        street
        zip
        city
        country
      }
    }
  }
`;
