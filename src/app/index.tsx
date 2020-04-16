import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
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
import AppContextProvider, { AppContext } from './AppContext';
import ActionFeedbackBoundary from './ActionFeedbackBoundary';
import { mainClient } from 'apollo-clients';

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById('jss-insertion-point') || undefined,
});

const generateClassName = createGenerateClassName();

const App = () => (
  <ApolloProvider client={mainClient}>
    <AppContextProvider>
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
          <Router history={history}>
            <FuseTheme>
              <Authorization>
                <ActionFeedbackBoundary>
                  <AppContext.Consumer>
                    {({ routes }) => (
                      <>
                        {/*
                        // @ts-ignore */}
                        <FuseLayout routes={routes} />
                      </>
                    )}
                  </AppContext.Consumer>
                </ActionFeedbackBoundary>
              </Authorization>
            </FuseTheme>
          </Router>
        </Provider>
      </StylesProvider>
    </AppContextProvider>
  </ApolloProvider>
);

export default App;
