import Welcome from './Welcome';

export const WelcomeConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/welcome',
      component: Welcome,
    },
  ],
};
