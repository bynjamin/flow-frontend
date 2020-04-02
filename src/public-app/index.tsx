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
import jssExtend from 'jss-plugin-extend';
import { create } from 'jss';
import FuseTheme from '@fuse/core/FuseTheme';
import FuseLayout from '@fuse/core/FuseLayout';
import history from '@history';
import store from '../app/store';
import routes from './publicRoutesConfig';

const publicClient = new ApolloClient({
  uri: process.env.REACT_APP_PUBLIC_API_URL,
});

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById('jss-insertion-point') || undefined,
});

const generateClassName = createGenerateClassName();

const PublicContent = () => (
  <ApolloProvider client={publicClient}>
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <Provider store={store}>
        <Router history={history}>
          <FuseTheme>
            {/*
            // @ts-ignore */}
            <FuseLayout routes={routes} />
          </FuseTheme>
        </Router>
      </Provider>
    </StylesProvider>
  </ApolloProvider>
);

export default PublicContent;
