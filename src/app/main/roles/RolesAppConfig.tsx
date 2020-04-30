import React from 'react';

const RolesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/roles',
      component: React.lazy(() => import('./RolesApp')),
    },
  ],
};

const RoleDetailConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/roles/detail/:id',
      component: React.lazy(() => import('./detail/RoleDetail')),
    },
  ],
};

export default [RoleDetailConfig, RolesConfig]; // This order is important!
