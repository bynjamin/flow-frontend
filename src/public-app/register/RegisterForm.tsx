import React, { useRef, useState } from 'react';
import Formsy from 'formsy-react';
import { execute, makePromise } from 'apollo-link';
import { HttpLink } from 'apollo-boost';
import { Button, InputAdornment, Icon } from '@material-ui/core';
import { TextFieldFormsy } from '@fuse';
import { RecaptchaFormsy } from 'common/components/formsy';
import { SITE_ADDRESS_CHECK } from './RegisterGraphQL';
import { RegistrationMutationVariables } from './__generated__/RegistrationMutation';
import { IsSiteAddressAvailableVariables } from './__generated__/IsSiteAddressAvailable';

const uri = process.env.REACT_APP_PUBLIC_API_URL;
const link = new HttpLink({ uri });

const isSiteAddressAvailable = async ({
  siteAddress,
}: IsSiteAddressAvailableVariables) => {
  const operation = {
    query: SITE_ADDRESS_CHECK,
    variables: { siteAddress },
  };
  const { data } = await makePromise(execute(link, operation));
  if (data) {
    return data?.isSiteAddressAvailable;
  }
  throw new Error('Somethin went wrong');
};

type Props = {
  submit: (input: RegistrationMutationVariables) => void;
};

const RegisterForm = ({ submit }: Props) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [siteAddressVal, setSiteAddressVal] = useState('');
  const formRef = useRef(null);

  const host = process.env.REACT_APP_HOST || '';

  const customValidateForm = async (values: RegistrationMutationVariables) => {
    const { siteAddress } = values;
    // trigger API call only if site address changed
    if (siteAddress && siteAddress !== siteAddressVal) {
      setSiteAddressVal(siteAddress);
      if (siteAddress.length > 2) {
        const isAvailable = await isSiteAddressAvailable({ siteAddress });
        if (!isAvailable) {
          // @ts-ignore
          formRef.current.updateInputsWithError(
            {
              siteAddress: 'This site is already used',
            },
            true,
          );
          setIsFormValid(false);
        }
      }
    }
  };

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

  const handleSubmit = (input: RegistrationMutationVariables) => {
    submit(input);
  };

  /*
  In case we would like to validate site address only on submit (lesser requests to API)

  const handleSubmit = async (input: RegistrationInput, reset: any, invalidate: any) => {
    const isAvailable = await isSiteAddressAvailable(input.siteAddress);
    if (!isAvailable) {
      invalidate({
        siteAddress: 'This site address is already used',
      })
    } else {
      submit(input);
    }
  };
  */

  return (
    <div className="w-full">
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
        onChange={customValidateForm}
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
            minLength: 4,
          }}
          validationErrors={{
            minLength: 'Min character length is 4',
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
        <RecaptchaFormsy name="captcha" validations="isExisty" required />

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
