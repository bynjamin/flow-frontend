import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Backdrop } from 'common/components/backdrop';
import { AppContext } from 'app/AppContext';
import { DELETE_USERS } from './mutations/deleteUsers';
import DeleteDialog from 'app/components/DeleteDialog';
import {
  // eslint-disable-next-line no-unused-vars
  DeleteUsers as ResponseType,
  // eslint-disable-next-line no-unused-vars
  DeleteUsersVariables as InputType,
} from './mutations/__generated__/DeleteUsers';

type Props = {
  deleteIds: number[];
  onComplete: () => void;
};

const DeleteUsersDialog: React.FC<Props> = ({ deleteIds, onComplete }) => {
  const { setActionFeedback } = useContext(AppContext);
  const [deleteUsers, { loading }] = useMutation<ResponseType, InputType>(
    DELETE_USERS,
  );

  async function handleDelete() {
    try {
      const { data: response } = await deleteUsers({
        variables: { ids: deleteIds },
        refetchQueries: ['UserList'],
      });
      if (response?.deleteUsers) {
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
      message: 'Unable to delete records',
      severity: 'error',
    });
  }

  function dispatchSuccessFeedback() {
    setActionFeedback({
      message: 'Records was succesfully deleted',
      severity: 'success',
    });
  }

  if (loading) {
    return <Backdrop open={true} />;
  }

  return (
    <DeleteDialog
      title="Delete users"
      onDelete={handleDelete}
      critical
      multiple
      withoutController
    />
  );
};

export default DeleteUsersDialog;
