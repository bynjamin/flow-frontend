import React from 'react';
import { Redirect } from 'react-router-dom';
import { ExampleConfig } from 'app/main/example/ExampleConfig';
import { LoginConfig } from 'app/main/login/LoginConfig';
import { FuseUtils } from '@fuse';

const routeConfigs = [ExampleConfig, LoginConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/login" />,
  },
];

export default routes;
