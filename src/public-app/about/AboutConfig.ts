import About from './About';

export const AboutConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: '/about',
      component: About,
    },
  ],
};

/**
 * Lazy load About
 */
/*
import React from 'react';

export const AboutConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/about',
            component: React.lazy(() => import('./About'))
        }
    ]
};
*/
