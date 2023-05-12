import { AssetsState, AssetsAction } from "./types";

const initialState: AssetsState = {
  images: [],
  videos: [],
  loading: false,
  error: ""
}

const AssetReducer = (state: AssetsState, action: AssetsAction) => {
  switch (action.type) {
    case "ASSETS_LOADING":
      return {
        ...state,
        ...initialState,
      };
    case "ASSETS_FAILURE":
      return {
        ...state,
        ...initialState,
      };
    case "IMAGES_SUCCESS":
      return {
        ...state,
        images: action.payload,
      };
      case "VIDEOS_SUCCESS":
        return {
          ...state,
          videos: action.payload,
        };
  }
}

export default AssetReducer;
