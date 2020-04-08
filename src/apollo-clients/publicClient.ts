import ApolloClient from 'apollo-boost';

// Need to have <{}> as type param (probably cache type)
const publicClient = new ApolloClient<{}>({
  uri: process.env.REACT_APP_PUBLIC_API_URL,
});

export default publicClient;
