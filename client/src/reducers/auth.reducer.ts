import { AuthState, AuthAction } from "./types";

const initialState: AuthState = {
  loggedIn: false,
  user: null,
  error: "",
};

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        error: initialState.error,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        ...initialState,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default AuthReducer;
