import Reducer from "./root.reducer";

// User
export type User = {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
};

// Auth
export type AuthState = {
  loggedIn: boolean;
  user: User | null;
  error?: string;
};

export type AuthAction =
  | { type: "LOGIN_REQUEST"; payload: Auth }
  | { type: "LOGIN_SUCCESS"; payload: Auth }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" };

// Project
export type Project = {
  id: string;
  title: string;
  description: string;
  company?: string;
  date?: Date;
  image?: string;
  alt?: string;
  body?: string;
  skills?: string[];
  tags?: string[];
  url?: string;
};

export type ProjectState = {
  projects?: Project[];
  loading?: boolean;
  error?: string;
};

export type ProjectAction =
  | { type: "PROJECT_LOADING"; payload: Project }
  | { type: "PROJECT_SUCCESS"; payload: Project[] }
  | { type: "PROJECT_FAILURE"; payload: string }
  | { type: "PROJECT_ADD"; payload: string }
  | { type: "PROJECT_UPDATE"; payload: string }
  | { type: "PROJECT_REMOVE"; payload: string };

export type AssetCategory = "photography" | "illustration" | "design";

// Assets
export type Asset = {
  filename: string;
  originalname: string;
  path: string;
  mimetype: string;
  ext: string;
  created: string;
  username: string;
  id: string;
  title?: string;
  description?: string;
  altText?: string;
  category?: AssetCategory;
  tags?: string[];
};

export type AssetsState = {
  images?: Asset[];
  videos?: Asset[];
  loading?: boolean;
  error?: string;
};

export type AssetsAction =
  | { type: "ASSETS_LOADING"; payload: Asset }
  | { type: "ASSETS_FAILURE"; payload: string }
  | { type: "IMAGES_SUCCESS"; payload: Asset[] }
  | { type: "VIDEOS_SUCCESS"; payload: Asset[] };

// Post
export type Post = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  body: string;
  tags: string[];
  author: string;
};

// App
interface AppState {
  auth: AuthState;
  asset: AssetsState;
  project: ProjectState;
  resume?: string;
}

type AppAction = Reducer;

export declare module "megadraft";
