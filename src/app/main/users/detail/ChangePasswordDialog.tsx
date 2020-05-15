import React, { useState, useRef, useContext } from 'react';
import Formsy from 'formsy-react';
import { useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import SecurityIcon from '@material-ui/icons/Security';
import { Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import TextFieldFormsy from '@fuse/core/formsy/TextFieldFormsy';
import Dialog from 'common/components/Dialog';
import { Backdrop } from 'common/components/backdrop';
import { AppContext } from 'app/AppContext';
import { CHANGE_PASSWORD } from './mutations/changePassword';
import {
  // eslint-disable-next-line no-unused-vars
  ChangePassword as ResponseType,
  // eslint-disable-next-line no-unused-vars
  ChangePasswordVariables as InputType,
} from './mutations/__generated__/ChangePassword';

const WarningButton = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
}))(Button);

const ChangePasswordDialog: React.FC = () => {
  const formRef = useRef<any>(null);
  const { setActionFeedback } = useContext(AppContext);
  const [formValid, setFormValid] = useState<boolean>(false);
  const [changePassword, { loading }] = useMutation<ResponseType, InputType>(
    CHANGE_PASSWORD,
  );

  async function handleSubmit() {
    try {
      const { data: response } = await changePassword({
        variables: { ...formRef.current.getModel() },
      });
      if (response?.updatePassword) {
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
      message: 'Unable to update password',
      severity: 'error',
    });
  }

  function dispatchSuccessFeedback() {
    setActionFeedback({
      message: 'Your password was successfully updated',
      severity: 'success',
    });
  }

  if (loading) {
    return <Backdrop open={true} />;
  }

  return (
    <Dialog
      title="Change password"
      openController={
        <WarningButton
          className="mr-8 normal-case"
          variant="contained"
          color="secondary"
          aria-label="Follow"
          startIcon={<SecurityIcon />}
          disableElevation
        >
          Change password
        </WarningButton>
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
          onValid={() => setFormValid(true)}
          onInvalid={() => setFormValid(false)}
          className="flex flex-col justify-center w-full"
          ref={formRef}
        >
          <TextFieldFormsy
            className="mb-10 w-full"
            type="password"
            name="oldPassword"
            label="Old Password"
            variant="outlined"
            required
          />
          <TextFieldFormsy
            className="mb-10 w-full"
            type="password"
            name="password"
            label="New Password"
            validations="minLength:8"
            validationError="Min. character length is 8"
            variant="outlined"
            required
          />
          <TextFieldFormsy
            className="mb-10 w-full"
            type="password"
            name="passwordConfirm"
            label="New Password Confirm"
            validations="equalsField:password"
            validationError="Passwords don't match"
            variant="outlined"
            required
          />
        </Formsy>
      }
      actions={
        <WarningButton
          className="mr-8 normal-case"
          variant="contained"
          color="secondary"
          aria-label="Follow"
          startIcon={<SecurityIcon />}
          onClick={handleSubmit}
          disableElevation
          disabled={!formValid}
        >
          Change
        </WarningButton>
      }
    />
  );
};

export default ChangePasswordDialog;
