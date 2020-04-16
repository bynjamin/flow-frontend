import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import IdleTimer from 'react-idle-timer';
import round from 'lodash/round';
import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
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
import { RefreshLogin as RefreshResponseType } from './__generated__/RefreshLogin';
import { CURRENT_USER } from './currentUserQuery';
// eslint-disable-next-line no-unused-vars
import { CurrentUserQuery as ResponseType } from './__generated__/CurrentUserQuery';

const TRASHHOLD_OFFSET = 120000; // 2 minutes
const TIME_TO_IDLE = 1000 * 60 * 29; // 29 minutes

type Props = {
  children: React.ReactNode;
};

const Authorization: React.FC<Props> = ({ children }) => {
  const { routes, setActionFeedback, setUser } = useContext(AppContext);
  const [authorized, setAuthorized] = useState<boolean>(true);
  const [isIdle, setIsIdle] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const history = useHistory();
  const { pathname } = useLocation();
  const idleRef = useRef(null);
  const [refreshLogin] = useMutation<RefreshResponseType>(REFRESH_LOGIN);
  const { loading, data, refetch } = useQuery<ResponseType>(CURRENT_USER, {
    pollInterval: 20000,
  });

  const user = data?.user;

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
    (expired = false) => {
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

  async function refreshToken() {
    try {
      const { data: response } = await refreshLogin();
      if (response) {
        saveTokens(response?.refreshLogin);
        scheduleJWTRefresh();
      }
    } catch (e) {
      console.log(e);
      checkAuth(true);
    }
  }

  function scheduleJWTRefresh() {
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
  }

  function sessionExpired() {
    deleteTokens();
    checkAuth(true);
  }

  // Check if User is authorized, every time when pathname changes
  useEffect(checkAuth, [checkAuth, pathname]);

  // Schedule JWT check every time when user logs in
  useEffect(scheduleJWTRefresh, [loggedIn]);

  // refetch user when loggedIn changes
  useEffect(() => {
    refetch();
  }, [loggedIn, refetch]);

  // setUser after refetch
  useEffect(() => setUser(user), [user, setUser]);

  if (loading) {
    return <FuseSplashScreen />;
  }

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
