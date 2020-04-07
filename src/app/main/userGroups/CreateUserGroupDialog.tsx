import React, { useRef, useState, useContext } from 'react';
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
import { AppContext } from 'app/AppContext';

import { CREATE_USER_GROUP } from './createUserGroupMutation';
import {
  // eslint-disable-next-line no-unused-vars
  CreateUserGroup as ResponseType,
  // eslint-disable-next-line no-unused-vars
  CreateUserGroupVariables as InputVariables,
} from './__generated__/CreateUserGroup';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddUserGroupDialog: React.FC<Props> = ({ open, onClose }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);
  const { setActionFeedback } = useContext(AppContext);

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
    setActionFeedback({
      message: `New user group ${data.createUserGroup.name} was created`,
      severity: 'success',
    });
    return <Redirect to={`/user-groups/detail/${data.createUserGroup.id}`} />;
  }

  if (error) {
    setActionFeedback({
      message: 'Something went wrong. User group was not created',
      severity: 'error',
    });
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create new user group</DialogTitle>
      <DialogContent>
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
