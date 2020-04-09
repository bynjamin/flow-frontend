import gql from 'graphql-tag';

export const REFRESH_LOGIN = gql`
  mutation RefreshLogin {
    refreshLogin {
      accessToken
      tokenType
      expiresIn
    }
  }
`;
