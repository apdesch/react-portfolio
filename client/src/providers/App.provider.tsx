import React, { useReducer } from "react";
import { AppContext, initialState } from "../contexts/App.context";
import rootReducer from "../reducers/root.reducer";

const AppProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
