import jwtDecode from 'jwt-decode';

type TokensType = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
};

// module for saving tokens to local storage
const TOKEN_KEY = 'xyz';
// tokens = { accessToken: "xyz", refreshToken: "abc" }
export const saveTokens = (tokens: TokensType): void => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
};

export const getTokenLifetime = (token: string): number => {
  if (!token) {
    return 0;
  }
  const decoded = jwtDecode<any>(token);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    console.warn('access token expired');
    return 0;
  }
  return decoded.exp - currentTime;
};

const isAuthTokenValid = (token: string): boolean => {
  if (!token) {
    return false;
  }

  return getTokenLifetime(token) > 0;
};

export const deleteTokens = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getTokens = (): TokensType | null => {
  const tokensString = localStorage.getItem(TOKEN_KEY);
  const tokens = tokensString ? JSON.parse(tokensString) : null;
  if (!isAuthTokenValid(tokens?.accessToken)) {
    deleteTokens();
    return null;
  }
  return tokens;
};

export const isLoggedIn = () => !!getTokens();
