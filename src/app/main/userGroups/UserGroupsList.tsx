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
import { UserGroupsListQuery } from './__generated__/UserGroupsListQuery';

const USERGROUPS_LIST_QUERY = gql`
  query UserGroupsListQuery {
    userGroups {
      name
      description
      users {
        id
      }
    }
  }
`;

const UserGroupsList = () => {
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

  const { loading, error, data, fetchMore } = useQuery<UserGroupsListQuery>(
    USERGROUPS_LIST_QUERY,
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

  const toggleAddDialogOpen = () => {
    setAddDialogOpen(!addDialogOpen);
  };

  const handleRowClick = (userGroupId: number) => {
    history.push(`/users-groups/detail/${userGroupId}`);
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
    const { userGroups } = data;
    if (userGroups.length === 0) {
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
          data={userGroups}
          count={userGroups.length}
          pageIndex={page}
          loadPage={loadPage}
          pageSize={userGroups.length}
          setPageSize={handleChangePageSize}
          order={order}
          setOrder={setOrder}
          onRowClick={handleRowClick}
          loading={loading}
          onCreate={toggleAddDialogOpen}
        />
      </>
    );
  }

  return <FuseLoading />;
};

export default UserGroupsList;
