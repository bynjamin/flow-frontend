import React from 'react';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseLoading from '@fuse/core/FuseLoading';
import PermissionCard from './PermissionCard';

const mockData = [
  {
    id: 1,
    name: 'Projects',
  },
  {
    id: 2,
    name: 'Tasks',
  },
  {
    id: 3,
    name: 'Attendance',
  },
  {
    id: 4,
    name: 'Users',
  },
  {
    id: 5,
    name: 'Clients',
  },
  {
    id: 6,
    name: 'Contacts',
  },
  {
    id: 7,
    name: 'Calendar',
  },
  {
    id: 8,
    name: 'Calendar event',
  },
  {
    id: 9,
    name: 'Something',
  },
  {
    id: 10,
    name: 'Something 2',
  },
];

const PermissionsContent: React.FC = () => (
  <FuseAnimateGroup
    enter={{
      animation: 'transition.slideUpBigIn',
    }}
    className="flex flex-wrap"
  >
    {mockData.map(({ id, name }) => (
      <PermissionCard key={id} modelName={name} />
    ))}
  </FuseAnimateGroup>
);

export default PermissionsContent;
