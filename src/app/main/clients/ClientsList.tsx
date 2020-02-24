import React from 'react';
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
];

type Props = {
  openDialog: (type: DialogType) => void;
};

const ClientsList: React.FC<Props> = ({ openDialog }) => {
  // eslint-disable-next-line prefer-destructuring
  const clients: Array<any> = mockClients;
  const selectedContactIds: Array<number> = [];
  const searchText = '';
  const user: any = { starred: [] };

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
    <FuseAnimate animation="transition.slideUpIn" delay={300}>
      <ReactTable
        className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
        getTrProps={(state: any, rowInfo: any, column: any) => {
          return {
            className: 'cursor-pointer',
            onClick: (e: any, handleOriginal: any) => {
              if (rowInfo) {
                openDialog('edit'); // (rowInfo.original.id))
              }
            },
          };
        }}
        getTheadProps={(state: any, rowInfo: any, column: any) => {
          return {
            className: 'table-header-fix',
          };
        }}
        data={clients}
        columns={[
          {
            Header: () => (
              <Checkbox
                onClick={event => {
                  event.stopPropagation();
                }}
                onChange={event => {
                  event.target.checked
                    ? console.log('Select all users')
                    : console.log('Deselect all users');
                }}
                checked={
                  selectedContactIds.length === clients?.length &&
                  selectedContactIds.length > 0
                }
                indeterminate={
                  selectedContactIds.length !== clients?.length &&
                  selectedContactIds.length > 0
                }
              />
            ),
            accessor: '',
            Cell: (row: any) => {
              return (
                <Checkbox
                  onClick={(event: any) => {
                    event.stopPropagation();
                  }}
                  checked={selectedContactIds.includes(row.value.id)}
                  onChange={
                    () => console.log('Select user') // dispatch(Actions.toggleInSelectedContacts(row.value.id))
                  }
                />
              );
            },
            className: 'justify-center',
            sortable: false,
            width: 64,
          },
          {
            Header: () =>
              selectedContactIds.length > 0 && <ClientsMultiSelectMenu />,
            accessor: 'avatar',
            Cell: (row: any) => (
              <Avatar
                className="mr-8"
                alt={row.original.name}
                src={row.value}
              />
            ),
            className: 'justify-center',
            width: 64,
            sortable: false,
          },
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
          {
            Header: '',
            width: 128,
            Cell: (row: any) => (
              <div className="flex items-center">
                <IconButton
                  onClick={(ev: any) => {
                    ev.stopPropagation();
                    console.log('star');
                  }}
                >
                  {user.starred && user.starred.includes(row.original.id) ? (
                    <Icon>star</Icon>
                  ) : (
                    <Icon>star_border</Icon>
                  )}
                </IconButton>
                <IconButton
                  onClick={ev => {
                    ev.stopPropagation();
                    console.log('delete');
                  }}
                >
                  <Icon>delete</Icon>
                </IconButton>
              </div>
            ),
          },
        ]}
        defaultPageSize={10}
        noDataText="No clients found"
      />
    </FuseAnimate>
  );
};

export default ClientsList;
