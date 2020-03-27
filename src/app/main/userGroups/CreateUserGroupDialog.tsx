import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Backdrop } from 'common/components/backdrop';
import { Alert, AlertTitle } from '@material-ui/lab';

import { CREATE_USER_GROUP } from './createUserGroupMutatuon';
import { USERGROUPS_LIST_QUERY } from './UserGroupsList';
import { UserGroupsListQuery } from './__generated__/UserGroupsListQuery';
import {
  CreateUserGroup as ResponseType,
  CreateUserGroupVariables as InputVariables,
} from './__generated__/CreateUserGroup';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddUserGroupDialog: React.FC<Props> = ({ open, onClose }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  const [createUserGroup, { data, loading, error }] = useMutation<
    ResponseType,
    InputVariables
  >(CREATE_USER_GROUP);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    // @ts-ignore
    const model = formRef.current.getModel();
    createUserGroup({
      variables: { ...model },
    });
    onClose();
  };

  const disableButton = () => setIsFormValid(false);
  const enableButton = () => setIsFormValid(true);

  if (loading) {
    return <Backdrop open={true} />;
  }

  if (data) {
    return <Redirect to={`/user-groups/detail/${data.CreateUserGroup.id}`} />;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create new user group</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" className="mb-12">
            <AlertTitle>Something went wrong</AlertTitle>
            {error.message}
          </Alert>
        )}
        <DialogContentText>
          Fill information about new group and click create
        </DialogContentText>
        <Formsy
          onValidSubmit={handleSubmit}
          onValid={enableButton}
          onInvalid={disableButton}
          className="flex flex-col justify-center w-full"
          ref={formRef}
        >
          <TextFieldFormsy
            autoFocus
            className="mb-16"
            type="text"
            name="name"
            label="Group name"
            variant="outlined"
            required
          />
          <TextFieldFormsy
            className="mb-16"
            type="text"
            name="description"
            label="Description"
            variant="outlined"
          />
        </Formsy>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          color="secondary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserGroupDialog;
