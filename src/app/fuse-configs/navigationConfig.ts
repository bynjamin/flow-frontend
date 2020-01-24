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
