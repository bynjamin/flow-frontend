import React, { useRef, useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '@fuse/core/formsy';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import { UsersAutocompleteFormsy } from 'app/components/formsy';
import { AppContext } from 'app/AppContext';

import {
  UpdateUserGroupDialogFragment__data as DataType,
  UpdateUserGroupDialogFragment__data_members as MemberType,
} from './__generated__/UpdateUserGroupDialogFragment__data';

import { UPDATE_USER_GROUP } from './mutations/updateUserGroup';
import {
  UpdateUserGroup as ResponseType,
  UpdateUserGroupVariables as InputVariables,
} from './mutations/__generated__/UpdateUserGroup';

type Props = {
  data: DataType;
};

const UpdateUserGroupDialog: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef<any>(null);
  const { setActionFeedback, setLoading } = useContext(AppContext);

  // @ts-ignore
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme); // todo: Odstranit redux

  const [updateUserGroup] = useMutation<ResponseType, InputVariables>(
    UPDATE_USER_GROUP,
  );

  const resetForm = () => formRef.current.reset();
  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const dispatchErrorFeedback = () => {
    setActionFeedback({
      message: 'Unable to update User Group',
      severity: 'error',
    });
  };

  const dispatchSuccessFeedback = () => {
    setActionFeedback({
      message: 'User Group was successfully updated',
      severity: 'success',
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data: response } = await updateUserGroup({
        variables: {
          ...formRef.current.getModel(),
          groupId: data?.id,
        },
      });
      if (response?.updateUserGroup) {
        dispatchSuccessFeedback();
        handleClose();
      } else {
        dispatchErrorFeedback();
      }
    } catch (e) {
      dispatchErrorFeedback();
    } finally {
      setLoading(false);
    }
  };

  const disableButton = () => setIsFormValid(false);
  const enableButton = () => setIsFormValid(true);

  return (
    <ThemeProvider theme={mainTheme}>
      <Button
        className="mr-8 normal-case"
        variant="contained"
        color="secondary"
        aria-label="Follow"
        startIcon={<EditIcon />}
        disableElevation
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update user group</DialogTitle>
        <DialogContent className="min-w-512">
          <DialogContentText>
            Update information about group and click update
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
              value={data.name}
              variant="outlined"
              required
            />
            <TextFieldFormsy
              className="mb-16"
              type="text"
              name="description"
              label="Description"
              value={data.description}
              variant="outlined"
              multiline
              rows={4}
            />
            <UsersAutocompleteFormsy
              name="memberIds"
              label="Members"
              value={data.members}
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default UpdateUserGroupDialog;

export const UpdateUserGroupDialogFragment = {
  data: gql`
    fragment UpdateUserGroupDialogFragment__data on UserGroup {
      id
      name
      description
      members {
        id
        email
      }
    }
  `,
};
