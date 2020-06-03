import React from 'react';
import { Redirect } from 'react-router-dom';

const TasksConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/tasks/:id',
      component: React.lazy(() => import('./list/TasksListContainer')),
    },
    {
      path: '/tasks',
      component: () => <Redirect to="/tasks/all" />,
    },
  ],
};

const TaskDetailConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/tasks/detail/:id',
      component: React.lazy(() => import('./detail/TaskDetail')),
    },
  ],
};

export default [TaskDetailConfig, TasksConfig]; // This order is important!
