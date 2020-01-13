import React from 'react';
import {
  Avatar,
  Checkbox,
  Icon,
  IconButton,
  Typography,
} from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import ReactTable from 'react-table';
import UsersMultiSelectMenu from './UsersMultiSelectMenu';

const mockContacts = [
  {
    id: 1,
    name: 'Jozef',
    lastName: 'Mrkva',
    jobTitle: 'Asistent',
    email: 'jozef@flowato.com',
    phone: '+421 940 566 854',
  },
  {
    id: 2,
    name: 'Jana',
    lastName: 'Bleda',
    jobTitle: 'Asistentka asistenta',
    email: 'jana@flowato.com',
    phone: '+421 910 655 458',
  },
  {
    id: 3,
    name: 'Pavol',
    lastName: 'Hviezdoslav',
    jobTitle: 'Exorcista',
    email: 'pavol@flowato.com',
    phone: '+421 940 254 698',
  },
];

const UsersList = (props: any) => {
  // eslint-disable-next-line prefer-destructuring
  const contacts: Array<any> = mockContacts;
  const selectedContactIds: Array<number> = [];
  const searchText = '';
  const user: any = {};

  if (contacts?.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no contacts!
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
                window.location.href = `/users/detail/${rowInfo.original.id}`;
              }
            },
          };
        }}
        data={contacts}
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
                  selectedContactIds.length === contacts?.length &&
                  selectedContactIds.length > 0
                }
                indeterminate={
                  selectedContactIds.length !== contacts?.length &&
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
              selectedContactIds.length > 0 && <UsersMultiSelectMenu />,
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
        ]}
        defaultPageSize={10}
        noDataText="No contacts found"
      />
    </FuseAnimate>
  );
};

export default UsersList;
