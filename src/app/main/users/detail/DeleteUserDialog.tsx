import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Backdrop } from 'common/components/backdrop';
import { AppContext } from 'app/AppContext';
import { DELETE_USERS } from '../list/mutations/deleteUsers';
import DeleteDialog from 'app/components/DeleteDialog';
import {
  // eslint-disable-next-line no-unused-vars
  DeleteUsers as ResponseType,
  // eslint-disable-next-line no-unused-vars
  DeleteUsersVariables as InputType,
} from '../list/mutations/__generated__/DeleteUsers';

type Props = {
  data: any;
};

const DeleteUserDialog: React.FC<Props> = ({ data }) => {
  const history = useHistory();
  const { setActionFeedback } = useContext(AppContext);
  const [deleteUsers, { loading }] = useMutation<ResponseType, InputType>(
    DELETE_USERS,
  );

  async function handleDelete() {
    try {
      const { data: response } = await deleteUsers({
        variables: { ids: [data.id] },
      });
      if (response?.deleteUsers) {
        dispatchSuccessFeedback();
        history.push('/users');
      } else {
        dispatchErrorFeedback();
      }
    } catch {
      dispatchErrorFeedback();
    }
  }

  function dispatchErrorFeedback() {
    setActionFeedback({
      message: 'Unable to delete record',
      severity: 'error',
    });
  }

  function dispatchSuccessFeedback() {
    setActionFeedback({
      message: 'Record was succesfully deleted',
      severity: 'success',
    });
  }

  if (loading) {
    return <Backdrop open={true} />;
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
