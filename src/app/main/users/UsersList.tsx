import React, { useMemo, useState, useEffect } from 'react';
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
import DataTable from 'common/components/table/DataTable';
import useTableState from '../../hooks/TableState';
import { DEFAULT_PAGE_SIZE } from 'common/constants';

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

  const {
    page,
    pageSize,
    orderBy,
    orderDirection,
    setPage,
    setPageSize,
    setOrderBy,
    setOrderDirection,
  } = useTableState();

  const { loading, error, data, fetchMore } = useQuery<UserListQuery>(
    USERLIST_QUERY,
    {
      variables: {
        first: DEFAULT_PAGE_SIZE,
        skip: 0,
      },
      fetchPolicy: 'cache-and-network',
    },
  );

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

  const handleRowClick = (userId: number) => {
    history.push(`/users/detail/${userId}`);
  };

  const getQueryVariables = (pageNum: number) => {
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
  const resetCursor = () => loadPage(0);
  useEffect(resetCursor, [pageSize, orderBy, orderDirection]);

  if (loading) return <FuseLoading />;
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
      <FuseAnimate animation="transition.slideUpIn" delay={300}>
        <>
          <CssBaseline />
          <DataTable
            columns={columns}
            data={users}
            count={count}
            pageIndex={page}
            loadPage={loadPage}
            pageSize={pageSize}
            setPageSize={handleChangePageSize}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            orderDirection={orderDirection}
            setOrderDirection={setOrderDirection}
            onRowClick={handleRowClick}
          />
        </>
      </FuseAnimate>
    );
  }

  return <p>Something bad happend :D</p>;
};

export default UsersList;
