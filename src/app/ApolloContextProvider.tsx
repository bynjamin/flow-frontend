import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getTokens } from './auth/jwtService/jwtService2';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
  request: operation => {
    const tokens = getTokens();
    if (tokens?.access_token) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          // 'x-refresh-token': tokens.refreshToken,
        },
      });
    }
  },
});

type Props = {
  children: React.ReactNode;
};

const ApolloContextProvider: React.FC<Props> = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApolloContextProvider;
