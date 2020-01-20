import React from 'react';
import { Redirect } from 'react-router-dom';

export const ContactsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/contacts/:id',
      component: React.lazy(() => import('./ContactsApp')),
    },
    {
      path: '/contacts',
      component: () => <Redirect to="/contacts/all" />,
    },
  ],
};
