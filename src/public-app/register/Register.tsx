import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  CircularProgress,
} from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import { FuseAnimate } from '@fuse';
import RegisterForm from './RegisterForm';
import { REGISTER } from './RegisterMutation';
import { RegistrationInput } from './types';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const useStyles = makeStyles((theme: any) => ({
  root: {
    background: `linear-gradient(to right, ${
      theme.palette.primary.dark
    } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
    color: theme.palette.primary.contrastText,
  },
  link: {
    margin: theme.spacing(2),
    color: 'white !important',
    textDecoration: 'none !important',
  },
  activeLink: {
    color: '#039be5 !important',
  },
}));

const Register = () => {
  const [registerMutation, { data, loading, error }] = useMutation<
    RegistrationInput
  >(REGISTER);
  const classes = useStyles();

  const submitRegistration = (input: RegistrationInput) => {
    registerMutation({ variables: { ...input } });
  };

  console.log('data: ', data);
  console.log('loading: ', loading);
  console.log('error :', error);

  return (
    <div
      className={clsx(
        classes.root,
        'flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0',
      )}
    >
      <AppBar>
        <Toolbar>
          <NavLink
            to="/about"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            About
          </NavLink>
          <NavLink
            to="/pricing"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            Pricing
          </NavLink>
          <NavLink
            to="/register"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            Register
          </NavLink>
        </Toolbar>
      </AppBar>
      <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
        <FuseAnimate animation="transition.expandIn">
          <img
            className="w-128 mb-32"
            src="assets/images/logos/fuse.svg"
            alt="logo"
          />
        </FuseAnimate>

        <FuseAnimate animation="transition.slideUpIn" delay={300}>
          <Typography variant="h3" color="inherit" className="font-light">
            Welcome to the Flowato!
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
          <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128">
            {!loading && !data && !error && (
              <>
                <Typography variant="h6" className="md:w-full mb-32">
                  CREATE AN ACCOUNT
                </Typography>
                <RegisterForm submit={submitRegistration} />

                <div className="flex flex-col items-center justify-center pt-32 pb-24">
                  <span className="font-medium">Already have an account?</span>
                  <Link className="font-medium mt-8" to="/">
                    Back to Dashboard
                  </Link>
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
              <IconContext.Provider value={{ color: '#7DD460', size: '9em' }}>
                <div>
                  <FaCheckCircle />
                </div>
              </IconContext.Provider>
            )}
            {error && (
              <>
                <IconContext.Provider value={{ color: '#FF5656', size: '9em' }}>
                  <div>
                    <FaTimesCircle />
                  </div>
                </IconContext.Provider>
                <div>{error.message}</div>
              </>
            )}
          </CardContent>
        </Card>
      </FuseAnimate>
    </div>
  );
};

export default Register;
