// @flow

import * as React from 'react';

type Props = {
  tenantContent: React.Node,
  publicContent: React.Node,
};

const DomainRouter = ({ tenantContent, publicContent }: Props) => {
  const domains = window.location.hostname.split('.');
  if (domains.length == 2) {
    const subdomain = domains[0];
    console.log('Subdomain: ', subdomain);
    // Subdomain validation
    return tenantContent;
  }
  if (domains.length == 1) {
    return publicContent;
  }
  return 'Page not found';
};

export default DomainRouter;
