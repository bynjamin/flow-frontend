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
import { FuseAuthorization, FuseLayout, FuseTheme } from '@fuse';
import history from '@history';
import { Auth } from './auth';
import store from './store';
import AppContext from './AppContext';
import DomainRouter from './DomainRouter';
import routes from './fuse-configs/routesConfig';
// import Pricing from './main/pages/pricing/style-3/PricingStyle3Page';
import publicContent from './public-content';

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById('jss-insertion-point'),
});

const generateClassName = createGenerateClassName();

const app = (
  <AppContext.Provider
    value={{
      routes,
    }}
  >
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <Provider store={store}>
        <Auth>
          <Router history={history}>
            <FuseAuthorization>
              <FuseTheme>
                <FuseLayout />
              </FuseTheme>
            </FuseAuthorization>
          </Router>
        </Auth>
      </Provider>
    </StylesProvider>
  </AppContext.Provider>
);

const App = () => {
  return <DomainRouter tenantContent={app} publicContent={publicContent} />;
};

export default App;
