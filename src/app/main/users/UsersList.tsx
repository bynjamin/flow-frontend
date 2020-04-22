import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import FuseLoading from '@fuse/core/FuseLoading';
import { useHistory } from 'react-router';
import UsersMultiSelectMenu from './UsersMultiSelectMenu';
import DataTable from 'app/components/table/DataTable';
import useTableState from 'app/components/table/useTableState';
import AddUserDialog from './AddUserDialog';
import DeleteUsersDialog from './DeleteUsersDialog';
import {
  // eslint-disable-next-line no-unused-vars
  UserListQuery,
  // eslint-disable-next-line no-unused-vars
  UserListQueryVariables,
  // eslint-disable-next-line no-unused-vars
  UserListQuery_users_items_groups as GroupType,
} from './__generated__/UserListQuery';
import { DEFAULT_PAGE_SIZE } from 'app/constants';

const USERLIST_QUERY = gql`
  query UserListQuery(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
  ) {
    users(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      count
      items {
        id
        title
        firstName
        lastName
        email
        phone
        role {
          id
          name
        }
        groups {
          id
          name
        }
      }
    }
  }
`;

const UsersList = () => {
  const history = useHistory();
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<number[] | null>(null);

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
      {
        Header: 'Role',
        accessor: 'role.name',
      },
      {
        Header: 'Groups',
        accessor: 'groups',
        Cell: ({ cell: { value } }: any) => (
          <Tooltip
            placement="bottom-start"
            title={
              <>
                {value.map((group: GroupType) => (
                  <div key={group.id}>{group.name}</div>
                ))}
              </>
            }
          >
            <AvatarGroup max={3}>
              {value.map((group: GroupType) => (
                <Avatar key={group.id} alt={group.name}>
                  {group.name[0]}
                </Avatar>
              ))}
            </AvatarGroup>
          </Tooltip>
        ),
      },
    ],
    [],
  );

  function toggleAddDialogOpen() {
    setAddDialogOpen(!addDialogOpen);
  }

  function handleRowClick(userId: number) {
    history.push(`/users/detail/${userId}`);
  }

  function getQueryVariables(pageNum: number) {
    const { orderBy, orderDirection } = order;
    const skip = pageNum * pageSize;
    const first = pageSize;
    return { first, skip, orderBy, orderDirection };
  }

  function loadPage(pageNum: number): void {
    fetchMore({
      variables: getQueryVariables(pageNum),
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setPage(pageNum);
        return fetchMoreResult;
      },
    });
  }

  function handleChangePageSize(count: number): void {
    setPageSize(count);
  }

  function handleDelete(_deleteIds: number[]): void {
    setDeleteIds(_deleteIds);
  }

  function handleDeleteComplete() {
    setDeleteIds(null);
  }

  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
  if (data) {
    const { items, count } = data.users;
    if (items.length === 0) {
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
          onCreate={toggleAddDialogOpen}
          onDelete={handleDelete}
        />
        <AddUserDialog
          addUserHandler={() => console.log('Add User')}
          open={addDialogOpen}
          onClose={toggleAddDialogOpen}
        />
        {deleteIds && (
          <DeleteUsersDialog
            deleteIds={deleteIds}
            onComplete={handleDeleteComplete}
          />
        )}
      </>
    );
  }

  return <FuseLoading />;
};

export default UsersList;
