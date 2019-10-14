// @flow

import React from 'react';
import { FuseSuspense } from './@fuse';
import { EnvException } from './exceptions';

const PublicApp = React.lazy(() => import('./public-app'));
const App = React.lazy(() => import('./app'));

const DomainRouter = () => {
  const { REACT_APP_HOST } = process.env;

  if (!REACT_APP_HOST) {
    EnvException('REACT_APP_HOST');
  }

  const rootDomainNum = REACT_APP_HOST && REACT_APP_HOST.split('.').length;

  const domains = window.location.hostname.split('.');
  if (domains.length == rootDomainNum) {
    return (
      <FuseSuspense>
        <PublicApp />
      </FuseSuspense>
    );
  }
  if (domains.length == rootDomainNum + 1) {
    const subdomain = domains[0];
    console.log('Subdomain: ', subdomain);
    // Subdomain validation
    return (
      <FuseSuspense fallback={<div>Loading...</div>}>
        <App />
      </FuseSuspense>
    );
  }
  return 'Page not found';
};

export default DomainRouter;
