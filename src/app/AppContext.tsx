// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
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
  permissions: any;
};

export const AppContext = React.createContext({} as AppContextProps);

const AppContextProvider: React.FC = props => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [actionFeedback, setActionFeedback] = useState<ActionFeedback | null>(
    null,
  );
  const [permissions, setPermissions] = useState<any>(null);

  function updatePermissions() {
    if (!user) {
      return;
    }
    const permissionsMap: any = {};

    user.allPermissions.forEach((item: any) => {
      permissionsMap[item.model as string] = item.actions;
    });

    setPermissions(permissionsMap);
  }

  useEffect(updatePermissions, [user]);

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
        permissions,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
