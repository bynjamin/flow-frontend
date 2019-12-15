import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse';
import { ExampleConfig } from 'app/main/example/ExampleConfig';
import { LoginConfig } from 'app/main/login/LoginConfig';
import { TestConfig } from 'app/main/test/TestConfig';

const routeConfigs = [ExampleConfig, LoginConfig, TestConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/login" />,
  },
];

export default routes;
