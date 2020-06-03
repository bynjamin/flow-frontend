import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Backdrop } from 'common/components/backdrop';
import { AppContext } from 'app/AppContext';
import { DELETE_PROJECT } from './mutations/deleteProject';
import DeleteDialog from 'app/components/DeleteDialog';
import { getListUrl } from 'app/helpers/linkResolver';
import { DeleteProjectDialogFragment__data as DataType } from './__generated__/DeleteProjectDialogFragment__data';
import {
  DeleteProject as ResponseType,
  DeleteProjectVariables as InputType,
} from './mutations/__generated__/DeleteProject';

type Props = {
  data: DataType;
};

const DeleteProjectDialog: React.FC<Props> = ({ data }) => {
  const history = useHistory();
  const { setActionFeedback } = useContext(AppContext);
  const [deleteProject, { loading }] = useMutation<ResponseType, InputType>(
    DELETE_PROJECT,
  );

  async function handleDelete() {
    try {
      const { data: response } = await deleteProject({
        variables: { id: Number(data.id) },
      });
      if (response?.deleteProject) {
        dispatchSuccessFeedback();
        history.push(getListUrl('projects'));
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

  return (
    <DeleteDialog title="Delete Project" onDelete={handleDelete} critical />
  );
};

export default DeleteProjectDialog;

export const DeleteProjectDialogFragment = {
  data: gql`
    fragment DeleteProjectDialogFragment__data on Project {
      id
    }
  `,
};
