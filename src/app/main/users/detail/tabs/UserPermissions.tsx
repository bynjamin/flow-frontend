import React from 'react';
import gql from 'graphql-tag';
import PermissionsContent from 'app/main/admin/permissions/PermissionsContent';
import { UserPermissionsFragment__data as DataType } from './__generated__/UserPermissionsFragment__data';

type Props = {
  data: DataType;
};

const UserPermissions: React.FC<Props> = ({ data }) => {
  return (
    <div className="md:flex">
      <div className="flex flex-col flex-1 md:pr-32">
        <PermissionsContent permissions={data.permissions} />
      </div>
    </div>
  );
};

export default UserPermissions;

export const UserPermissionsFragment = {
  data: gql`
    fragment UserPermissionsFragment__data on User {
      permissions {
        model
        actions {
          basic {
            create
            read
            update
            delete
          }
          global {
            read
            update
            delete
          }
        }
      }
    }
  `,
};
