import React from 'react';

const RolesListConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/roles',
      component: React.lazy(() => import('./list/RolesListContainer')),
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

export default [RoleDetailConfig, RolesListConfig]; // This order is important!
