// @flow

import React from 'react';
import { FuseSuspense } from './@fuse';
import PublicApp from './public-app';
import App from './app/App';

const DomainRouter = () => {
  const { REACT_APP_HOST } = process.env;
  const rootDomainNum = REACT_APP_HOST.split('.').length;

  const domains = window.location.hostname.split('.');
  if (domains.length == rootDomainNum) {
    return PublicApp;
  }
  if (domains.length == rootDomainNum + 1) {
    const subdomain = domains[0];
    console.log('Subdomain: ', subdomain);
    // Subdomain validation
    return App;
  }
  return 'Page not found';
};

export default DomainRouter;
