import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { isAuthorized } from './services/jwtService/jwtService2';

type Props = {
  children: JSX.Element;
};

const Authorization: React.FC<Props> = ({ children }) => {
  const history = useHistory();
  useEffect(() => {
    if (!isAuthorized()) {
      history.push('/login');
    }
  }, []);
  return children;
};

export default Authorization;
