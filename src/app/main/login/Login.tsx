import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  InputAdornment,
  Icon,
} from '@material-ui/core';
import Formsy from 'formsy-react';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, TextFieldFormsy, CheckboxFormsy } from '@fuse';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: any) => ({
  root: {
    background:
      'radial-gradient(' +
      darken(theme.palette.primary.dark, 0.5) +
      ' 0%, ' +
      theme.palette.primary.dark +
      ' 80%)',
    color: theme.palette.primary.contrastText,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [isFormValid, setIsFormValid] = useState(false);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model: any) {
    console.log(model);
  }

  return (
    <div
      className={clsx(
        classes.root,
        'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32',
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <FuseAnimate animation="transition.expandIn">
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-32">
              <img
                className="w-128 m-32"
                src="assets/images/logos/fuse.svg"
                alt="logo"
              />

              <Typography variant="h6" className="mt-16 mb-32">
                LOGIN TO YOUR ACCOUNT
              </Typography>

              <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                className="flex flex-col justify-center w-full"
              >
                <TextFieldFormsy
                  className="mb-16"
                  type="text"
                  name="email"
                  label="Username/Email"
                  validations={{
                    minLength: 4,
                  }}
                  validationErrors={{
                    minLength: 'Min character length is 4',
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          email
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  required
                />

                <TextFieldFormsy
                  className="mb-16"
                  type="password"
                  name="password"
                  label="Password"
                  validations={{
                    minLength: 8,
                  }}
                  validationErrors={{
                    minLength: 'Min character length is 8',
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          vpn_key
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  required
                />

                <div className="flex items-center justify-between">
                  <CheckboxFormsy
                    name="remember"
                    label="Remember me"
                    value={false}
                  />
                  <Link
                    className="font-medium"
                    to="/pages/auth/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="LOG IN"
                  disabled={!isFormValid}
                  value="legacy"
                >
                  Login
                </Button>
              </Formsy>

              <div className="my-24 flex items-center justify-center">
                <Divider className="w-32" />
                <span className="mx-8 font-bold">OR</span>
                <Divider className="w-32" />
              </div>

              <Button
                variant="contained"
                color="secondary"
                size="small"
                className="normal-case w-192 mb-8"
              >
                Log in with Google
              </Button>

              <Button
                variant="contained"
                color="primary"
                size="small"
                className="normal-case w-192"
              >
                Log in with Facebook
              </Button>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <span className="font-medium">Don't have an account?</span>
                <Link className="font-medium" to="/pages/auth/register">
                  Create an account
                </Link>
              </div>
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    </div>
  );
};

export default Login;