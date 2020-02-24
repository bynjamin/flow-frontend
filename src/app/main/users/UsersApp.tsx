import React, { useEffect, useRef } from 'react';
import { Fab, Icon } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import UsersList from './UsersList';
import UsersHeader from './UsersHeader';
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

function UsersApp(props: any) {
  const dispatch = useDispatch();

  const classes = useStyles(props);
  const pageLayout = useRef(null);
  /*
  useEffect(() => {
    dispatch(Actions.getContacts(props.match.params));
    dispatch(Actions.getUserData());
  }, [dispatch, props.match.params]);

  useEffect(() => {
    dispatch(Actions.getContacts(props.match.params));
  }, [dispatch, props.match.params]);
  */
  return (
    <>
      <FusePageSimple
        classes={{
          contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
          content: 'flex flex-col h-full',
          leftSidebar: 'w-256 border-0',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={<UsersHeader pageLayout={pageLayout} />}
        content={<UsersList />}
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
}

export default UsersApp;
