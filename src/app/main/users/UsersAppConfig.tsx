import React from 'react';
import { Redirect } from 'react-router-dom';

const UsersConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/users/:id',
      component: React.lazy(() => import('./UsersApp')),
    },
    {
      path: '/users',
      component: () => <Redirect to="/users/all" />,
    },
  ],
};

const UserDetailConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/users/detail/:id',
      component: React.lazy(() => import('./detail/UserDetail')),
    },
  ],
};

export default [UserDetailConfig, UsersConfig];
