import jwtDecode from 'jwt-decode';

type TokensType = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

// module for saving tokens to local storage
const TOKEN_KEY = 'xyz';
// tokens = { accessToken: "xyz", refreshToken: "abc" }
export const saveTokens = (tokens: TokensType) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
};

const isAuthTokenValid = (token: string) => {
  if (!token) {
    return false;
  }
  const decoded = jwtDecode<any>(token);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    console.warn('access token expired');
    return false;
  }

  return true;
};

export const deleteTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getTokens = () => {
  const tokensString = localStorage.getItem(TOKEN_KEY);
  const tokens = tokensString ? JSON.parse(tokensString) : null;
  if (!isAuthTokenValid(tokens?.access_token)) {
    deleteTokens();
    return null;
  }
  return tokens;
};

export const isAuthorized = () => !!getTokens();
