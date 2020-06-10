import React, { useRef, useContext, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Formsy from 'formsy-react';
import TextFieldFormsy from '@fuse/core/formsy/TextFieldFormsy';
import SelectFormsy from '@fuse/core/formsy/SelectFormsy';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppContext } from 'app/AppContext';
import { UPDATE_USER } from './mutations/updateUser';
// eslint-disable-next-line no-unused-vars
import { UpdateUserDialogFragment__data as DataType } from './__generated__/UpdateUserDialogFragment__data';
// eslint-disable-next-line no-unused-vars
import { UpdateUserDialogFragment__roles as RoleType } from './__generated__/UpdateUserDialogFragment__roles';
import {
  // eslint-disable-next-line no-unused-vars
  UpdateUser as ResponseType,
  // eslint-disable-next-line no-unused-vars
  UpdateUserVariables as InputType,
} from './mutations/__generated__/UpdateUser';

type Props = {
  data: DataType;
  roles: RoleType[];
};

const UpdateUserDialog: React.FC<Props> = ({ data, roles }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isValid, setValid] = useState<boolean>(false);
  const formRef = useRef<any>(null);
  const { setActionFeedback, setLoading, user } = useContext(AppContext);
  const [updateUser] = useMutation<ResponseType, InputType>(UPDATE_USER);

  // @ts-ignore
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme); // todo: Odstranit redux

  const isAdmin = user ? user?.role.level < 3 : false;

  async function handleSubmit() {
    try {
      setLoading(true);
      const { data: response } = await updateUser({
        variables: { ...formRef.current.getModel(), userId: data?.id },
      });
      setLoading(false);
      if (response?.updateUser) {
        setOpen(false);
        dispatchSuccessFeedback();
      } else {
        dispatchErrorFeedback();
      }
    } catch {
      setLoading(false);
      dispatchErrorFeedback();
    }
  }

  const toggleOpen = () => setOpen(!open);

  function dispatchErrorFeedback() {
    setActionFeedback({
      message: 'Unable to update User Profile',
      severity: 'error',
    });
  }

  function dispatchSuccessFeedback() {
    setActionFeedback({
      message: 'User Profile was successfully updated',
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
        onClick={toggleOpen}
        startIcon={<EditIcon />}
        disableElevation
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={toggleOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update User Profile</DialogTitle>
        <DialogContent>
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
                    value={data?.title}
                    label="Title"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextFieldFormsy
                    className="mb-10 w-full"
                    type="text"
                    name="firstName"
                    value={data?.firstName}
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
                    value={data?.lastName}
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
                    value={data?.gender}
                    label="Gender"
                    variant="outlined"
                  >
                    <MenuItem value="m">Male</MenuItem>
                    <MenuItem value="f">Female</MenuItem>
                    <MenuItem value="o">Other</MenuItem>
                  </SelectFormsy>
                </Grid>
                {isAdmin && (
                  <Grid item xs={6}>
                    <SelectFormsy
                      className="mb-10 w-full"
                      // type="text"
                      name="roleId"
                      value={data?.role.id}
                      label="Role"
                      variant="outlined"
                    >
                      {roles?.map((role: RoleType) => (
                        <MenuItem key={role.id} value={role.id}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </SelectFormsy>
                  </Grid>
                )}
                <Grid item xs={6}>
                  <TextFieldFormsy
                    className="mb-10 w-full"
                    type="text"
                    name="position"
                    value={data?.position}
                    label="Position"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldFormsy
                    className="mb-10 w-full"
                    type="text"
                    name="employmentType"
                    value={data?.employmentType}
                    label="Employment Type"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldFormsy
                    className="mb-10 w-full"
                    type="text"
                    name="phone"
                    value={data?.phone}
                    label="Phone"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextFieldFormsy
                    className="mb-10 w-full"
                    type="text"
                    name="about"
                    value={data?.about}
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
                    value={data?.address.street}
                    label="Street"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldFormsy
                    className="mb-10 w-full"
                    type="text"
                    name="zip"
                    value={data?.address.zip}
                    label="Zip"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldFormsy
                    className="mb-10 w-full"
                    type="text"
                    name="city"
                    value={data?.address.city}
                    label="City"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldFormsy
                    className="mb-10 w-full"
                    type="text"
                    name="country"
                    value={data?.address.country}
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
          <Button
            className="mr-8 normal-case"
            variant="contained"
            onClick={toggleOpen}
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
                startIcon={<EditIcon />}
                onClick={handleSubmit}
                disabled={!isValid}
                disableElevation
              >
                Edit
              </Button>
            </span>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default UpdateUserDialog;

export const UpdateUserDialogFragment = {
  data: gql`
    fragment UpdateUserDialogFragment__data on User {
      id
      title
      firstName
      lastName
      title
      role {
        id
      }
      gender
      about
      phone
      gdpr
      position
      employmentType
      address {
        street
        zip
        city
        country
      }
    }
  `,
  roles: gql`
    fragment UpdateUserDialogFragment__roles on UserRole {
      id
      name
      level
    }
  `,
};
