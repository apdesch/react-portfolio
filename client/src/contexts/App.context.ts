import { createContext, Dispatch } from "react";
import { AppState, AppAction } from "../reducers/types";

const initialState: AppState = {
  auth: { loggedIn: false, user: null },
};

type ContextType<ActionType> = {
  state: AppState;
  dispatch: Dispatch<ActionType>;
};

const AppContext = createContext<ContextType<AppAction>>({
  state: initialState,
  dispatch: () => null,
});

export { AppContext, initialState };
