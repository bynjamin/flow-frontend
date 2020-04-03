import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Typography, CssBaseline } from '@material-ui/core';
import FuseLoading from '@fuse/core/FuseLoading';
import { useHistory } from 'react-router';
// import UsersMultiSelectMenu from './UsersMultiSelectMenu';
import DataTable from 'app/components/table/DataTable';
import useTableState from 'app/components/table/useTableState';
// import AddUserDialog from './AddUserDialog';
import CreateUserGroupDialog from './CreateUserGroupDialog';
import { DEFAULT_PAGE_SIZE } from 'app/constants';
import { UserGroupsListQuery as DataType } from './__generated__/UserGroupsListQuery';

export const USERGROUPS_LIST_QUERY = gql`
  query UserGroupsListQuery(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
  ) {
    userGroups(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      count
      items {
        id
        name
        description
        members {
          id
        }
      }
    }
  }
`;

const UserGroupsList = () => {
  const history = useHistory();
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);

  const {
    page,
    pageSize,
    order,
    setPage,
    setPageSize,
    setOrder,
  } = useTableState();

  const { loading, error, data, fetchMore } = useQuery<DataType>(
    USERGROUPS_LIST_QUERY,
    {
      variables: {
        first: DEFAULT_PAGE_SIZE,
        skip: 0,
      },
      fetchPolicy: 'cache-and-network',
    },
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        className: 'font-bold',
      },
      {
        Header: 'Description',
        accessor: 'description',
        className: 'font-bold',
      },
    ],
    [],
  );

  const toggleCreateDialogOpen = () => {
    setCreateDialogOpen(!createDialogOpen);
  };

  const handleRowClick = (userGroupId: number) => {
    history.push(`/user-groups/detail/${userGroupId}`);
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
    const { items, count } = data.userGroups;
    if (items.length === 0) {
      return (
        <div className="flex flex-1 items-center justify-center h-full">
          <Typography color="textSecondary" variant="h5">
            There are no user groups!
          </Typography>
        </div>
      );
    }

    return (
      <>
        <CssBaseline />
        <DataTable
          title="User Groups"
          columns={columns}
          data={items}
          count={count}
          pageIndex={page}
          loadPage={loadPage}
          pageSize={pageSize}
          setPageSize={handleChangePageSize}
          order={order}
          setOrder={setOrder}
          onRowClick={handleRowClick}
          loading={loading}
          onCreate={toggleCreateDialogOpen}
        />
        <CreateUserGroupDialog
          open={createDialogOpen}
          onClose={toggleCreateDialogOpen}
        />
      </>
    );
  }

  return <FuseLoading />;
};

export default UserGroupsList;
