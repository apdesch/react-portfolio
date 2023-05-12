import { AppState, AppAction } from "./types";
import AuthReducer from "./auth.reducer";
import ProjectReducer from "./project.reducer";
import AssetReducer from "./asset.reducer";

const rootReducer = (state: AppState, action: AppAction) => ({
  auth: AuthReducer(state.auth, action),
  asset: AssetReducer(state.asset, action),
  project: ProjectReducer(state.project, action),
});

export default rootReducer;
