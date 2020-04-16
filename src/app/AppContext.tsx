// eslint-disable-next-line no-unused-vars
import React, { useState, SetStateAction, Dispatch } from 'react';
import routes from './fuse-configs/routesConfig';
// eslint-disable-next-line no-unused-vars
import { ActionFeedback } from './types';

type AppContextProps = {
  routes: any[];
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  actionFeedback: ActionFeedback | null;
  setActionFeedback: Dispatch<SetStateAction<ActionFeedback | null>>;
};

export const AppContext = React.createContext({} as AppContextProps);

const AppContextProvider: React.FC = props => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [actionFeedback, setActionFeedback] = useState<ActionFeedback | null>(
    null,
  );

  return (
    <AppContext.Provider
      value={{
        routes,
        user,
        setUser,
        loading,
        setLoading,
        actionFeedback,
        setActionFeedback,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
