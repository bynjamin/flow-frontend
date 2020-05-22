import React, { useRef, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Formsy from 'formsy-react';
import TextFieldFormsy from '@fuse/core/formsy/TextFieldFormsy';
import SelectFormsy from '@fuse/core/formsy/SelectFormsy';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from 'common/components/Dialog';
import { Backdrop } from 'common/components/backdrop';
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
  const formRef = useRef<any>(null);
  const { setActionFeedback } = useContext(AppContext);
  const [updateUser, { loading }] = useMutation<ResponseType, InputType>(
    UPDATE_USER,
  );

  async function handleSubmit() {
    try {
      const { data: response } = await updateUser({
        variables: { ...formRef.current.getModel(), userId: data?.id },
      });
      if (response?.updateUser) {
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

  if (loading) {
    return <Backdrop open={true} />;
  }

  return (
    <Dialog
      title="Update User Profile"
      openController={
        <Button
          className="mr-8 normal-case"
          variant="contained"
          color="secondary"
          aria-label="Follow"
          startIcon={<EditIcon />}
          disableElevation
        >
          Edit
        </Button>
      }
      closeController={
        <Button
          className="mr-8 normal-case"
          variant="contained"
          aria-label="Follow"
          disableElevation
        >
          Cancel
        </Button>
      }
      content={
        <Formsy
          // onValidSubmit={handleSubmit}
          // onValid={enableButton}
          // onInvalid={disableButton}
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
                    <MenuItem value={role.id}>{role.name}</MenuItem>
                  ))}
                </SelectFormsy>
              </Grid>
              <Grid item xs={6}>
                <TextFieldFormsy
                  className="mb-10 w-full"
                  type="text"
                  name="position"
                  value={data?.position}
                  label="Position"
                  variant="outlined"
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </Grid>
            </Grid>
          </Grid>
        </Formsy>
      }
      actions={
        <Button
          className="mr-8 normal-case"
          variant="contained"
          color="secondary"
          aria-label="Follow"
          startIcon={<EditIcon />}
          onClick={handleSubmit}
          disableElevation
        >
          Edit
        </Button>
      }
    />
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
    }
  `,
};
