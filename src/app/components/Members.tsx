import React, { useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useHistory } from 'react-router';
import DataTable from 'app/components/uncontrolledTable/DataTable';
import ColorAvatar from 'app/components/ColorAvatar';

type Props = {
  members: any;
  title?: string;
  onAdd?: () => void;
  onRemove?: () => void;
};

const Members = ({ members, onAdd, onRemove, title = 'Members' }: Props) => {
  const history = useHistory();

  const columns = useMemo(
    () => [
      {
        Header: ' ',
        accessor: '',
        Cell: ({ row: { original } }: any) => (
          <ColorAvatar colorString={original.email}>
            {original.fullName[0]}
          </ColorAvatar>
        ),
      },
      {
        Header: 'Title',
        accessor: 'title',
        className: 'font-bold',
      },
      {
        Header: 'Full Name',
        accessor: 'fullName',
        className: 'font-bold',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Role',
        accessor: 'role.name',
      },
    ],
    [],
  );

  function handleRowClick(userId: number) {
    history.push(`/users/detail/${userId}`);
  }

  return (
    <>
      <CssBaseline />
      <DataTable
        title={title}
        columns={columns}
        data={members}
        onRowClick={handleRowClick}
        loading={false}
        onCreate={onAdd}
        onDelete={onRemove}
        size="small"
      />
    </>
  );
};

export default Members;
