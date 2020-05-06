import React, { useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useHistory } from 'react-router';
import DataTable from 'app/components/uncontrolledTable/DataTable';

type Props = {
  members: any;
};

const Members = ({ members }: Props) => {
  const history = useHistory();

  const columns = useMemo(
    () => [
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
        title="Members"
        columns={columns}
        data={members}
        onRowClick={handleRowClick}
        loading={false}
        onCreate={() => console.log('add')}
        onDelete={() => console.log('delete')}
        size="small"
      />
    </>
  );
};

export default Members;
