import React, { useState, useContext, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';
import Formsy from 'formsy-react';
import TextFieldFormsy from '@fuse/core/formsy/TextFieldFormsy';
import SelectFormsy from '@fuse/core/formsy/SelectFormsy';
import MenuItem from '@material-ui/core/MenuItem';
import { Backdrop } from 'common/components/backdrop';
import { AppContext } from 'app/AppContext';

import { ROLES } from './queries/inviteUserDialogRoles';
import {
  InviteUserDialogRoles as DataType,
  InviteUserDialogRoles_userRoles as RoleType,
} from './queries/__generated__/InviteUserDialogRoles';

import { INVITE_USER } from './mutations/inviteUser';
import {
  InviteUser as ResponseType,
  InviteUserVariables as InputType,
} from './mutations/__generated__/InviteUser';

type Props = {
  open: boolean;
  onClose: () => void;
};

const InviteUserDialog: React.FC<Props> = ({ open, onClose }) => {
  const [addMultiple, setAddMultiple] = useState<boolean>(false);
  const [isValid, setValid] = useState<boolean>(false);
  const formRef = useRef<any>(null);
  const { setActionFeedback, user } = useContext(AppContext);
  const { data } = useQuery<DataType>(ROLES); // todo: error handling
  const [inviteUser, { loading }] = useMutation<ResponseType, InputType>(
    INVITE_USER,
  );

  const availableRoles =
    data && user
      ? data?.userRoles.filter(
          (role: RoleType) => role.level >= user?.role.level,
        )
      : [];

  const resetForm = () => formRef.current.reset();

  const handleClose = () => {
    onClose();
    resetForm();
    setAddMultiple(false);
    setValid(false);
  };

  async function handleSubmit() {
    try {
      if (!addMultiple) {
        handleClose();
      }
      const { data: response } = await inviteUser({
        variables: { ...formRef.current.getModel() },
        refetchQueries: ['UsersList'],
      });
      if (response?.inviteUser) {
        dispatchSuccessFeedback();
      } else {
        dispatchErrorFeedback();
      }
    } catch {
      dispatchErrorFeedback();
    }
  }

  function dispatchErrorFeedback() {
    setActionFeedback({
      message: 'Unable to send workspace invitation',
      severity: 'error',
    });
  }

  function dispatchSuccessFeedback() {
    setActionFeedback({
      message: 'Workspace invitation has been sent',
      severity: 'success',
    });
  }

  if (loading) {
    return <Backdrop open={true} />;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Invite user to workspace</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill the information about new user
        </DialogContentText>
        <Formsy
          // onValidSubmit={handleSubmit}
          onValid={() => setValid(true)}
          onInvalid={() => setValid(false)}
          className="flex flex-col justify-center w-full"
          ref={formRef}
        >
          <Grid container spacing={5}>
            <Grid container item spacing={1}>
              <Grid item xs={2}>
                <TextFieldFormsy
                  className="mb-10 w-full"
                  type="text"
                  name="title"
                  label="Title"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={5}>
                <TextFieldFormsy
                  className="mb-10 w-full"
                  type="text"
                  name="firstName"
                  label="First Name"
                  validations="minLength:2"
                  validationError="Min. character length is 2"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={5}>
                <TextFieldFormsy
                  className="mb-10 w-full"
                  type="text"
                  name="lastName"
                  label="Last Name"
                  validations="minLength:2"
                  validationError="Min. character length is 2"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <SelectFormsy
                  className="mb-10 w-full"
                  // type="text"
                  name="gender"
                  label="Gender"
                  variant="outlined"
                >
                  <MenuItem value="m">Male</MenuItem>
                  <MenuItem value="f">Female</MenuItem>
                  <MenuItem value="o">Other</MenuItem>
                </SelectFormsy>
              </Grid>
              <Grid item xs={6}>
                <SelectFormsy
                  className="mb-10 w-full"
                  // type="text"
                  name="roleId"
                  label="Role *"
                  variant="outlined"
                  required
                >
                  {availableRoles.map((role: RoleType) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </SelectFormsy>
              </Grid>
              <Grid item xs={6}>
                <TextFieldFormsy
                  className="mb-10 w-full"
                  type="text"
                  name="position"
                  label="Position"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldFormsy
                  className="mb-10 w-full"
                  type="text"
                  name="employmentType"
                  label="Employment Type"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldFormsy
                  className="mb-10 w-full"
                  type="text"
                  name="phone"
                  label="Phone"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldFormsy
                  className="mb-10 w-full"
                  type="text"
                  name="email"
                  label="Email"
                  validations="isEmail"
                  validationError="Invalid email"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldFormsy
                  className="mb-10 w-full"
                  type="text"
                  name="about"
                  label="About"
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
            <Grid container item spacing={1}>
              <Grid item xs={6}>
                <TextFieldFormsy
                  className="mb-10 w-full"
                  type="text"
                  name="street"
                  label="Street"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldFormsy
                  className="mb-10 w-full"
                  type="text"
                  name="zip"
                  label="Zip"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldFormsy
                  className="mb-10 w-full"
                  type="text"
                  name="city"
                  label="City"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldFormsy
                  className="mb-10 w-full"
                  type="text"
                  name="country"
                  label="Country"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </Formsy>
      </DialogContent>
      <DialogActions>
        {!isValid && (
          <Typography color="error">
            Fill all required fields (marked with *)
          </Typography>
        )}
        <Tooltip title="Add multiple" placement="top">
          <Switch
            checked={addMultiple}
            onChange={(event, checked) => setAddMultiple(checked)}
            value="addMultiple"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </Tooltip>
        <Button
          className="mr-8 normal-case"
          onClick={handleClose}
          variant="contained"
          aria-label="Follow"
          disableElevation
        >
          Cancel
        </Button>
        <Tooltip
          title="Fill all required fields"
          placement="top"
          disableHoverListener={isValid}
        >
          <span>
            <Button
              className="mr-8 normal-case"
              variant="contained"
              color="secondary"
              startIcon={<SendIcon />}
              onClick={handleSubmit}
              disabled={!isValid}
              disableElevation
            >
              Invite
            </Button>
          </span>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

export default InviteUserDialog;
