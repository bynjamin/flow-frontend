import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse';
import { AboutConfig } from './about/AboutConfig';
import { RegisterConfig } from './register/RegisterConfig';
import { PricingConfig } from './pricing/PricingConfig';
import { ComingSoonConfig } from './coming-soon/ComingSoonConfig';
import { TestConfig } from './test/TestConfig';

const routeConfigs = [
  AboutConfig,
  RegisterConfig,
  PricingConfig,
  ComingSoonConfig,
  TestConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/about" />,
  },
];

export default routes;
