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
import TextFieldFormsy from '@fuse/core/formsy/TextFieldFormsy';
import { UsersAutocompleteFormsy } from 'app/components/formsy';
import { AppContext } from 'app/AppContext';
import { UPDATE_PROJECT } from './mutations/updateProject';
import { UpdateProjectDialogFragment__data as DataType } from './__generated__/UpdateProjectDialogFragment__data';
import {
  UpdateProject as ResponseType,
  UpdateProjectVariables as InputType,
} from './mutations/__generated__/UpdateProject';

type Props = {
  data: DataType;
};

const UpdateProjectDialog: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isValid, setValid] = useState<boolean>(true);
  const formRef = useRef<any>(null);
  const { setActionFeedback, setLoading } = useContext(AppContext);
  const [updateProject] = useMutation<ResponseType, InputType>(UPDATE_PROJECT);

  // @ts-ignore
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme); // todo: Odstranit redux

  const resetForm = () => formRef.current.reset();
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  async function handleSubmit() {
    try {
      setLoading(true);
      setOpen(false);
      const { data: response } = await updateProject({
        variables: {
          ...formRef.current.getModel(),
          projectId: data?.id,
        },
      });
      if (response?.updateProject) {
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
  }

  function dispatchErrorFeedback() {
    setActionFeedback({
      message: 'Unable to update Project',
      severity: 'error',
    });
  }

  function dispatchSuccessFeedback() {
    setActionFeedback({
      message: 'Project was successfully updated',
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
        <DialogTitle id="form-dialog-title">Update Project</DialogTitle>
        <DialogContent>
          <Formsy
            // onValidSubmit={handleSubmit}
            onValid={() => setValid(true)}
            onInvalid={() => setValid(false)}
            className="flex flex-col justify-center w-full"
            ref={formRef}
          >
            <TextFieldFormsy
              className="mb-10 w-full"
              type="text"
              name="name"
              label="Name"
              value={data.name}
              variant="outlined"
              required
            />
            <TextFieldFormsy
              className="mb-10 w-full"
              type="text"
              name="description"
              label="Description"
              value={data.description}
              variant="outlined"
              required
            />
            <UsersAutocompleteFormsy
              name="managersId"
              label="Managers"
              value={data.managers}
              validations="minLength:1"
              required
            />
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

export default UpdateProjectDialog;

export const UpdateProjectDialogFragment = {
  data: gql`
    fragment UpdateProjectDialogFragment__data on Project {
      id
      name
      description
      managers {
        id
        email
      }
    }
  `,
};
