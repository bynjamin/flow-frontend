import React, { useState, useRef, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link, useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import TextFieldFormsy from '@fuse/core/formsy/TextFieldFormsy';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { saveTokens } from 'app/auth/jwtService/jwtService2';
import { AppContext } from 'app/AppContext';
import { publicClient } from 'apollo-clients';
import { LOGIN } from './mutations/login';
import {
  // eslint-disable-next-line no-unused-vars
  Login as ResponseType,
  // eslint-disable-next-line no-unused-vars
  LoginVariables as InputType,
} from './mutations/__generated__/Login';

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

const Login: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state } = useLocation();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const formRef = useRef(null);
  const { setUser, setActionFeedback, setLoading } = useContext(AppContext);

  const [login] = useMutation<ResponseType, InputType>(LOGIN, {
    client: publicClient,
  });

  const disableButton = () => {
    setIsFormValid(false);
  };

  const enableButton = () => {
    setIsFormValid(true);
  };

  const handleSubmit = async (model: InputType) => {
    try {
      setLoading(true);
      const { data, errors } = await login({
        variables: { ...model },
      });
      setLoading(false);

      if (errors) {
        setActionFeedback({
          message: 'Invalid login credentials',
          severity: 'error',
        });
        // @ts-ignore
        formRef.current.reset();
      }

      if (data) {
        const { accessToken, user, expiresIn, tokenType } = data.login;
        saveTokens({ accessToken, tokenType, expiresIn });
        setUser(user);

        // @ts-ignore
        const redirectUrl = state?.redirectUrl || '/';
        history.push(redirectUrl);
      }
    } catch {
      setLoading(false);
      setActionFeedback({
        message: 'Invalid login credentials',
        severity: 'error',
      });
      // @ts-ignore
      formRef.current.reset();
    }
  };

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
                src="assets/images/logos/flow.png"
                alt="logo"
              />
              <Typography variant="h6" className="mt-16 mb-32">
                LOGIN TO YOUR ACCOUNT
              </Typography>

              {/*
                //@ts-ignore */}
              {state?.sessionExpired && (
                <FuseAnimate animation="transition.expandIn">
                  <Alert className="mb-32" severity="warning">
                    <AlertTitle>Your session expired</AlertTitle>
                    Due to inactivity, your session expired. Enter your
                    credentials to continue.
                  </Alert>
                </FuseAnimate>
              )}

              <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                className="flex flex-col justify-center w-full"
                ref={formRef}
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

                <div className="flex items-center justify-center">
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
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    </div>
  );
};

export default Login;
