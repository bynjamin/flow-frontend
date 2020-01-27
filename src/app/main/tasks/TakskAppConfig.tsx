import React from 'react';
import { Redirect } from 'react-router-dom';

export const TasksAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/tasks/:id',
      component: React.lazy(() => import('./TasksApp')),
    },
    {
      path: '/tasks',
      component: () => <Redirect to="/tasks/all" />,
    },
  ],
};
