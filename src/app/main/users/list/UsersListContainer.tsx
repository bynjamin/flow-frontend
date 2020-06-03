import React, { useRef } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import UsersList from './UsersList';
// import UsersHeader from './UsersHeader';

const UsersListContainer: React.FC = () => {
  const pageLayout = useRef(null); // todo: Why? (In all modules)

  return (
    <FusePageSimple
      classes={{
        contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
        content: 'flex flex-col h-full',
        leftSidebar: 'w-256 border-0',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      // header={<UsersHeader pageLayout={pageLayout} />}
      content={<UsersList />}
      // leftSidebarContent={<ContactsSidebarContent />}
      sidebarInner
      ref={pageLayout}
      innerScroll
    />
  );
};

export default UsersListContainer;
