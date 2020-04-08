import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from 'app/AppContext';
import { useHistory, useLocation } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import {
  isLoggedIn,
  getTokens,
  getTokenLifetime,
} from './jwtService/jwtService2';

const TRASHHOLD_OFFSET = 2000;

type Props = {
  children: React.ReactNode;
};

const Authorization: React.FC<Props> = ({ children }) => {
  const { routes } = useContext(AppContext);
  const [authorized, setAuthorized] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const history = useHistory();
  const { pathname } = useLocation();

  const checkAuth = (expired: boolean) => {
    if (!isLoggedIn()) {
      setLoggedIn(false);
      const isPublic =
        matchRoutes(routes, pathname)?.[0]?.route?.settings?.isPublic || false;
      if (!isPublic) {
        setAuthorized(false);
        redirectToLogin(expired);
      } else {
        setAuthorized(true);
      }
    } else {
      setLoggedIn(true);
    }
  };

  // Schedule JWT check based on its expiration
  const setJWTCheck = () => {
    console.log('setJWTCheck');
    if (loggedIn) {
      console.log('setJWTCheck - loggedIn');
      const tokens = getTokens();
      if (tokens) {
        const tokenLifetimeMS = getTokenLifetime(tokens.accessToken) * 1000;
        setTimeout(() => {
          if (isLoggedIn()) {
            console.log('still logged in');
            setJWTCheck();
          } else {
            console.log('logout');
            checkAuth(true);
          }
        }, tokenLifetimeMS + TRASHHOLD_OFFSET);
      }
    }
  };

  // Check if User is authorized, every time when pathname changes
  useEffect(() => checkAuth(false), [pathname]);

  // Schedule JWT check every time when user logs in
  useEffect(setJWTCheck, [loggedIn]);

  const redirectToLogin = (expired: boolean) => {
    history.push({
      pathname: '/login',
      state: { redirectUrl: pathname, sessionExpired: expired },
    });
  };
  return authorized ? <>{children}</> : null;
};

export default Authorization;
