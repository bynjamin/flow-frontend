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
import Authorization from './auth/Authorization';
import ApolloContextProvider from './ApolloContextProvider';
import AppContextProvider, { AppContext } from './AppContext';

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById('jss-insertion-point') || undefined,
});

const generateClassName = createGenerateClassName();

const App = () => (
  <ApolloContextProvider>
    <AppContextProvider>
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
          <Router history={history}>
            <Authorization>
              <FuseTheme>
                <AppContext.Consumer>
                  {({ routes }) => (
                    <>
                      {/*
                      // @ts-ignore */}
                      <FuseLayout routes={routes} />
                    </>
                  )}
                </AppContext.Consumer>
              </FuseTheme>
            </Authorization>
          </Router>
        </Provider>
      </StylesProvider>
    </AppContextProvider>
  </ApolloContextProvider>
);

export default App;
