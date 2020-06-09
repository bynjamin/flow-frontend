import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import UsersConfig from 'app/main/users/UsersConfig';
import UserGroupsConfig from 'app/main/userGroups/UserGroupsConfig';
import RolesConfig from 'app/main/roles/RolesConfig';
import ProjectsConfig from 'app/main/projects/ProjectsConfig';
import TasksConfig from 'app/main/tasks/TasksConfig';
import { WelcomeConfig } from 'app/main/welcome/WelcomeConfig';
import { LoginConfig } from 'app/main/login/LoginConfig';
import { TestConfig } from 'app/main/test/TestConfig';
import { AttendanceConfig } from 'app/main/attendance/AttendanceConfig';
import { PermissionsConfig } from 'app/main/admin/permissions/PermissionsAppConfig';

const routeConfigs = [
  WelcomeConfig,
  LoginConfig,
  TestConfig,
  PermissionsConfig,
  AttendanceConfig,
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
    component: () => <Redirect to="/welcome" />,
  },
];

export default routes;
