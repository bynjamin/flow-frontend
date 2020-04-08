import React from 'react';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import PermissionCard from './PermissionCard';

type Props = {
  permissions: any;
};

const PermissionsContent: React.FC<Props> = ({ permissions }) => (
  <FuseAnimateGroup
    enter={{
      animation: 'transition.slideUpBigIn',
    }}
    className="flex flex-wrap"
  >
    {permissions.map(({ model, actions }: any) => (
      <PermissionCard key={model} modelName={model} permissions={actions} />
    ))}
  </FuseAnimateGroup>
);

export default PermissionsContent;
