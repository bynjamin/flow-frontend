import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Backdrop } from 'common/components/backdrop';
import { AppContext } from 'app/AppContext';
import { DELETE_USER_GROUPS } from './mutations/deleteUserGroups';
import DeleteDialog from 'app/components/DeleteDialog';
import {
  // eslint-disable-next-line no-unused-vars
  DeleteUserGroups as ResponseType,
  // eslint-disable-next-line no-unused-vars
  DeleteUserGroupsVariables as InputType,
} from './mutations/__generated__/DeleteUserGroups';

type Props = {
  deleteIds: number[];
  onComplete: () => void;
};

const DeleteUserGroupsDialog: React.FC<Props> = ({ deleteIds, onComplete }) => {
  const { setActionFeedback } = useContext(AppContext);
  const [deleteUserGroups, { loading }] = useMutation<ResponseType, InputType>(
    DELETE_USER_GROUPS,
  );

  async function handleDelete() {
    try {
      const { data: response } = await deleteUserGroups({
        variables: { ids: deleteIds },
        refetchQueries: ['UserGroupsList'],
      });
      if (response?.deleteUserGroups) {
        dispatchSuccessFeedback();
      } else {
        dispatchErrorFeedback();
      }
    } catch {
      dispatchErrorFeedback();
    } finally {
      onComplete();
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

  return (
    <DeleteDialog
      title="Delete user groups"
      onDelete={handleDelete}
      multiple
      withoutController
    />
  );
};

export default DeleteUserGroupsDialog;
