import React from 'react';

export const AttendanceConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/attendance',
      component: React.lazy(() => import('./list/AttendanceListContainer')),
    },
  ],
};
