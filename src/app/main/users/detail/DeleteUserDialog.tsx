import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { Backdrop } from 'common/components/backdrop';
import { AppContext } from 'app/AppContext';
import { DELETE_USER } from './mutations/deleteUser';
import DeleteDialog from 'app/components/DeleteDialog';
import {
  // eslint-disable-next-line no-unused-vars
  DeleteUser as ResponseType,
  // eslint-disable-next-line no-unused-vars
  DeleteUserVariables as InputType,
} from './mutations/__generated__/DeleteUser';

type Props = {
  data: any;
};

const DeleteUserDialog: React.FC<Props> = ({ data }) => {
  const { setActionFeedback } = useContext(AppContext);
  const [deleteUser, { data: mutationResponse, loading, error }] = useMutation<
    ResponseType,
    InputType
  >(DELETE_USER);

  const handleDelete = async () => {
    deleteUser({
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
    if (mutationResponse.deleteUser) {
      dispatchSuccessFeedback();
      return <Redirect to="/users" />;
    }
    dispatchErrorFeedback();
  }

  if (error) {
    dispatchErrorFeedback();
  }

  return <DeleteDialog title="Delete user" onDelete={handleDelete} critical />;
};

export default DeleteUserDialog;

export const DeleteUserDialogFragment = {
  data: gql`
    fragment DeleteUserDialogFragment__data on User {
      id
    }
  `,
};
