import React, { useMemo, useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import ColorAvatar from 'app/components/ColorAvatar';
import FuseLoading from '@fuse/core/FuseLoading';
import { useHistory } from 'react-router';
// import UsersMultiSelectMenu from './UsersMultiSelectMenu';
import DataTable from 'app/components/table/DataTable';
import useTableState from 'app/components/table/useTableState';
import InviteUserDialog from './InviteUserDialog';
import DeleteUsersDialog from './DeleteUsersDialog';
import { DEFAULT_PAGE_SIZE } from 'app/constants';
import { AppContext } from 'app/AppContext';

import { USERS_LIST } from './queries/usersList';
import {
  UsersList as DataType,
  UsersListVariables as InputType,
  UsersList_users_items_groups as GroupType,
} from './queries/__generated__/UsersList';

const UsersList = () => {
  const history = useHistory();
  const { permissions } = useContext(AppContext);
  const [inviteDialogOpen, setInviteDialogOpen] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<number[] | null>(null);

  const {
    page,
    pageSize,
    order,
    globalFilter,
    setPage,
    setPageSize,
    setOrder,
    setGlobalFilter,
  } = useTableState();

  const { loading, error, data, refetch } = useQuery<DataType, InputType>(
    USERS_LIST,
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
        Header: ' ',
        accessor: '',
        Cell: ({ row: { original } }: any) => (
          <ColorAvatar colorString={original.email}>
            {original.firstName[0]}
          </ColorAvatar>
        ),
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

  function toggleInviteDialogOpen() {
    setInviteDialogOpen(!inviteDialogOpen);
  }

  function handleRowClick(userId: number) {
    history.push(`/users/detail/${userId}`);
  }

  function getQueryVariables(pageNum: number) {
    const { orderBy, orderDirection } = order;
    const skip = pageNum * pageSize;
    const first = pageSize;
    return { first, skip, orderBy, orderDirection, search: globalFilter };
  }

  function loadPage(pageNum: number): void {
    refetch(getQueryVariables(pageNum));
    setPage(pageNum);
    /*
    fetchMore({
      variables: getQueryVariables(pageNum),
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setPage(pageNum);
        return fetchMoreResult;
      },
    });
    */
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

  const canCreate = () => permissions.User.basic.create;

  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
  if (data) {
    const { items, count } = data.users;

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
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          loading={loading}
          onCreate={canCreate() ? toggleInviteDialogOpen : undefined}
          onDelete={handleDelete}
          sortableColumns={['title', 'firstName', 'lastName', 'email']}
        />
        <InviteUserDialog
          open={inviteDialogOpen}
          onClose={toggleInviteDialogOpen}
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
