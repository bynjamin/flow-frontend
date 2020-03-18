import React from 'react';

export const PermissionsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/admin/permissions',
      component: React.lazy(() => import('./PermissionsApp')),
    },
  ],
};
