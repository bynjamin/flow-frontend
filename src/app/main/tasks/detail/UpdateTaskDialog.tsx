import React, { useState, useRef, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ThemeProvider } from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import {
  UsersAutocompleteFormsy,
  ProjectsAutocompleteFormsy,
  DatePickerFormsy,
} from 'app/components/formsy';
import { TASK_STATUSES } from '../constants';
import { UPDATE_TASK } from './mutations/updateTask';
import { AppContext } from 'app/AppContext';

import { UpdateTaskDialogFragment__data as DataType } from './__generated__/UpdateTaskDialogFragment__data';
import {
  UpdateTask as ResponseType,
  UpdateTaskVariables as InputType,
} from './mutations/__generated__/UpdateTask';

type Props = {
  data: DataType;
};

const UpdateTaskDialog: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isValid, setValid] = useState<boolean>(true);
  const formRef = useRef<any>(null);
  const { setActionFeedback, setLoading } = useContext(AppContext);
  const [updateTask] = useMutation<ResponseType, InputType>(UPDATE_TASK);

  // @ts-ignore
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme); // todo: Odstranit redux

  const resetForm = () => formRef.current.reset();
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setOpen(false);
      const { data: response } = await updateTask({
        variables: {
          ...formRef.current.getModel(),
          taskId: data?.id,
        },
      });
      if (response?.updateTask) {
        dispatchSuccessFeedback();
        handleClose();
      } else {
        dispatchErrorFeedback();
        setOpen(true);
      }
    } catch {
      dispatchErrorFeedback();
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  function dispatchErrorFeedback() {
    setActionFeedback({
      message: 'Unable to update Task',
      severity: 'error',
    });
  }

  function dispatchSuccessFeedback() {
    setActionFeedback({
      message: 'Task was successfully updated',
      severity: 'success',
    });
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <Button
        className="mr-8 normal-case"
        variant="contained"
        color="secondary"
        aria-label="Follow"
        startIcon={<EditIcon />}
        disableElevation
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Task</DialogTitle>
        <DialogContent>
          <Formsy
            // onValidSubmit={handleSubmit}
            onValid={() => setValid(true)}
            onInvalid={() => setValid(false)}
            className="flex flex-col justify-center w-full"
            ref={formRef}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextFieldFormsy
                  autoFocus
                  type="text"
                  name="name"
                  value={data.name}
                  label="Task name"
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldFormsy
                  type="text"
                  name="description"
                  value={data.description}
                  label="Description"
                  variant="outlined"
                  required
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectFormsy
                  className="w-full"
                  name="status"
                  value={data.status}
                  label="Status *"
                  variant="outlined"
                  required
                >
                  {(Object.keys(TASK_STATUSES) as Array<
                    keyof typeof TASK_STATUSES
                  >).map(status => (
                    <MenuItem key={status} value={status}>
                      {TASK_STATUSES[status]}
                    </MenuItem>
                  ))}
                </SelectFormsy>
              </Grid>
              <Grid item xs={6}>
                <DatePickerFormsy
                  name="deadline"
                  value={data.deadline}
                  label="Deadline *"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <ProjectsAutocompleteFormsy
                  name="projectId"
                  value={data.project}
                  label="Project *"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <UsersAutocompleteFormsy
                  name="assigneeIds"
                  value={data.assignees}
                  label="Managers *"
                  validations="minLength:1"
                  required
                />
              </Grid>
            </Grid>
          </Formsy>
        </DialogContent>
        <DialogActions>
          <Button
            className="mr-8 normal-case"
            onClick={handleClose}
            variant="contained"
            aria-label="Follow"
            disableElevation
          >
            Cancel
          </Button>
          <Button
            className="mr-8 normal-case"
            variant="contained"
            color="secondary"
            startIcon={<EditIcon />}
            onClick={handleSubmit}
            disabled={!isValid}
            disableElevation
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default UpdateTaskDialog;

export const UpdateTaskDialogFragment = {
  data: gql`
    fragment UpdateTaskDialogFragment__data on Task {
      id
      name
      description
      status
      deadline
      assignees {
        id
        fullName
        email
      }
      project {
        id
        name
      }
    }
  `,
};
