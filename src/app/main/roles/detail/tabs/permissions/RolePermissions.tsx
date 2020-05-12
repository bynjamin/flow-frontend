import React from 'react';
import gql from 'graphql-tag';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import RolePermissionCard from './RolePermissionCard';
import { RolePermissionCardFragment } from './RolePermissionCardFragment';
import {
  // eslint-disable-next-line no-unused-vars
  RolePermissionsFragment__data as DataType,
  // eslint-disable-next-line no-unused-vars
  RolePermissionsFragment__data_permissions as ModuleType,
} from './__generated__/RolePermissionsFragment__data';

type Props = {
  data: DataType;
};

const RolePermissions: React.FC<Props> = ({ data }) => {
  const { permissions, id } = data;
  return (
    <div className="md:flex">
      <div className="flex flex-col flex-1 md:pr-32">
        <FuseAnimateGroup
          enter={{
            animation: 'transition.slideUpBigIn',
          }}
          className="flex flex-wrap"
        >
          {permissions.map((module: ModuleType) => (
            <RolePermissionCard key={module.model} data={module} roleId={id} />
          ))}
        </FuseAnimateGroup>
      </div>
    </div>
  );
};

export default RolePermissions;

export const RolePermissionsFragment = {
  data: gql`
    fragment RolePermissionsFragment__data on UserRole {
      id
      permissions {
        ...RolePermissionCardFragment__data
      }
    }
    ${RolePermissionCardFragment.data}
  `,
};
