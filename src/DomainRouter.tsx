import React from 'react';
import { FuseSuspense, FuseSplashScreen } from '@fuse';
import { EnvException } from './common/exceptions';

const PublicApp = React.lazy(() => import('./public-app'));
const App = React.lazy(() => import('./app'));

const DomainRouter = () => {
  const REACT_APP_HOST = process.env.REACT_APP_HOST || '';

  if (!REACT_APP_HOST) {
    EnvException('REACT_APP_HOST');
  }

  const rootDomainNum = REACT_APP_HOST.split('.').length || 0;

  const domains = window.location.hostname.split('.');
  if (domains.length === rootDomainNum) {
    return (
      <React.Suspense fallback={<FuseSplashScreen />}>
        <PublicApp />
      </React.Suspense>
    );
  }
  if (domains.length === rootDomainNum + 1) {
    const subdomain = domains[0];
    console.log('Subdomain: ', subdomain);
    // Subdomain validation
    return (
      <React.Suspense fallback={<FuseSplashScreen />}>
        <App />
      </React.Suspense>
    );
  }
  return <div>Page not found</div>;
};

export default DomainRouter;
