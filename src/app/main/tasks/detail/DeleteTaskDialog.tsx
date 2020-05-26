import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Backdrop } from 'common/components/backdrop';
import { AppContext } from 'app/AppContext';
import { DELETE_TASK } from './mutations/deleteTask';
import DeleteDialog from 'app/components/DeleteDialog';
import { getListUrl } from 'app/helpers/linkResolver';
import {
  DeleteTask as ResponseType,
  DeleteTaskVariables as InputType,
} from './mutations/__generated__/DeleteTask';

type Props = {
  data: any;
};

const DeleteTaskDialog: React.FC<Props> = ({ data }) => {
  const history = useHistory();
  const { setActionFeedback } = useContext(AppContext);
  const [deleteTask, { loading }] = useMutation<ResponseType, InputType>(
    DELETE_TASK,
  );

  async function handleDelete() {
    try {
      const { data: response } = await deleteTask({
        variables: { id: data.id },
      });
      if (response?.deleteTask) {
        dispatchSuccessFeedback();
        history.push(getListUrl('tasks'));
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

  return <DeleteDialog title="Delete Task" onDelete={handleDelete} critical />;
};

export default DeleteTaskDialog;

export const DeleteTaskDialogFragment = {
  data: gql`
    fragment DeleteTaskDialogFragment__data on Task {
      id
    }
  `,
};
