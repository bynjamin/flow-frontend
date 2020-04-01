import React, { SetStateAction, Dispatch } from 'react';
import { usePersistedState } from './hooks/usePersistedState';

type UserContextProps = {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
};

export const UserContext = React.createContext({} as UserContextProps);

const UserContextProvider: React.FC = props => {
  const [user, setUser] = usePersistedState<any>('user', null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
