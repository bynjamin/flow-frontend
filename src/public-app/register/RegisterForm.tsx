// todo: ts-fix
import React, { useRef, useState } from 'react';
import Formsy from 'formsy-react';
import { Button, InputAdornment, Icon } from '@material-ui/core';
import { TextFieldFormsy } from '@fuse';
import { RecaptchaFormsy } from 'common/components/formsy';
import { RegistrationInput } from './types';

type Props = {
  submit: (input: RegistrationInput) => void;
};

const RegisterForm = ({ submit }: Props) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  const host = process.env.REACT_APP_HOST || '';

  /*
  useEffect(() => {
    if (
      register.error &&
      (register.error.username ||
        register.error.password ||
        register.error.email)
    ) {
      // @ts-ignore
      formRef.current.updateInputsWithError({
        ...register.error,
      });
      disableButton();
    }
  }, [register.error]);
  */

  const disableButton = () => {
    setIsFormValid(false);
  };

  const enableButton = () => {
    setIsFormValid(true);
  };

  const handleSubmit = (input: RegistrationInput) => {
    console.log(input);
    submit(input);
  };

  return (
    <div className="w-full">
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
        ref={formRef}
        className="flex flex-col justify-center w-full"
      >
        <TextFieldFormsy
          className="mb-16"
          type="text"
          name="siteAddress"
          label="Site address"
          validations={{
            minLength: 3,
          }}
          validationErrors={{
            minLength: 'Min character length is 3',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">.{host}</InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />
        <TextFieldFormsy
          className="mb-16"
          type="text"
          name="company"
          label="Company Name"
          validations={{
            minLength: 3,
          }}
          validationErrors={{
            minLength: 'Min character length is 3',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  business_center
                </Icon>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />
        <TextFieldFormsy
          className="mb-16"
          type="text"
          name="fullName"
          label="Full Name"
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
                  person
                </Icon>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />

        <TextFieldFormsy
          className="mb-16"
          type="text"
          name="mail"
          label="Email"
          validations="isEmail"
          validationErrors={{
            isEmail: 'Please enter a valid email',
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

        <TextFieldFormsy
          className="mb-16"
          type="password"
          name="passwordConfirm"
          label="Confirm Password"
          validations="equalsField:password"
          validationErrors={{
            equalsField: 'Passwords do not match',
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
        <RecaptchaFormsy name="captcha" validations="isExisty" />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16 normal-case"
          aria-label="REGISTER"
          disabled={!isFormValid}
          value="legacy"
        >
          Register
        </Button>
      </Formsy>
    </div>
  );
};

export default RegisterForm;
