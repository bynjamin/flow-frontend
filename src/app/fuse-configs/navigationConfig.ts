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
        type: 'item',
        icon: 'check_box',
        url: '/tasks',
        badge: {
          title: 3,
          bg: 'rgb(255, 111, 0)',
          fg: '#FFFFFF',
        },
      },
      {
        id: 'users-app',
        title: 'Users',
        type: 'item',
        icon: 'person',
        url: '/users',
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
    ],
  },
];

export default navigationConfig;
