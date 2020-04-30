import React from 'react';
import gql from 'graphql-tag';
import PermissionsContent from 'app/main/admin/permissions/PermissionsContent';
import { RolePermissionsFragment__data as DataType } from './__generated__/RolePermissionsFragment__data';

type Props = {
  data: DataType;
};

const RolePermissions: React.FC<Props> = ({ data }) => {
  return (
    <div className="md:flex">
      <div className="flex flex-col flex-1 md:pr-32">
        <PermissionsContent permissions={data.permissions} />
      </div>
    </div>
  );
};

export default RolePermissions;

export const RolePermissionsFragment = {
  data: gql`
    fragment RolePermissionsFragment__data on UserRole {
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
