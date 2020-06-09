import gql from 'graphql-tag';

export const ARRIVAL = gql`
  mutation Arrival {
    arrival {
      start
    }
  }
`;
