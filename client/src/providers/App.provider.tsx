import React, { ReactChild, useReducer } from "react";
import { AppContext, initialState } from "contexts/App.context";
import rootReducer from "reducers/root.reducer";

type Props = { children: ReactChild };

const AppProvider: React.FC<Props> = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
