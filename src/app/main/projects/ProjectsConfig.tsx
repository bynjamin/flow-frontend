import React from 'react';
import { Redirect } from 'react-router-dom';

const ProjectsListConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/projects/:id',
      component: React.lazy(() => import('./list/ProjectsListContainer')),
    },
    {
      path: '/projects',
      component: () => <Redirect to="/projects/all" />,
    },
  ],
};

const ProjectDetailConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/projects/detail/:id',
      component: React.lazy(() => import('./detail/ProjectDetail')),
    },
  ],
};

export default [ProjectDetailConfig, ProjectsListConfig]; // This order is important!
