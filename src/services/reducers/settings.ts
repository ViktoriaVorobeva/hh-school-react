import { TSettingsAction } from "../actions";
import {
  ADD_TO_BLACK_LIST,
  DELETE_FROM_BLACK_LIST,
  UPDATE_FROM__LS,
  UPDATE_FROM__STATE,
} from "../constants";

export type TSettingsState = {
  owner: string;
  blacklist: string[];
  repo: string;
};

export const initiaSettingslState: TSettingsState = {
  owner: "",
  blacklist: [],
  repo: "",
};

export const settingsReducer = (
  state = initiaSettingslState,
  action: TSettingsAction
): TSettingsState => {
  switch (action.type) {
    case ADD_TO_BLACK_LIST:
      return {
        ...state,
        blacklist: [...state.blacklist, action.payload],
      };
    case DELETE_FROM_BLACK_LIST:
      const newBlackList = state.blacklist.filter(
        (login) => login !== action.payload
      );
      return {
        ...state,
        blacklist: newBlackList,
      };
    case UPDATE_FROM__LS:
      return {
        ...state,
        owner: action.payload.owner,
        repo: action.payload.repo,
        blacklist: action.payload.blacklist,
      };
    case UPDATE_FROM__STATE:
      return {
        ...state,
        owner: action.payload.owner,
        repo: action.payload.repo,
      };
    default:
      return state;
  }
};
