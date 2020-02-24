import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import { AboutConfig } from './about/AboutConfig';
import { RegisterConfig } from './register/RegisterConfig';
import { PricingConfig } from './pricing/PricingConfig';
import { ComingSoonConfig } from './coming-soon/ComingSoonConfig';

const routeConfigs = [
  AboutConfig,
  RegisterConfig,
  PricingConfig,
  ComingSoonConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/about" />,
  },
];

export default routes;
