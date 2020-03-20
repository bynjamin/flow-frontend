import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Typography, CssBaseline } from '@material-ui/core';
import FuseLoading from '@fuse/core/FuseLoading';
import { useHistory } from 'react-router';
import UsersMultiSelectMenu from './UsersMultiSelectMenu';
import DataTable from 'app/components/table/DataTable';
import useTableState from 'app/components/table/useTableState';
import AddUserDialog from './AddUserDialog';
import {
  UserListQuery,
  UserListQueryVariables,
} from './__generated__/UserListQuery';
import { DEFAULT_PAGE_SIZE } from 'app/constants';

const USERLIST_QUERY = gql`
  query UserListQuery(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
  ) {
    usersQuery(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      count
      users {
        id
        title
        firstName
        lastName
        email
      }
    }
  }
`;

const UsersList = () => {
  const history = useHistory();
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);

  const {
    page,
    pageSize,
    order,
    setPage,
    setPageSize,
    setOrder,
  } = useTableState();

  const { loading, error, data, fetchMore } = useQuery<
    UserListQuery,
    UserListQueryVariables
  >(USERLIST_QUERY, {
    variables: {
      first: DEFAULT_PAGE_SIZE,
      skip: 0,
    },
    fetchPolicy: 'cache-and-network',
  });

  const selectedContactIds: Array<number> = [];
  const searchText = '';

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

  const toggleAddDialogOpen = () => {
    setAddDialogOpen(!addDialogOpen);
  };

  const handleRowClick = (userId: number) => {
    history.push(`/users/detail/${userId}`);
  };

  const getQueryVariables = (pageNum: number) => {
    const { orderBy, orderDirection } = order;
    const skip = pageNum * pageSize;
    const first = pageSize;
    return { first, skip, orderBy, orderDirection };
  };

  const loadPage = (pageNum: number): void => {
    fetchMore({
      variables: getQueryVariables(pageNum),
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setPage(pageNum);
        return fetchMoreResult;
      },
    });
  };

  const handleChangePageSize = (count: number): void => {
    setPageSize(count);
  };

  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
  if (data) {
    const { users, count } = data.usersQuery;
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
      <>
        <CssBaseline />
        <DataTable
          title="Users"
          columns={columns}
          data={users}
          count={count}
          pageIndex={page}
          loadPage={loadPage}
          pageSize={pageSize}
          setPageSize={handleChangePageSize}
          order={order}
          setOrder={setOrder}
          onRowClick={handleRowClick}
          loading={loading}
          onCreate={toggleAddDialogOpen}
        />
        <AddUserDialog
          addUserHandler={() => console.log('Add User')}
          open={addDialogOpen}
          onClose={toggleAddDialogOpen}
        />
      </>
    );
  }

  return <FuseLoading />;
};

export default UsersList;
