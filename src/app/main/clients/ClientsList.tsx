import React, { useMemo } from 'react';
import {
  Avatar,
  Checkbox,
  Icon,
  IconButton,
  Typography,
} from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import ReactTable from 'react-table-6';
import DataTable from 'common/components/table/DataTable';
import ClientsMultiSelectMenu from './ClientsMultiSelectMenu';
import { DialogType } from './types';

const mockClients = [
  {
    id: 1,
    name: 'Assyx',
    lastName: 'Mrkva',
    jobTitle: 'Asistent',
    email: 'jozef@flowato.com',
    phone: '+421 940 566 854',
  },
  {
    id: 2,
    name: 'Netflix',
    lastName: 'Bleda',
    jobTitle: 'Asistentka asistenta',
    email: 'jana@flowato.com',
    phone: '+421 910 655 458',
  },
  {
    id: 3,
    name: 'Albi',
    lastName: 'Hviezdoslav',
    jobTitle: 'Exorcista',
    email: 'pavol@flowato.com',
    phone: '+421 940 254 698',
  },
  {
    id: 1,
    name: 'Assyx',
    lastName: 'Mrkva',
    jobTitle: 'Asistent',
    email: 'jozef@flowato.com',
    phone: '+421 940 566 854',
  },
  {
    id: 2,
    name: 'Netflix',
    lastName: 'Bleda',
    jobTitle: 'Asistentka asistenta',
    email: 'jana@flowato.com',
    phone: '+421 910 655 458',
  },
  {
    id: 3,
    name: 'Albi',
    lastName: 'Hviezdoslav',
    jobTitle: 'Exorcista',
    email: 'pavol@flowato.com',
    phone: '+421 940 254 698',
  },
  {
    id: 1,
    name: 'Assyx',
    lastName: 'Mrkva',
    jobTitle: 'Asistent',
    email: 'jozef@flowato.com',
    phone: '+421 940 566 854',
  },
  {
    id: 2,
    name: 'Netflix',
    lastName: 'Bleda',
    jobTitle: 'Asistentka asistenta',
    email: 'jana@flowato.com',
    phone: '+421 910 655 458',
  },
  {
    id: 3,
    name: 'Albi',
    lastName: 'Hviezdoslav',
    jobTitle: 'Exorcista',
    email: 'pavol@flowato.com',
    phone: '+421 940 254 698',
  },
];

type Props = {
  openDialog: (type: DialogType) => void;
};

const ClientsList: React.FC<Props> = ({ openDialog }) => {
  const clients: Array<any> = mockClients;
  const selectedContactIds: Array<number> = [];
  const searchText = '';
  const user: any = { starred: [] };

  const columns = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'name',
        className: 'font-bold',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        className: 'font-bold',
      },
      {
        Header: 'Job Title',
        accessor: 'jobTitle',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
    ],
    [],
  );

  if (clients?.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no clients!
        </Typography>
      </div>
    );
  }

  return (
    <DataTable
      title="Clients"
      columns={columns}
      data={mockClients}
      count={mockClients.length}
      pageIndex={0}
      loadPage={() => console.log('loadPage')}
      pageSize={10}
      setPageSize={() => console.log('set')}
      orderBy={null}
      setOrderBy={() => console.log('set')}
      orderDirection="ASC"
      setOrderDirection={() => console.log('set')}
      onRowClick={() => console.log('detail')}
      loading={false}
      onCreate={() => openDialog('new')}
    />
  );
};

export default ClientsList;
