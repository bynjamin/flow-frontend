import React from 'react';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  StylesProvider,
  jssPreset,
  createGenerateClassName,
} from '@material-ui/styles';
import { Router } from 'react-router-dom';
import jssExtend from 'jss-extend';
import { create } from 'jss';
import { FuseAuthorization, FuseLayout, FuseTheme } from '@fuse';
import history from '@history';
import { Auth } from './auth';
import store from './store';
import AppContext from '../common/AppContext';
import routes from './fuse-configs/routesConfig';
import { getTokens } from './services/jwtService/jwtService2';
import Authorization from './Authorization';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  request: operation => {
    const tokens = getTokens();
    if (tokens?.access_token) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          // 'x-refresh-token': tokens.refreshToken,
        },
      });
    }
  },
});

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById('jss-insertion-point') || undefined,
});

const generateClassName = createGenerateClassName();

const App = () => (
  <ApolloProvider client={client}>
    <AppContext.Provider
      value={{
        routes,
      }}
    >
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
          <Auth>
            <Router history={history}>
              <Authorization>
                <FuseAuthorization>
                  <FuseTheme>
                    <FuseLayout />
                  </FuseTheme>
                </FuseAuthorization>
              </Authorization>
            </Router>
          </Auth>
        </Provider>
      </StylesProvider>
    </AppContext.Provider>
  </ApolloProvider>
);

export default App;
