import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const TEST_QUERY = gql`
  query UsersQuery {
    usersQuery {
      id
    }
  }
`;

const Test = () => {
  const { loading, error, data } = useQuery(TEST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (data) return <p>{JSON.stringify(data)}</p>;

  return <p>Something bad happend :D</p>;
};

export default Test;
