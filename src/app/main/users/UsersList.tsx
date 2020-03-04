import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  Avatar,
  Checkbox,
  Icon,
  IconButton,
  Typography,
  CssBaseline,
} from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseUtils from '@fuse/utils';
import ReactTable from 'react-table-6';
import { useTable, usePagination } from 'react-table';
import { useHistory } from 'react-router';
import UsersMultiSelectMenu from './UsersMultiSelectMenu';
import { UserListQuery } from './__generated__/UserListQuery';
import DataTable from 'common/components/table/DataTable2';

const USERLIST_QUERY = gql`
  query UserListQuery {
    usersQuery {
      id
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
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const selectedContactIds: Array<number> = [];
  const searchText = '';
  const user: any = {};
  console.log('X');

  const columns = useMemo(
    () => [
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
    ],
    [],
  );

  const updateMyData = (rowIndex: any, columnId: any, value: any) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    /*
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      }),
    );
    */
  };

  if (loading) return <FuseLoading />;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
  if (data) {
    console.log('data', data);
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
        <>
          <CssBaseline />
          <DataTable
            columns={columns}
            data={users}
            setData={() => console.log('updateData')}
            updateMyData={updateMyData}
            skipPageReset={skipPageReset}
          />
        </>
      </FuseAnimate>
    );
  }

  return <p>Something bad happend :D</p>;
};

export default UsersList;
