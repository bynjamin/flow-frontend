import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  Avatar,
  Checkbox,
  Icon,
  IconButton,
  Typography,
} from '@material-ui/core';
import { FuseUtils, FuseAnimate, FuseLoading } from '@fuse';
import ReactTable from 'react-table-6';
import { useHistory } from 'react-router';
import UsersMultiSelectMenu from './UsersMultiSelectMenu';
import { UserListQuery } from './__generated__/UserListQuery';

const USERLIST_QUERY = gql`
  query UserListQuery {
    usersQuery {
      id
      userName
      title
      firstName
      lastName
      email
    }
  }
`;

const UsersList = () => {
  const history = useHistory();
  const { loading, error, data } = useQuery<UserListQuery>(USERLIST_QUERY);
  const selectedContactIds: Array<number> = [];
  const searchText = '';
  const user: any = {};

  if (loading) return <FuseLoading />;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
  if (data) {
    const users = data.usersQuery;

    if (users.length === 0) {
      return (
        <div className="flex flex-1 items-center justify-center h-full">
          <Typography color="textSecondary" variant="h5">
            There are no users!
          </Typography>
        </div>
      );
    }

    return (
      <FuseAnimate animation="transition.slideUpIn" delay={300}>
        <ReactTable
          className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
          getTrProps={(state: any, rowInfo: any, column: any) => {
            return {
              className: 'cursor-pointer',
              onClick: (e: any, handleOriginal: any) => {
                if (rowInfo) {
                  history.push(`/users/detail/${rowInfo.original.id}`);
                }
              },
            };
          }}
          getTheadProps={(state: any, rowInfo: any, column: any) => {
            return {
              className: 'table-header-fix',
            };
          }}
          data={users}
          columns={[
            {
              Header: () => (
                <Checkbox
                  onClick={event => {
                    event.stopPropagation();
                  }}
                  onChange={event => {
                    event.target.checked
                      ? console.log('Select all users')
                      : console.log('Deselect all users');
                  }}
                  checked={
                    selectedContactIds.length === users?.length &&
                    selectedContactIds.length > 0
                  }
                  indeterminate={
                    selectedContactIds.length !== users?.length &&
                    selectedContactIds.length > 0
                  }
                />
              ),
              accessor: '',
              Cell: (row: any) => {
                return (
                  <Checkbox
                    onClick={(event: any) => {
                      event.stopPropagation();
                    }}
                    checked={selectedContactIds.includes(row.value.id)}
                    onChange={
                      () => console.log('Select user') // dispatch(Actions.toggleInSelectedContacts(row.value.id))
                    }
                  />
                );
              },
              className: 'justify-center',
              sortable: false,
              width: 64,
            },
            {
              Header: () =>
                selectedContactIds.length > 0 && <UsersMultiSelectMenu />,
              accessor: 'avatar',
              Cell: (row: any) => (
                <Avatar
                  className="mr-8"
                  alt={row.original.name}
                  src={row.value}
                />
              ),
              className: 'justify-center',
              width: 64,
              sortable: false,
            },
            {
              Header: 'Username',
              accessor: 'userName',
              className: 'font-bold',
            },
            {
              Header: 'Title',
              accessor: 'title',
              className: 'font-bold',
            },
            {
              Header: 'First Name',
              accessor: 'firstName',
              className: 'font-bold',
            },
            {
              Header: 'Last Name',
              accessor: 'lastName',
              className: 'font-bold',
            },
            {
              Header: 'Email',
              accessor: 'email',
            },
            {
              Header: 'Phone',
              accessor: 'phone',
            },
          ]}
          defaultPageSize={10}
          noDataText="No users found"
        />
      </FuseAnimate>
    );
  }

  return <p>Something bad happend :D</p>;
};

export default UsersList;
