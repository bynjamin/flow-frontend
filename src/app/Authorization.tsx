import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { isAuthorized } from './services/jwtService/jwtService2';

type Props = {
  children: JSX.Element;
} & RouteComponentProps;

const Authorization: React.FC<Props> = ({ children, history }) => {
  useEffect(() => {
    if (!isAuthorized()) {
      history.push('/login');
    }
  }, []);
  return children;
};

export default withRouter(Authorization);
