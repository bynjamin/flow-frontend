import React from 'react';
import { Redirect } from 'react-router-dom';

const UsersListConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/users/:id',
      component: React.lazy(() => import('./list/UsersListContainer')),
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

export default [UserDetailConfig, UsersListConfig]; // This order is important!
