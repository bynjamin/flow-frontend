import React, { useMemo, useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import StatusChip from 'app/components/StatusChip';
import FuseLoading from '@fuse/core/FuseLoading';
import { useHistory } from 'react-router';
import DataTable from 'app/components/table/DataTable';
import useTableState from 'app/components/table/useTableState';
import { getDetailUrl } from 'app/helpers/linkResolver';
import { DEFAULT_PAGE_SIZE } from 'app/constants';
import { TASK_STATUSES, TaskStatusType } from '../constants';
import CreateTaskDialog from './CreateTaskDialog';
import { AppContext } from 'app/AppContext';

import { TASKS_LIST } from './queries/tasksList';
import {
  TasksList as DataType,
  TasksListVariables as InputType,
  TasksList_tasks_items_assignees as AssigneeType,
} from './queries/__generated__/TasksList';

const TasksList: React.FC = () => {
  const history = useHistory();
  const { permissions } = useContext(AppContext);
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  // const [deleteIds, setDeleteIds] = useState<number[] | null>(null);

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
    TASKS_LIST,
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
        accessor: 'status',
        className: 'font-bold',
        Cell: ({ cell: { value } }: any) => (
          <StatusChip status={TASK_STATUSES[value as TaskStatusType]} />
        ),
      },
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
        Header: 'Project',
        accessor: 'project.name',
        className: 'font-bold',
      },
      {
        Header: 'Assignees',
        accessor: 'assignees',
        className: 'font-bold',
        Cell: ({ cell: { value } }: any) => (
          <Tooltip
            placement="bottom-start"
            title={
              <>
                {value.map((assignee: AssigneeType) => (
                  <div key={assignee.id}>{assignee.fullName}</div>
                ))}
              </>
            }
          >
            <AvatarGroup max={3}>
              {value.map((assignee: AssigneeType) => (
                <Avatar key={assignee.id} alt={assignee.fullName}>
                  {assignee.fullName[0]}
                </Avatar>
              ))}
            </AvatarGroup>
          </Tooltip>
        ),
      },
      {
        Header: 'Created By',
        accessor: 'createdBy',
        className: 'font-bold',
        Cell: ({ cell: { value } }: any) => (
          <Tooltip placement="bottom-start" title={value.fullName}>
            <Avatar alt={value.fullName}>{value.fullName[0]}</Avatar>
          </Tooltip>
        ),
      },
    ],
    [],
  );

  function handleRowClick(recordId: number) {
    history.push(getDetailUrl('tasks', recordId));
  }

  function getQueryVariables(pageNum: number) {
    const { orderBy, orderDirection } = order;
    const skip = pageNum * pageSize;
    const first = pageSize;
    return { first, skip, orderBy, orderDirection, search: globalFilter };
  }

  function loadPage(pageNum: number): void {
    console.log('loadPage');
    refetch(getQueryVariables(pageNum));
    setPage(pageNum);
  }

  function handleChangePageSize(count: number): void {
    setPageSize(count);
  }

  const canCreate = () => permissions.Task.basic.create;

  /*
  function handleDeleteComplete() {
    setDeleteIds(null);
  }
  */

  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
  if (data) {
    const { items, count } = data.tasks;

    return (
      <>
        <CssBaseline />
        <DataTable
          title="Tasks"
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
          onCreate={canCreate() ? () => setCreateDialogOpen(true) : undefined}
          // onDelete={handleDelete}
        />
        <CreateTaskDialog
          open={createDialogOpen}
          setOpen={setCreateDialogOpen}
        />
        {/*
        {deleteIds && (
          <DeleteUserGroupsDialog
            deleteIds={deleteIds}
            onComplete={handleDeleteComplete}
          />
        )}
        */}
      </>
    );
  }

  return <FuseLoading />;
};

export default TasksList;
