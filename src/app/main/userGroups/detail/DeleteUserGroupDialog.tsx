import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import CriticalButton from 'common/components/CriticalButton';
import { Backdrop } from 'common/components/backdrop';
import { AppContext } from 'app/AppContext';
import { DELETE_USER_GROUP } from './mutations/deleteUserGroup';
import DeleteDialog from 'app/components/DeleteDialog';
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
  const { setActionFeedback } = useContext(AppContext);
  const [
    deleteUserGroup,
    { data: mutationResponse, loading, error },
  ] = useMutation<ResponseType, InputVariables>(DELETE_USER_GROUP);

  const handleDelete = () => {
    deleteUserGroup({
      variables: { id: data.id },
    });
  };

  const dispatchErrorFeedback = () => {
    setActionFeedback({
      message: 'Unable to delete record',
      severity: 'error',
    });
  };

  const dispatchSuccessFeedback = () => {
    setActionFeedback({
      message: 'Record was succesfully delted',
      severity: 'success',
    });
  };

  if (loading) {
    return <Backdrop open={true} />;
  }

  if (mutationResponse) {
    if (mutationResponse.deleteUserGroup) {
      dispatchSuccessFeedback();
      return <Redirect to="/user-groups" />;
    }
    dispatchErrorFeedback();
  }

  if (error) {
    dispatchErrorFeedback();
  }

  return <DeleteDialog title="Delete user group" onDelete={handleDelete} />;
};

export default DeleteUserGroupDialog;

export const DeleteUserGroupDialogFragment = {
  data: gql`
    fragment DeleteUserGroupDialogFragment__data on UserGroup {
      id
    }
  `,
};
