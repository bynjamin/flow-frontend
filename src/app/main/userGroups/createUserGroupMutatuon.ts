import gql from 'graphql-tag';

export const CREATE_USER_GROUP = gql`
  mutation CreateUserGroup($name: String!, $description: String!) {
    CreateUserGroup(name: $name, description: $description) {
      id
    }
  }
`;
