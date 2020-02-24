import React, { useEffect, useRef, useState } from 'react';
import { Fab, Icon } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import ClientsList from './ClientsList';
import ClientsHeader from './ClientsHeader';
import ClientsSidebarContent from './ClientsSidebarContent';
import ClientDialog from './ClientDialog';
import { makeStyles } from '@material-ui/styles';
import { DialogType } from './types';

const useStyles = makeStyles({
  addButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    zIndex: 99,
  },
});

const ClientsApp: React.FC<any> = props => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<DialogType>('new');

  const classes = useStyles(props);
  const pageLayout = useRef(null);

  const openDialog = (type: DialogType) => {
    setDialogType(type);
    setIsDialogOpen(true);
  };

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
        header={<ClientsHeader pageLayout={pageLayout} />}
        content={<ClientsList openDialog={openDialog} />}
        leftSidebarContent={<ClientsSidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <FuseAnimate animation="transition.expandIn" delay={300}>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.addButton}
          onClick={() => openDialog('new')}
        >
          <Icon>person_add</Icon>
        </Fab>
      </FuseAnimate>
      <ClientDialog
        isOpen={isDialogOpen}
        type={dialogType}
        close={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default ClientsApp;
