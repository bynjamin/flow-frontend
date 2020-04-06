import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
// eslint-disable-next-line no-unused-vars
import { ThemeProvider } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CriticalButton from 'common/components/CriticalButton';
import { Backdrop } from 'common/components/backdrop';
import { DELETE_USER_GROUP } from './mutations/deleteUserGroup';
import {
  // eslint-disable-next-line no-unused-vars
  DeleteUserGroup as ResponseType,
  // eslint-disable-next-line no-unused-vars
  DeleteUserGroupVariables as InputVariables,
} from './mutations/__generated__/DeleteUserGroup';

type Props = {
  data: any;
};

const DeleteUserGroupDialog: React.FC<Props> = ({ data }) => {
  // todo: odstranit redux
  // @ts-ignore
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [
    deleteUserGroup,
    { data: mutationResponse, loading, error },
  ] = useMutation<ResponseType, InputVariables>(DELETE_USER_GROUP);

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  const handleDelete = () => {
    deleteUserGroup({
      variables: { id: data.id },
    });
  };

  if (loading) {
    return <Backdrop open={true} />;
  }

  // todo: handle false alebo error
  if (mutationResponse) {
    if (mutationResponse.deleteUserGroup) {
      return <Redirect to="/user-groups" />;
    }
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <CriticalButton
        className="mr-8 normal-case"
        variant="contained"
        color="primary"
        aria-label="Follow"
        startIcon={<DeleteIcon />}
        onClick={toggleOpen}
      >
        Delete
      </CriticalButton>
      <Dialog
        open={isOpen}
        onClose={toggleOpen}
        aria-labelledby="user-group-delete-dialog-title"
      >
        <DialogTitle id="user-group-delete-dialog-title">
          Delete user group
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            Are you sure you want to permamently delete this item?
            <br />
            After this action, it will not be possible to restore it.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button
            className="mr-8 normal-case"
            variant="contained"
            aria-label="Follow"
            onClick={toggleOpen}
            disableElevation
          >
            Cancel
          </Button>
          <CriticalButton
            className="mr-8 normal-case"
            variant="contained"
            aria-label="Follow"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disableElevation
          >
            Delete
          </CriticalButton>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default DeleteUserGroupDialog;

export const DeleteUserGroupDialogFragment = {
  data: gql`
    fragment DeleteUserGroupDialogFragment on UserGroup {
      id
    }
  `,
};
