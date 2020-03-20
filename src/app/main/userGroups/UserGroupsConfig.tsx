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
/*
const UserDetailConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/user-groups/detail/:id',
      component: React.lazy(() => import('./detail/UserDetail')),
    },
  ],
};
*/
export default [UserGroupsConfig];
