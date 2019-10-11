import React from 'react';
import Provider from 'react-redux/es/components/Provider';
import {
  StylesProvider,
  jssPreset,
  createGenerateClassName,
} from '@material-ui/styles';
import { Router } from 'react-router-dom';
import jssExtend from 'jss-extend';
import { create } from 'jss';
import { FuseLayout, FuseTheme } from '@fuse';
import history from '@history';
import store from '../store';
import AppContext from '../AppContext';
import routes from './publicRoutesConfig';
// import Pricing from './main/pages/pricing/style-3/PricingStyle3Page';

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById('jss-insertion-point'),
});

const generateClassName = createGenerateClassName();

const PublicContent = (
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
);

export default PublicContent;
