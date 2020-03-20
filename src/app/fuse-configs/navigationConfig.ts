const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'example-component',
        title: 'Example',
        type: 'item',
        icon: 'whatshot',
        url: '/example',
      },
      {
        id: 'tasks-app',
        title: 'Tasks',
        type: 'collapse',
        icon: 'check_box',
        badge: {
          title: 3,
          bg: 'rgb(255, 111, 0)',
          fg: '#FFFFFF',
        },
        children: [
          {
            id: 'task-list',
            title: 'List',
            type: 'item',
            url: '/tasks/list',
          },
          {
            id: 'task-bords',
            title: 'Boards',
            type: 'item',
            url: '/tasks/boards',
          },
        ],
      },
      {
        id: 'users-app',
        title: 'Users',
        type: 'item',
        icon: 'person',
        url: '/users',
      },
      {
        id: 'user-groups-app',
        title: 'User Groups',
        type: 'item',
        icon: 'people',
        url: '/user-groups',
      },
      {
        id: 'clients-app',
        title: 'Clients',
        type: 'item',
        icon: 'account_circle',
        url: '/clients',
      },
      {
        id: 'contacts-app',
        title: 'Contacts',
        type: 'item',
        icon: 'account_box',
        url: '/contacts',
      },
      {
        id: 'test',
        title: 'Test',
        type: 'item',
        icon: 'whatshot',
        url: '/test',
      },
    ],
  },
  {
    type: 'divider',
    id: 'divider-1',
  },
  {
    id: 'admin',
    title: 'Admin',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'permissions',
        title: 'Permissions',
        type: 'item',
        icon: 'supervisor_account',
        url: '/admin/permissions',
      },
    ],
  },
];

export default navigationConfig;
