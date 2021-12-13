import { AppState, AppAction } from "./types";
import AuthReducer from "./auth.reducer";

const rootReducer = (state: AppState, action: AppAction) => ({
  auth: AuthReducer(state.auth, action),
});

export default rootReducer;
