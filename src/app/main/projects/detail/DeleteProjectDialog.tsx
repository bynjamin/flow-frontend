import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import { ThemeProvider } from '@material-ui/core/styles';
import DeleteValidationInput from 'app/components/DeleteValidationInput';
import CriticalButton from 'common/components/CriticalButton';
import { AppContext } from 'app/AppContext';
import { DELETE_PROJECT } from './mutations/deleteProject';
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
  const [open, setOpen] = useState<boolean>(false);
  const [deleteTasks, setDeleteTasks] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const { setActionFeedback, setLoading } = useContext(AppContext);
  const [deleteProject] = useMutation<ResponseType, InputType>(DELETE_PROJECT);
  // @ts-ignore
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme); // todo: Odstranit redux

  const toggleOpen = () => setOpen(!open);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteTasks(event.target.checked);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const { data: response } = await deleteProject({
        variables: { id: Number(data.id), deleteTasks },
      });
      setLoading(false);
      if (response?.deleteProject) {
        toggleOpen();
        dispatchSuccessFeedback();
        history.push(getListUrl('projects'));
      } else {
        dispatchErrorFeedback();
      }
    } catch {
      setLoading(false);
      dispatchErrorFeedback();
    }
  };

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

  return (
    <ThemeProvider theme={mainTheme}>
      <CriticalButton
        className="mr-8 normal-case"
        variant="contained"
        color="secondary"
        aria-label="Follow"
        startIcon={<DeleteIcon />}
        disableElevation
        onClick={() => setOpen(true)}
      >
        Delete
      </CriticalButton>
      <Dialog
        open={open}
        onClose={toggleOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Project</DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            Are you sure you want to permamently delete this project?
            <br />
            After this action, it will not be possible to restore it.
          </Alert>
          <FormControlLabel
            label={`Delete all project tasks (${data.tasks.length})`}
            control={
              <Checkbox
                name="deleteTasks"
                checked={deleteTasks}
                onChange={handleCheckboxChange}
              />
            }
          />
          <DeleteValidationInput setValidated={setValidated} />
        </DialogContent>
        <DialogActions>
          <Button
            className="mr-8 normal-case"
            onClick={toggleOpen}
            variant="contained"
            aria-label="Follow"
            disableElevation
          >
            Cancel
          </Button>
          <CriticalButton
            className="mr-8 normal-case"
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            // @ts-ignore
            disabled={!validated}
            disableElevation
          >
            Edit
          </CriticalButton>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default DeleteProjectDialog;

export const DeleteProjectDialogFragment = {
  data: gql`
    fragment DeleteProjectDialogFragment__data on Project {
      id
      name
      tasks {
        id
        name
      }
    }
  `,
};
