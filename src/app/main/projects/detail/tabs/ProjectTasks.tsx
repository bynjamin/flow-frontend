import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import gql from 'graphql-tag';
import StatusChip from 'app/components/StatusChip';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import DataTable from 'app/components/table/UncontrolledDataTable';
import CreateTaskDialog from 'app/main/tasks/list/CreateTaskDialog';
import { getDetailUrl } from 'app/helpers/linkResolver';

import {
  ProjectTasksFragment__data as DataType,
  ProjectTasksFragment__data_tasks_assignees as AssigneeType,
} from './__generated__/ProjectTasksFragment__data';

type Props = {
  data: DataType;
};

const ProjectTasks: React.FC<Props> = ({ data }) => {
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const history = useHistory();
  const columns = useMemo(
    () => [
      {
        Header: ' ',
        accessor: 'status',
        className: 'font-bold',
        Cell: ({ cell: { value } }: any) => <StatusChip status={value} />,
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
        Header: 'Assignees',
        accessor: 'assignees',
        Cell: ({ cell: { value } }: any) => (
          <Tooltip
            placement="bottom-start"
            title={
              <>
                {value.map((item: AssigneeType) => (
                  <div key={item.id}>{item.fullName}</div>
                ))}
              </>
            }
          >
            <AvatarGroup max={3}>
              {value.map((item: AssigneeType) => (
                <Avatar key={item.id}>{item.fullName[0]}</Avatar>
              ))}
            </AvatarGroup>
          </Tooltip>
        ),
      },
      {
        Header: 'Created By',
        accessor: 'createdBy',
        Cell: ({ cell: { value } }: any) => (
          <Tooltip placement="bottom-start" title={value.fullName}>
            <Avatar>{value.fullName?.[0]}</Avatar>
          </Tooltip>
        ),
      },
    ],
    [],
  );

  function handleRowClick(recordId: number) {
    history.push(getDetailUrl('tasks', recordId));
  }

  const project = { id: Number(data.id), name: data.name }; // todo: type-fix

  return (
    <>
      <div className="flex">
        <div className="w-full h-512">
          <DataTable
            title="Project Tasks"
            columns={columns}
            data={data.tasks}
            onRowClick={handleRowClick}
            loading={false}
            onCreate={() => setCreateDialogOpen(true)}
            // onDelete={() => console.log('Delete project task')}
            size="small"
          />
        </div>
      </div>
      <CreateTaskDialog
        open={createDialogOpen}
        setOpen={setCreateDialogOpen}
        project={project}
      />
    </>
  );
};

export default ProjectTasks;

export const ProjectTasksFragment = {
  data: gql`
    fragment ProjectTasksFragment__data on Project {
      id
      name
      tasks {
        id
        name
        description
        status
        deleted
        assignees {
          id
          fullName
          email
        }
        createdBy {
          id
          fullName
          email
        }
      }
    }
  `,
};
