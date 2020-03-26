import React from 'react';

type AppContextProps = {
  routes: any[];
};

const AppContext = React.createContext({} as AppContextProps);

export default AppContext;
