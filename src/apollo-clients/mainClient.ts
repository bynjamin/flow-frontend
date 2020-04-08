import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getTokens } from 'app/auth/jwtService/jwtService2';

const mainClient = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
  request: operation => {
    const tokens = getTokens();
    if (tokens?.accessToken) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          // 'x-refresh-token': tokens.refreshToken,
        },
      });
    }
  },
});

export default mainClient;
