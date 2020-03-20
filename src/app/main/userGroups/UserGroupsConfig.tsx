import React from 'react';
import { Redirect } from 'react-router-dom';

const UserGroupsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/user-groups/:id',
      component: React.lazy(() => import('./UserGroupsApp')),
    },
    {
      path: '/user-groups',
      component: () => <Redirect to="/user-groups/all" />,
    },
  ],
};

const UserGroupDetailConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/user-groups/detail/:id',
      component: React.lazy(() => import('./detail/UserGroupDetail')),
    },
  ],
};

export default [UserGroupDetailConfig, UserGroupsConfig]; // This order is important!
