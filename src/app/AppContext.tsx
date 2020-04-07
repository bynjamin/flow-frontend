// eslint-disable-next-line no-unused-vars
import React, { useState, SetStateAction, Dispatch } from 'react';
import { usePersistedState } from './hooks/usePersistedState';
import routes from './fuse-configs/routesConfig';
// eslint-disable-next-line no-unused-vars
import { ActionFeedback } from './types';

type AppContextProps = {
  routes: any[];
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  actionFeedback: ActionFeedback | null;
  setActionFeedback: Dispatch<SetStateAction<ActionFeedback | null>>;
};

export const AppContext = React.createContext({} as AppContextProps);

const AppContextProvider: React.FC = props => {
  const [user, setUser] = usePersistedState<any>('user', null);
  const [actionFeedback, setActionFeedback] = useState<ActionFeedback | null>(
    null,
  );

  return (
    <AppContext.Provider
      value={{
        routes,
        user,
        setUser,
        actionFeedback,
        setActionFeedback,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
