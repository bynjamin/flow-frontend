import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Backdrop } from 'common/components/backdrop';
import { AppContext } from 'app/AppContext';
import { DELETE_USER_GROUPS } from '../list/mutations/deleteUserGroups';
import DeleteDialog from 'app/components/DeleteDialog';
import {
  // eslint-disable-next-line no-unused-vars
  DeleteUserGroups as ResponseType,
  // eslint-disable-next-line no-unused-vars
  DeleteUserGroupsVariables as InputType,
} from '../list/mutations/__generated__/DeleteUserGroups';
// eslint-disable-next-line no-unused-vars
import { DeleteUserGroupDialogFragment__data as DataType } from './__generated__/DeleteUserGroupDialogFragment__data';

type Props = {
  data: DataType;
};

const DeleteUserGroupDialog: React.FC<Props> = ({ data }) => {
  const history = useHistory();
  const { setActionFeedback } = useContext(AppContext);
  const [deleteUserGroup, { loading }] = useMutation<ResponseType, InputType>(
    DELETE_USER_GROUPS,
  );

  async function handleDelete() {
    try {
      const { data: response } = await deleteUserGroup({
        variables: { ids: [data.id] },
      });
      if (response?.deleteUserGroups) {
        dispatchSuccessFeedback();
        history.push('/user-groups');
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
