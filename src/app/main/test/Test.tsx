import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { TestQuery } from './__generated__/TestQuery';
import { isArray } from 'util';

const TEST_QUERY = gql`
  query TestQuery {
    usersQuery {
      count
      users {
        id
        fullName
        email
      }
    }
    userQuery(id: 1) {
      id
      fullName
      email
    }
  }
`;

const renderTest = (data: any) => {
  return Object.keys(data).map(key => (
    <>
      <p key={key}>
        {key}:
        <span style={{ color: 'green' }}>
          {isArray(data[key]) ? ` Array [${data[key].length}]` : ' One Record'}
        </span>
      </p>
      <div style={{ color: 'gray' }}>{JSON.stringify(data[key])}</div>
      <br />
    </>
  ));
};

const Test = () => {
  const { loading, error, data } = useQuery<TestQuery>(TEST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
  if (data) return renderTest(data);

  return <p>Something bad happend :D</p>;
};

export default Test;
