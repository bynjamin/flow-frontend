import React from 'react';
import { Provider } from 'react-redux';
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
import Authorization from './auth/Authorization';
import ApolloContextProvider from './ApolloContextProvider';
import UserContextProvider from './UserContext';
// import FuseAuthorization from '@fuse/core/FuseAuthorization';
// import { Auth } from './auth';

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById('jss-insertion-point') || undefined,
});

const generateClassName = createGenerateClassName();

const App = () => (
  <ApolloContextProvider>
    <AppContext.Provider
      value={{
        routes,
      }}
    >
      <UserContextProvider>
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
      </UserContextProvider>
    </AppContext.Provider>
  </ApolloContextProvider>
);

export default App;
