import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import FuseLoading from '@fuse/core/FuseLoading';
import { useHistory } from 'react-router';
import DataTable from 'app/components/uncontrolledTable/DataTable';
import {
  // eslint-disable-next-line no-unused-vars
  RolesListQuery as DataType,
  // eslint-disable-next-line no-unused-vars
  RolesListQuery_userRoles_members as MemberType,
} from './__generated__/RolesListQuery';

export const ROLES_LIST_QUERY = gql`
  query RolesListQuery {
    userRoles {
      id
      name
      description
      members {
        id
        fullName
      }
      memberCount
    }
  }
`;

const RolesList = () => {
  const history = useHistory();

  const { loading, error, data } = useQuery<DataType>(ROLES_LIST_QUERY);

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
      {
        Header: 'Count of members',
        accessor: 'memberCount',
        className: 'font-bold',
      },
    ],
    [],
  );

  function handleRowClick(roleId: number) {
    history.push(`/roles/detail/${roleId}`);
  }

  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
  if (data) {
    const { userRoles: items } = data;

    return (
      <>
        <CssBaseline />
        <DataTable
          title="Roles"
          columns={columns}
          data={items}
          onRowClick={handleRowClick}
          loading={loading}
        />
      </>
    );
  }

  return <FuseLoading />;
};

export default RolesList;
