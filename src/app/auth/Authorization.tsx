import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import IdleTimer from 'react-idle-timer';
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
  deleteTokens,
} from './jwtService/jwtService2';
import InactivityDialog from './InactivityDialog';
import { REFRESH_LOGIN } from './refreshLoginMutation';
// eslint-disable-next-line no-unused-vars
import { RefreshLogin as ResponseType } from './__generated__/RefreshLogin';

const TRASHHOLD_OFFSET = 120000; // 2 minutes
const TIME_TO_IDLE = 1000 * 60 * 29; // 29 minutes

type Props = {
  children: React.ReactNode;
};

const Authorization: React.FC<Props> = ({ children }) => {
  const { routes, setActionFeedback } = useContext(AppContext);
  const [authorized, setAuthorized] = useState<boolean>(true);
  const [isIdle, setIsIdle] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const history = useHistory();
  const { pathname } = useLocation();
  const [refreshLogin] = useMutation<ResponseType>(REFRESH_LOGIN);
  const idleRef = useRef(null);

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

  const sessionExpired = () => {
    deleteTokens();
    checkAuth(true);
  };

  // Check if User is authorized, every time when pathname changes
  useEffect(() => checkAuth(false), [checkAuth, pathname]);

  // Schedule JWT check every time when user logs in
  useEffect(scheduleJWTRefresh, [loggedIn]);

  return authorized ? (
    <>
      <IdleTimer
        ref={idleRef}
        onIdle={() => setIsIdle(true)}
        debounce={250}
        timeout={TIME_TO_IDLE}
      />
      {children}
      {isIdle &&
      pathname !== '/login' && ( // todo: refactor
          <InactivityDialog
            onConfirm={() => setIsIdle(false)}
            onLogout={sessionExpired}
          />
        )}
    </>
  ) : null;
};

export default Authorization;
