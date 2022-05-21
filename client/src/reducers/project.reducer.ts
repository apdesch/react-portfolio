import { ProjectState, ProjectAction } from "./types";

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: "",
};

const ProjectReducer = (
  state: ProjectState,
  action: ProjectAction,
): ProjectState => {
  switch (action.type) {
    case "PROJECT_LOADING":
      return {
        ...state,
        ...initialState,
      };
    case "PROJECT_SUCCESS":
      return {
        ...state,
        projects: action.payload,
      };
    case "PROJECT_FAILURE":
      return {
        ...state,
        ...initialState,
      };
    case "PROJECT_ADD":
      return {
        ...state,
        ...initialState,
      };
    case "PROJECT_UPDATE":
      return {
        ...state,
        ...initialState,
      };
    case "PROJECT_REMOVE":
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default ProjectReducer;
