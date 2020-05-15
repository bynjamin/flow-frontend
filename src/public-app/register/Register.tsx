import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles, withStyles } from '@material-ui/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Illustration from '@bit/bynjamin.orbit.illustration';
import FuseAnimate from '@fuse/core/FuseAnimate';
import RegisterForm from './RegisterForm';
import { REGISTER } from './RegisterGraphQL';
import NavigationBar from '../navigation';
import RedirectToWorkspaceDialog from './RedirectToWorkspaceDialog';
import {
  RegistrationMutation as QueryDataType,
  RegistrationMutationVariables as QueryVariables,
} from './__generated__/RegistrationMutation';
import { appName } from 'config';

const useStyles = makeStyles((theme: any) => ({
  root: {
    background: `linear-gradient(to right, ${
      theme.palette.primary.dark
    } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

const RedirectButton = withStyles({
  root: {
    textTransform: 'none',
  },
})(Button);

const RedirectButton2 = withStyles({
  root: {
    marginTop: '12px',
  },
})(Button);

const Register = () => {
  const [registerMutation, { data, loading, error }] = useMutation<
    QueryDataType,
    QueryVariables
  >(REGISTER);
  const classes = useStyles();

  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpened(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpened(false);
  };

  const submitRegistration = (input: QueryVariables) => {
    registerMutation({ variables: { ...input } });
  };

  return (
    <>
      {/*
        <NavigationBar />
      */}
      <div
        className={clsx(
          classes.root,
          'flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0',
        )}
      >
        <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
          <FuseAnimate animation="transition.expandIn">
            <img
              className="w-128 mb-32"
              src="assets/images/logos/flow.png"
              alt="logo"
            />
          </FuseAnimate>

          <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <Typography variant="h3" color="inherit" className="font-light">
              {`Welcome to the ${appName}!`}
            </Typography>
          </FuseAnimate>

          <FuseAnimate delay={400}>
            <Typography
              variant="subtitle1"
              color="inherit"
              className="max-w-512 mt-16"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              ullamcorper nisl erat, vel convallis elit fermentum pellentesque.
              Sed mollis velit facilisis facilisis.
            </Typography>
          </FuseAnimate>
        </div>

        <FuseAnimate animation={{ translateX: [0, '100%'] }}>
          <Card
            className="w-full max-w-400 mx-auto m-16 md:m-0 flex justify-center items-center"
            square
          >
            <CardContent className="flex flex-col items-center justify-center p-32 md:p-48">
              {!loading && !data && !error && (
                <>
                  <Typography variant="h6" className="md:w-full mb-32">
                    CREATE A WORKSPACE
                  </Typography>
                  <RegisterForm submit={submitRegistration} />

                  <div className="flex flex-col items-center justify-center pt-32 pb-24">
                    <span className="font-medium">
                      Already have a workspace?
                    </span>
                    <RedirectButton
                      color="secondary"
                      onClick={handleOpenDialog}
                    >
                      Login to your workspace
                    </RedirectButton>
                  </div>

                  <div className="flex flex-col items-center" />
                </>
              )}
              {loading && (
                <>
                  <CircularProgress size={60} color="secondary" thickness={3} />
                  <span>We are preparing your workspace...</span>
                </>
              )}
              {data && (
                <>
                  <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <div>
                      <Illustration name="Success" spaceAfter="large" />
                    </div>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Alert severity="success">
                      <AlertTitle>Congratulations!</AlertTitle>
                      Your new workspace is ready. Go ahead and login for your
                      first time!
                    </Alert>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.fadeIn" delay={300}>
                    <RedirectButton2
                      color="secondary"
                      onClick={() => {
                        window.location.assign(
                          `http://${data.newRegistration.fqdn}`,
                        );
                      }}
                    >
                      Login to your workspace
                    </RedirectButton2>
                  </FuseAnimate>
                </>
              )}
              {error && (
                <>
                  <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <div>
                      <Illustration name="Error" spaceAfter="large" />
                    </div>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Alert severity="error">
                      <AlertTitle>Something goes wrong...</AlertTitle>
                      {error.message}
                    </Alert>
                  </FuseAnimate>
                </>
              )}
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
      <RedirectToWorkspaceDialog
        isOpen={isDialogOpened}
        handleClose={handleCloseDialog}
      />
    </>
  );
};

export default Register;
