import React, { SetStateAction, Dispatch } from 'react';
import { usePersistedState } from './hooks/usePersistedState';
import routes from './fuse-configs/routesConfig';

type AppContextProps = {
  routes: any[];
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
};

export const AppContext = React.createContext({} as AppContextProps);

const AppContextProvider: React.FC = props => {
  const [user, setUser] = usePersistedState<any>('user', null);

  return (
    <AppContext.Provider
      value={{
        routes,
        user,
        setUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
