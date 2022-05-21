import React, { ReactNode, useReducer } from "react";
import { AppContext, initialState } from "contexts/App.context";
import rootReducer from "reducers/root.reducer";

type Props = { children: ReactNode };

const AppProvider: React.FC<Props> = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
