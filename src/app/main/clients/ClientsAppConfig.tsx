import React from 'react';
import { Redirect } from 'react-router-dom';

export const ClientsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/clients/:id',
      component: React.lazy(() => import('./ClientsApp')),
    },
    {
      path: '/clients',
      component: () => <Redirect to="/clients/all" />,
    },
  ],
};
