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
import AppContext from '../common/AppContext';
import routes from './publicRoutesConfig';
// import Pricing from './main/pages/pricing/style-3/PricingStyle3Page';

const client = new ApolloClient({
  uri: process.env.REACT_APP_PUBLIC_API_URL,
});

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById('jss-insertion-point') || undefined,
});

const generateClassName = createGenerateClassName();

const PublicContent = () => (
  <ApolloProvider client={client}>
    <AppContext.Provider
      value={{
        routes,
      }}
    >
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
          <Router history={history}>
            <FuseTheme>
              <FuseLayout />
            </FuseTheme>
          </Router>
        </Provider>
      </StylesProvider>
    </AppContext.Provider>
  </ApolloProvider>
);

export default PublicContent;
