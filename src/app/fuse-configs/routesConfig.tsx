import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import UsersConfig from 'app/main/users/UsersAppConfig';
import UserGroupsConfig from 'app/main/userGroups/UserGroupsConfig';
import RolesConfig from 'app/main/roles/RolesAppConfig';
import ProjectsConfig from 'app/main/projects/ProjectsConfig';
import TasksConfig from 'app/main/tasks/TasksConfig';
import { LoginConfig } from 'app/main/login/LoginConfig';
import { TestConfig } from 'app/main/test/TestConfig';
import { ContactsConfig } from 'app/main/contacts/ContactsAppConfig';
import { ClientsConfig } from 'app/main/clients/ClientsAppConfig';
// import { TasksAppConfig } from 'app/main/tasks-old/TakskAppConfig';
import { PermissionsConfig } from 'app/main/admin/permissions/PermissionsAppConfig';

const routeConfigs = [
  LoginConfig,
  TestConfig,
  ContactsConfig,
  ClientsConfig,
  PermissionsConfig,
  ...UsersConfig,
  ...UserGroupsConfig,
  ...RolesConfig,
  ...ProjectsConfig,
  ...TasksConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/projects" />,
  },
];

export default routes;
