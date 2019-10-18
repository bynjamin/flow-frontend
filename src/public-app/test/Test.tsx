import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const DAY_QUERY = gql`
  {
    testQuery (text:"Ahoj - skusam test query")
  }
`;

const Test = () => {
  const { loading, error, data } = useQuery(DAY_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (data) return <p>{JSON.stringify(data)}</p>;

  return <p>Something bad happend :D</p>;
};

export default Test;
