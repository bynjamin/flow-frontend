import React from 'react';
import { has } from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { TestUsersQuery } from './__generated__/TestUsersQuery';
import { TestUserQuery } from './__generated__/TestUserQuery';
import { TestUserGroupsQuery } from './__generated__/TestUserGroupsQuery';
import { TestUserGroupQuery } from './__generated__/TestUserGroupQuery';
import { TestUserRolesQuery } from './__generated__/TestUserRolesQuery';
import { TestUserRoleQuery } from './__generated__/TestUserRoleQuery';
import { isArray } from 'util';

const TEST_USERS_QUERY = gql`
  query TestUsersQuery {
    users {
      count
      items {
        id
        fullName
        email
      }
    }
  }
`;

const TEST_USER_QUERY = gql`
  query TestUserQuery {
    user(id: 1) {
      id
      fullName
      email
    }
  }
`;

const TEST_USERGROUPS_QUERY = gql`
  query TestUserGroupsQuery {
    userGroups {
      count
      items {
        id
        name
        members {
          id
        }
        memberCount
      }
    }
  }
`;

const TEST_USERGROUP_QUERY = gql`
  query TestUserGroupQuery {
    userGroup(groupId: 6) {
      id
      name
      members {
        id
      }
      memberCount
    }
  }
`;

const TEST_ROLES_QUERY = gql`
  query TestUserRolesQuery {
    userRoles {
      id
      name
      members {
        id
      }
    }
  }
`;

const TEST_ROLE_QUERY = gql`
  query TestUserRoleQuery {
    userRole(roleId: 3) {
      id
      name
      members {
        id
      }
    }
  }
`;

const renderTest = (data: any) => {
  return Object.keys(data).map(key => {
    if (has(data[key], 'count') && has(data[key], 'items')) {
      return (
        <>
          <p key={key}>
            {key}:<span style={{ color: 'green' }}>{' Pagination'}</span>
          </p>
          <div style={{ color: 'gray' }}>{`count:${data[key].count}`}</div>
          <div style={{ color: 'gray' }}>{`items: ${JSON.stringify(
            data[key].items,
          )}`}</div>
          <br />
        </>
      );
    }
    return (
      <>
        <p key={key}>
          {key}:
          <span style={{ color: 'green' }}>
            {isArray(data[key])
              ? ` Array [${data[key].length}]`
              : ' One Record'}
          </span>
        </p>
        <div style={{ color: 'gray' }}>{JSON.stringify(data[key])}</div>
        <br />
      </>
    );
  });
};

const UsersTest = () => {
  const { loading, error, data } = useQuery<TestUsersQuery>(TEST_USERS_QUERY);

  if (loading) return <p>users: Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{`users: ${error.message}`}</p>;
  if (data) return <>{renderTest(data)}</>;

  return <p>Something bad happend :D</p>;
};

const UserTest = () => {
  const { loading, error, data } = useQuery<TestUserQuery>(TEST_USER_QUERY);

  if (loading) return <p>user(1): Loading...</p>;
  if (error)
    return <p style={{ color: 'red' }}>{`user(1): ${error.message}`}</p>;
  if (data) return <>{renderTest(data)}</>;

  return <p>Something bad happend :D</p>;
};

const UserGroupsTest = () => {
  const { loading, error, data } = useQuery<TestUserGroupsQuery>(
    TEST_USERGROUPS_QUERY,
  );

  if (loading) return <p>userGroups: Loading...</p>;
  if (error)
    return <p style={{ color: 'red' }}>{`userGroups: ${error.message}`}</p>;
  if (data) return <>{renderTest(data)}</>;

  return <p>Something bad happend :D</p>;
};

const UserGroupTest = () => {
  const { loading, error, data } = useQuery<TestUserGroupQuery>(
    TEST_USERGROUP_QUERY,
  );

  if (loading) return <p>userGroup(6): Loading...</p>;
  if (error)
    return <p style={{ color: 'red' }}>{`userGroup(6): ${error.message}`}</p>;
  if (data) return <>{renderTest(data)}</>;

  return <p>Something bad happend :D</p>;
};

const UserRolesTest = () => {
  const { loading, error, data } = useQuery<TestUserRolesQuery>(
    TEST_ROLES_QUERY,
  );

  if (loading) return <p>userRoles: Loading...</p>;
  if (error)
    return <p style={{ color: 'red' }}>{`userRoles: ${error.message}`}</p>;
  if (data) return <>{renderTest(data)}</>;

  return <p>Something bad happend :D</p>;
};

const UserRoleTest = () => {
  const { loading, error, data } = useQuery<TestUserRoleQuery>(TEST_ROLE_QUERY);

  if (loading) return <p>userRole(3): Loading...</p>;
  if (error)
    return <p style={{ color: 'red' }}>{`userRole(3): ${error.message}`}</p>;
  if (data) return <>{renderTest(data)}</>;

  return <p>Something bad happend :D</p>;
};

const Test = () => (
  <>
    <UsersTest />
    <UserTest />
    <UserGroupsTest />
    <UserGroupTest />
    <UserRolesTest />
    <UserRoleTest />
  </>
);

export default Test;
