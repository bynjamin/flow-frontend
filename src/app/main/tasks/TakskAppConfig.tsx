import React from 'react';
import { Redirect } from 'react-router-dom';

export const TasksAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/tasks/list/:id',
      component: React.lazy(() => import('./list/TasksApp')),
    },
    {
      path: '/tasks/boards/:boardId',
      component: React.lazy(() => import('./scrumboards/board')),
    },
    {
      path: '/tasks/boards',
      component: React.lazy(() => import('./scrumboards/boards')),
    },
    {
      path: ['/tasks', '/tasks/list'],
      component: () => <Redirect to="/tasks/list/all" />,
    },
  ],
};
