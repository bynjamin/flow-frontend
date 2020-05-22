import React, { useMemo } from 'react';
import gql from 'graphql-tag';
import Tooltip from '@material-ui/core/Tooltip';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import DataTable from 'app/components/table/UncontrolledDataTable';
import ColorAvatar from 'app/components/ColorAvatar';
import {
  ProjectTasksFragment__data as DataType,
  ProjectTasksFragment__data_assignees as AssigneeType,
} from './__generated__/ProjectTasksFragment__data';

type Props = {
  data: DataType[];
};

const ProjectTasks: React.FC<Props> = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
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
                <ColorAvatar key={item.id} colorString={item.email}>
                  {item.fullName[0]}
                </ColorAvatar>
              ))}
            </AvatarGroup>
          </Tooltip>
        ),
      },
      {
        Header: 'Created By',
        accessor: 'createdBy',
        Cell: ({ row: { original } }: any) => (
          <ColorAvatar colorString={original.email}>
            {original.fullName[0]}
          </ColorAvatar>
        ),
      },
    ],
    [],
  );

  function handleRowClick(recordId: number) {
    // history.push(`/users/detail/${userId}`);
    console.log('Redirect to task detail');
  }

  return (
    <div className="flex">
      <div className="w-full h-512">
        <DataTable
          title="Project Tasks"
          columns={columns}
          data={data}
          onRowClick={handleRowClick}
          loading={false}
          onCreate={() => console.log('Create project task')}
          onDelete={() => console.log('Delete project task')}
          size="small"
        />
      </div>
    </div>
  );
};

export default ProjectTasks;

export const ProjectTasksFragment = {
  data: gql`
    fragment ProjectTasksFragment__data on Task {
      id
      name
      description
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
  `,
};
