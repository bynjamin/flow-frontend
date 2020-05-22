import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import { ExampleConfig } from 'app/main/example/ExampleConfig';
import UsersConfig from 'app/main/users/UsersAppConfig';
import UserGroupsConfig from 'app/main/userGroups/UserGroupsConfig';
import RolesConfig from 'app/main/roles/RolesAppConfig';
import ProjectsConfig from 'app/main/projects/ProjectsConfig';
import { LoginConfig } from 'app/main/login/LoginConfig';
import { TestConfig } from 'app/main/test/TestConfig';
import { ContactsConfig } from 'app/main/contacts/ContactsAppConfig';
import { ClientsConfig } from 'app/main/clients/ClientsAppConfig';
import { TasksAppConfig } from 'app/main/tasks/TakskAppConfig';
import { PermissionsConfig } from 'app/main/admin/permissions/PermissionsAppConfig';

const routeConfigs = [
  ExampleConfig,
  LoginConfig,
  TestConfig,
  ContactsConfig,
  ClientsConfig,
  TasksAppConfig,
  PermissionsConfig,
  ...UsersConfig,
  ...UserGroupsConfig,
  ...RolesConfig,
  ...ProjectsConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/example" />,
  },
];

export default routes;
