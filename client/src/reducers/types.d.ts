import Reducer from "./auth.reducer";

// App
interface AppState {
  auth: Types.AuthState;
}
type AppAction = Reducer;

export type AuthState = {
  loggedIn: boolean;
  user: Auth | null;
  error?: string;
};

export type AuthAction =
  | { type: "LOGIN_REQUEST"; payload: Auth }
  | { type: "LOGIN_SUCCESS"; payload: Auth }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" };

// User
export type User = {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
};

// Project
export type Project = {
  id: string;
  title: string;
  description: string;
  date: string;
  bannerImage: string;
  body: string;
  skills: string[];
  liveLink?: string;
};

// Post
export type Post = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  body: string;
  tags: string[];
};

// Page
export type Page = {
  id: string;
  title: string;
  sections: string[];
};
