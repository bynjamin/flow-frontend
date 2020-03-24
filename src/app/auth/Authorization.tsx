import React, { useState, useEffect, useContext } from 'react';
import AppContext from 'common/AppContext';
import { useHistory, useLocation } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { isAuthorized } from './jwtService/jwtService2';

type Props = {
  children: React.ReactNode;
};

const Authorization: React.FC<Props> = ({ children }) => {
  const { routes } = useContext<any>(AppContext);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuthorized()) {
      const isPublic =
        matchRoutes(routes, pathname)?.[0]?.route?.settings?.isPublic || false;
      if (!isPublic) {
        setAuthorized(false);
        redirectToLogin();
      } else {
        setAuthorized(true);
      }
    }
  }, [pathname]);

  const redirectToLogin = () => {
    history.push({
      pathname: '/login',
      state: { redirectUrl: pathname },
    });
  };
  return authorized ? <>{children}</> : null;
};

export default Authorization;
