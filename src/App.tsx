import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import DomainRouter from './DomainRouter';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
});

const App = () => (
  <ApolloProvider client={client}>
    <DomainRouter />
  </ApolloProvider>
);

export default App;
