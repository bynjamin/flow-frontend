import React from 'react';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  StylesProvider,
  jssPreset,
  createGenerateClassName,
} from '@material-ui/styles';
import { Router } from 'react-router-dom';
import jssExtend from 'jss-plugin-extend';
import { create } from 'jss';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import history from '@history';
import store from './store';
import AppContext from '../common/AppContext';
import routes from './fuse-configs/routesConfig';
import { getTokens } from './auth/jwtService/jwtService2';
import Authorization from './auth/Authorization';
// import FuseAuthorization from '@fuse/core/FuseAuthorization';
// import { Auth } from './auth';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
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
          <Router history={history}>
            <Authorization>
              <FuseTheme>
                <FuseLayout />
              </FuseTheme>
            </Authorization>
          </Router>
        </Provider>
      </StylesProvider>
    </AppContext.Provider>
  </ApolloProvider>
);

export default App;
