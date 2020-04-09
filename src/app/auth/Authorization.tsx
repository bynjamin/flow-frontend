import React, { useState, useEffect, useContext, useCallback } from 'react';
import round from 'lodash/round';
import { useMutation } from '@apollo/react-hooks';
import { useHistory, useLocation } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { AppContext } from 'app/AppContext';
import {
  saveTokens,
  isLoggedIn,
  getTokens,
  getTokenLifetime,
} from './jwtService/jwtService2';
import { REFRESH_LOGIN } from './refreshLoginMutation';
// eslint-disable-next-line no-unused-vars
import { RefreshLogin as ResponseType } from './__generated__/RefreshLogin';

const TRASHHOLD_OFFSET = 120000; // 2 minutes

type Props = {
  children: React.ReactNode;
};

const Authorization: React.FC<Props> = ({ children }) => {
  const { routes, setActionFeedback } = useContext(AppContext);
  const [authorized, setAuthorized] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const history = useHistory();
  const { pathname } = useLocation();
  const [refreshLogin] = useMutation<ResponseType>(REFRESH_LOGIN);

  const redirectToLogin = useCallback(
    (expired: boolean) => {
      history.push({
        pathname: '/login',
        state: { redirectUrl: pathname, sessionExpired: expired },
      });
    },
    [history, pathname],
  );

  const checkAuth = useCallback(
    (expired: boolean) => {
      if (!isLoggedIn()) {
        setLoggedIn(false);
        const isPublic =
          matchRoutes(routes, pathname)?.[0]?.route?.settings?.isPublic ||
          false;
        if (!isPublic) {
          setAuthorized(false);
          redirectToLogin(expired);
        } else {
          setAuthorized(true);
        }
      } else {
        setLoggedIn(true);
      }
    },
    [pathname, redirectToLogin, routes],
  );

  const refreshToken = async () => {
    try {
      const { data } = await refreshLogin();
      console.log('refresh', data);
      if (data) {
        saveTokens(data?.refreshLogin);
        scheduleJWTRefresh();
      }
    } catch (e) {
      console.log(e);
      checkAuth(true);
    }
  };

  const scheduleJWTRefresh = () => {
    if (loggedIn) {
      const tokens = getTokens();
      console.log('tokeny', tokens);
      if (tokens) {
        const tokenLifetimeMS = getTokenLifetime(tokens.accessToken) * 1000;

        /** DEBUGING */
        const tokenLifetimeMin = round(
          (tokenLifetimeMS - TRASHHOLD_OFFSET) / 1000 / 60,
        );
        setActionFeedback({
          message: `Refresh of current token is scheduled in ${tokenLifetimeMin} min`,
          severity: 'info',
        });
        /** DEBUGING */

        setTimeout(() => {
          if (isLoggedIn()) {
            console.log('still logged in - refresh');
            refreshToken();
          } else {
            console.log('logout');
            checkAuth(true);
          }
        }, tokenLifetimeMS - TRASHHOLD_OFFSET);
      }
    }
  };

  // Schedule JWT check based on its expiration
  const setJWTCheck = () => {
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
  useEffect(() => checkAuth(false), [checkAuth, pathname]);

  // Schedule JWT check every time when user logs in
  useEffect(scheduleJWTRefresh, [loggedIn]);

  return authorized ? <>{children}</> : null;
};

export default Authorization;
