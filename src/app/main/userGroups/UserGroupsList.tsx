import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import FuseLoading from '@fuse/core/FuseLoading';
import { useHistory } from 'react-router';
import DataTable from 'app/components/table/DataTable';
import useTableState from 'app/components/table/useTableState';
import CreateUserGroupDialog from './CreateUserGroupDialog';
import DeleteUserGroupsDialog from './DeleteUserGroupsDialog';
import { DEFAULT_PAGE_SIZE } from 'app/constants';
import {
  // eslint-disable-next-line no-unused-vars
  UserGroupsListQuery as DataType,
  // eslint-disable-next-line no-unused-vars
  UserGroupsListQuery_userGroups_items_members as MemberType,
} from './__generated__/UserGroupsListQuery';

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
          fullName
        }
      }
    }
  }
`;

const UserGroupsList = () => {
  const history = useHistory();
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<number[] | null>(null);

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
      {
        Header: 'Members',
        accessor: 'members',
        className: 'font-bold',
        Cell: ({ cell: { value } }: any) => (
          <Tooltip
            placement="bottom-start"
            title={
              <>
                {value.map((member: MemberType) => (
                  <div key={member.id}>{member.fullName}</div>
                ))}
              </>
            }
          >
            <AvatarGroup max={3}>
              {value.map((member: MemberType) => (
                <Avatar key={member.id} alt={member.fullName}>
                  {member.fullName[0]}
                </Avatar>
              ))}
            </AvatarGroup>
          </Tooltip>
        ),
      },
    ],
    [],
  );

  function toggleCreateDialogOpen() {
    setCreateDialogOpen(!createDialogOpen);
  }

  function handleRowClick(userGroupId: number) {
    history.push(`/user-groups/detail/${userGroupId}`);
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
    const { items, count } = data.userGroups;

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
          onDelete={handleDelete}
        />
        <CreateUserGroupDialog
          open={createDialogOpen}
          onClose={toggleCreateDialogOpen}
        />
        {deleteIds && (
          <DeleteUserGroupsDialog
            deleteIds={deleteIds}
            onComplete={handleDeleteComplete}
          />
        )}
      </>
    );
  }

  return <FuseLoading />;
};

export default UserGroupsList;
