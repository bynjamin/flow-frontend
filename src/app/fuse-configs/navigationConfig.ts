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
    ],
  },
];

export default navigationConfig;
