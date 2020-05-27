import React, {
  useRef,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import {
  UsersAutocompleteFormsy,
  ProjectsAutocompleteFormsy,
  DatePickerFormsy,
} from 'app/components/formsy';
import { getDetailUrl } from 'app/helpers/linkResolver';
import { AppContext } from 'app/AppContext';
import { TASK_STATUSES } from './constants';

import { CREATE_TASK } from './mutations/createTask';
import {
  CreateTask as ResponseType,
  CreateTaskVariables as InputVariables,
} from './mutations/__generated__/CreateTask';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  project?: {
    id: number;
    name: string;
  };
};

const CreateProjectDialog: React.FC<Props> = ({ open, setOpen, project }) => {
  const history = useHistory();
  const [isValid, setValid] = useState<boolean>(false);
  const formRef = useRef<any>(null);
  const { setActionFeedback, setLoading } = useContext(AppContext);

  const [createTask] = useMutation<ResponseType, InputVariables>(CREATE_TASK);

  const resetForm = () => formRef.current.reset();
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const dispatchSuccessFeedback = (taskName: string) => {
    setActionFeedback({
      message: `New task ${taskName} was created`,
      severity: 'success',
    });
  };

  const dispatchErrorFeedback = () => {
    setActionFeedback({
      message: 'Something went wrong. Task was not created',
      severity: 'error',
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setOpen(false);
      const model = formRef.current.getModel();
      const { data: response } = await createTask({
        variables: { ...model },
      });
      if (response?.createTask) {
        const { id, name } = response.createTask;
        dispatchSuccessFeedback(name);
        setLoading(false);
        history.push(getDetailUrl('tasks', Number(id)));
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

  const disableButton = () => setValid(false);
  const enableButton = () => setValid(true);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create new task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill information about new task and click create
        </DialogContentText>
        <Formsy
          onValidSubmit={handleSubmit}
          onValid={enableButton}
          onInvalid={disableButton}
          className="flex flex-col justify-center w-full"
          ref={formRef}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextFieldFormsy
                autoFocus
                type="text"
                name="name"
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
                label="Status *"
                variant="outlined"
                required
              >
                {(Object.keys(TASK_STATUSES) as Array<
                  keyof typeof TASK_STATUSES
                >).map(state => (
                  <MenuItem key={state} value={TASK_STATUSES[state]}>
                    {TASK_STATUSES[state]}
                  </MenuItem>
                ))}
              </SelectFormsy>
            </Grid>
            <Grid item xs={6}>
              <DatePickerFormsy name="deadline" label="Deadline *" required />
            </Grid>
            <Grid item xs={6}>
              <ProjectsAutocompleteFormsy
                name="projectId"
                value={project}
                label="Project *"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <UsersAutocompleteFormsy
                name="assigneeIds"
                label="Managers *"
                validations="minLength:1"
                required
              />
            </Grid>
          </Grid>
        </Formsy>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!isValid} color="secondary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProjectDialog;
