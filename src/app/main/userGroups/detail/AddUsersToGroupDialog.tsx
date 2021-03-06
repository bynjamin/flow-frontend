import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { AppContext } from 'app/AppContext';
import UsersAutocomplete from 'app/components/UsersAutocomplete';
import { ADD_USERS_TO_GROUP } from './mutations/addUsersToGroup';
import { AddUsersToGroupDialogFragment__data as DataType } from './__generated__/AddUsersToGroupDialogFragment__data';
import {
  AddUsersToUserGroup as ResponseType,
  AddUsersToUserGroupVariables as InputType,
} from './mutations/__generated__/AddUsersToUserGroup';

type Props = {
  data: DataType;
  open: boolean;
  onClose: () => void;
};

const AddUsersToGroupDialog: React.FC<Props> = ({ data, open, onClose }) => {
  const { setLoading, setActionFeedback } = useContext(AppContext);
  const [newMembersIds, setNewMembersIds] = useState<number[]>([]);
  const [addMembersToGroup] = useMutation<ResponseType, InputType>(
    ADD_USERS_TO_GROUP,
  );

  const dispatchErrorFeedback = () => {
    setActionFeedback({
      message: 'Unable to add members',
      severity: 'error',
    });
  };

  const dispatchSuccessFeedback = () => {
    setActionFeedback({
      message: 'Members was successfully added to group',
      severity: 'success',
    });
  };

  const handleSubmit = async () => {
    console.log(newMembersIds);
    try {
      onClose();
      setLoading(true);
      const { data: response } = await addMembersToGroup({
        variables: { groupId: data.id, userIds: newMembersIds },
      });
      if (response?.addUsersToUserGroup) {
        dispatchSuccessFeedback();
      } else {
        dispatchErrorFeedback();
      }
    } catch {
      dispatchErrorFeedback();
    } finally {
      setLoading(false);
    }
  };

  if (!data) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="add-members-dialog-title"
    >
      <DialogTitle id="add-members-dialog-title">Add members</DialogTitle>
      <DialogContent className="min-w-400">
        <DialogContentText>Search users by their email</DialogContentText>
        <UsersAutocomplete setSelected={setNewMembersIds} multiple />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          color="secondary"
          disabled={newMembersIds.length < 1}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUsersToGroupDialog;

export const AddUsersToGroupDialogFragment = {
  data: gql`
    fragment AddUsersToGroupDialogFragment__data on UserGroup {
      id
    }
  `,
};
