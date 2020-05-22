import React from 'react';
import { Redirect } from 'react-router-dom';

const ProjectsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/projects/:id',
      component: React.lazy(() => import('./ProjectsApp')),
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

export default [ProjectDetailConfig, ProjectsConfig]; // This order is important!
