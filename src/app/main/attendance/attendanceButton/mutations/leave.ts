import gql from 'graphql-tag';

export const LEAVE = gql`
  mutation Leave {
    leave {
      start
      end
    }
  }
`;
