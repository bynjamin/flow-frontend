import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import publicGql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import { RegisterNetflixMutation as QueryDataType } from './__generated__/RegisterNetflixMutation';

export const REGISTER_NETFLIX = publicGql`
  mutation RegisterNetflixMutation {
    newRegistration(
      company: "Netflix"
      mail: "netflix@flowato.com"
      fullName: "Jozko Genericky"
      password: "aaaaaaaa"
      passwordConfirm: "aaaaaaaa"
      captcha: "blablabla"
      siteAddress: "netflix"
    ) {
      fqdn
    }
  }
`;

const RegisterNetflix: React.FC = () => {
  const [registerNetflixMutation, { data, loading, error }] = useMutation<
    QueryDataType
  >(REGISTER_NETFLIX);

  const handleRegister = (e: any) => {
    registerNetflixMutation();
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (data) {
    return <div style={{ color: 'green' }}>{JSON.stringify(data)}</div>;
  }
  if (error) {
    return <div style={{ color: 'red' }}>{JSON.stringify(error)}</div>;
  }
  return (
    <Button variant="contained" color="secondary" onClick={handleRegister}>
      Register Netflix
    </Button>
  );
};

export default RegisterNetflix;
