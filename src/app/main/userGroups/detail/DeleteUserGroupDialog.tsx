import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Backdrop } from 'common/components/backdrop';
import { AppContext } from 'app/AppContext';
import { DELETE_USER_GROUP } from './mutations/deleteUserGroup';
import DeleteDialog from 'app/components/DeleteDialog';
import {
  // eslint-disable-next-line no-unused-vars
  DeleteUserGroup as ResponseType,
  // eslint-disable-next-line no-unused-vars
  DeleteUserGroupVariables as InputType,
} from './mutations/__generated__/DeleteUserGroup';
// eslint-disable-next-line no-unused-vars
import { DeleteUserGroupDialogFragment__data as DataType } from './__generated__/DeleteUserGroupDialogFragment__data';

type Props = {
  data: DataType;
};

const DeleteUserGroupDialog: React.FC<Props> = ({ data }) => {
  const history = useHistory();
  const { setActionFeedback } = useContext(AppContext);
  const [deleteUserGroup, { loading }] = useMutation<ResponseType, InputType>(
    DELETE_USER_GROUP,
  );

  async function handleDelete() {
    const { data: response } = await deleteUserGroup({
      variables: { id: Number(data.id) }, // todo: remove type cast
    });
    if (response?.deleteUserGroup) {
      dispatchSuccessFeedback();
      history.push('/user-groups');
    } else {
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
      message: 'Record was succesfully delted',
      severity: 'success',
    });
  }

  if (loading) {
    return <Backdrop open={true} />;
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
