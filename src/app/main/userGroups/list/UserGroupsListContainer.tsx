import React, { useRef } from 'react';
import { Fab, Icon } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import UserGroupsList from './UserGroupsList';
// import UsersHeader from './UsersHeader';
// import ContactsSidebarContent from './ContactsSidebarContent';
// import ContactDialog from './ContactDialog';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  addButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    zIndex: 99,
  },
});

const UserGroupsListContainer: React.FC = () => {
  const classes = useStyles();
  const pageLayout = useRef(null);

  return (
    <>
      <FusePageSimple
        classes={{
          contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
          content: 'flex flex-col h-full',
          leftSidebar: 'w-256 border-0',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        // header={<UsersHeader pageLayout={pageLayout} />}
        content={<UserGroupsList />}
        // leftSidebarContent={<ContactsSidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <FuseAnimate animation="transition.expandIn" delay={300}>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.addButton}
          // onClick={ev => dispatch(Actions.openNewContactDialog())}
        >
          <Icon>person_add</Icon>
        </Fab>
      </FuseAnimate>
      {/* <ContactDialog /> */}
    </>
  );
};

export default UserGroupsListContainer;
