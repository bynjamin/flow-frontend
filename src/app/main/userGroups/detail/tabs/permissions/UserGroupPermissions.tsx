import React from 'react';
import gql from 'graphql-tag';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import UserGroupPermissionCard from './UserGroupPermissionCard';
import { UserGroupPermissionCardFragment } from './UserGroupPermissionCardFragment';
import {
  // eslint-disable-next-line no-unused-vars
  UserGroupPermissionsFragment__data as DataType,
  // eslint-disable-next-line no-unused-vars
  UserGroupPermissionsFragment__data_permissions as ModuleType,
} from './__generated__/UserGroupPermissionsFragment__data';

const unavailablePermissions = ['UserGroup', 'Permission'];

type Props = {
  data: DataType;
};

const UserGroupPermissions: React.FC<Props> = ({ data }) => {
  const { permissions, id } = data;

  const availablePermissions = permissions.filter((module: ModuleType) => {
    return !unavailablePermissions.includes(module.model);
  });

  return (
    <div className="md:flex">
      <div className="flex flex-col flex-1 md:pr-32">
        <FuseAnimateGroup
          enter={{
            animation: 'transition.slideUpBigIn',
          }}
          className="flex flex-wrap"
        >
          {availablePermissions.map((module: ModuleType) => (
            <UserGroupPermissionCard
              key={module.model}
              data={module}
              groupId={id}
            />
          ))}
        </FuseAnimateGroup>
      </div>
    </div>
  );
};

export default UserGroupPermissions;

export const UserGroupPermissionsFragment = {
  data: gql`
    fragment UserGroupPermissionsFragment__data on UserGroup {
      id
      permissions {
        ...UserGroupPermissionCardFragment__data
      }
    }
    ${UserGroupPermissionCardFragment.data}
  `,
};
