import React from 'react';
import gql from 'graphql-tag';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import UserPermissionCard from './UserPermissionCard';
import { UserPermissionCardFragment } from './UserPermissionCardFragment';
import {
  // eslint-disable-next-line no-unused-vars
  UserPermissionsFragment__data as DataType,
  // eslint-disable-next-line no-unused-vars
  UserPermissionsFragment__data_permissions as ModuleType,
} from './__generated__/UserPermissionsFragment__data';

type Props = {
  data: DataType;
};

const UserPermissions: React.FC<Props> = ({ data }) => {
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
            <UserPermissionCard
              key={module.model}
              data={module}
              userId={Number(id)} // todo: odsatranit castovanie
            />
          ))}
        </FuseAnimateGroup>
      </div>
    </div>
  );
};

export default UserPermissions;

export const UserPermissionsFragment = {
  data: gql`
    fragment UserPermissionsFragment__data on User {
      id
      permissions {
        ...UserPermissionCardFragment__data
      }
    }
    ${UserPermissionCardFragment.data}
  `,
};
