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
import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { UsersAutocompleteFormsy } from 'app/components/formsy';
import { getDetailUrl } from 'app/helpers/linkResolver';
import { AppContext } from 'app/AppContext';

import { CREATE_PROJECT } from './mutations/createProject';
import {
  CreateProject as ResponseType,
  CreateProjectVariables as InputVariables,
} from './mutations/__generated__/CreateProject';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const CreateProjectDialog: React.FC<Props> = ({ open, setOpen }) => {
  const history = useHistory();
  const [isValid, setValid] = useState<boolean>(false);
  const formRef = useRef<any>(null);
  const { setActionFeedback, setLoading } = useContext(AppContext);

  const [createProject] = useMutation<ResponseType, InputVariables>(
    CREATE_PROJECT,
  );

  const resetForm = () => formRef.current.reset();
  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const dispatchSuccessFeedback = (projectName: string) => {
    setActionFeedback({
      message: `New project ${projectName} was created`,
      severity: 'success',
    });
  };

  const dispatchErrorFeedback = () => {
    setActionFeedback({
      message: 'Something went wrong. Project was not created',
      severity: 'error',
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const model = formRef.current.getModel();
      const { data: response } = await createProject({
        variables: { ...model },
      });
      if (response?.createProject) {
        const { id, name } = response.createProject;
        dispatchSuccessFeedback(name);
        setLoading(false);
        history.push(getDetailUrl('projects', Number(id)));
      } else {
        dispatchErrorFeedback();
      }
    } catch {
      dispatchErrorFeedback();
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
      <DialogTitle id="form-dialog-title">Create new project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill information about new project and click create
        </DialogContentText>
        <Formsy
          onValidSubmit={handleSubmit}
          onValid={enableButton}
          onInvalid={disableButton}
          className="flex flex-col justify-center w-full"
          ref={formRef}
        >
          <TextFieldFormsy
            autoFocus
            className="mb-16"
            type="text"
            name="name"
            label="Project name"
            variant="outlined"
            required
          />
          <TextFieldFormsy
            className="mb-16"
            type="text"
            name="description"
            label="Description"
            variant="outlined"
            required
          />
          <UsersAutocompleteFormsy
            name="managersId"
            label="Managers"
            validations="minLength:1"
            required
          />
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
