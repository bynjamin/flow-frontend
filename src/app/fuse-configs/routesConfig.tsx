import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse';
import { ExampleConfig } from 'app/main/example/ExampleConfig';
import UsersConfig from 'app/main/users/UsersAppConfig';
import { LoginConfig } from 'app/main/login/LoginConfig';
import { TestConfig } from 'app/main/test/TestConfig';
import { ContactsConfig } from 'app/main/contacts/ContactsAppConfig';

const routeConfigs = [
  ExampleConfig,
  LoginConfig,
  TestConfig,
  ContactsConfig,
  ...UsersConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/login" />,
  },
];

export default routes;
