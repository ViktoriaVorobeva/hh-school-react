import { Form, SettingsType } from "../../types";
import {
  ADD_TO_BLACK_LIST,
  DELETE_FROM_BLACK_LIST,
  UPDATE_FROM__LS,
  UPDATE_FROM__STATE,
} from "../constants";
import {
    getResultFromLocalStorage,
    saveResultInLocalStorage,
  } from "../../utils/localStorage";

export interface IGetAddToBlackList {
  readonly type: typeof ADD_TO_BLACK_LIST;
  readonly payload: string;
}

export interface IGetDeletFromBlackList {
  readonly type: typeof DELETE_FROM_BLACK_LIST;
  readonly payload: string;
}

export interface IGetUpdateFromLS {
  readonly type: typeof UPDATE_FROM__LS;
  readonly payload: SettingsType;
}

export interface IGetUpdateFromState {
  readonly type: typeof UPDATE_FROM__STATE;
  readonly payload: Form;
}

export type TSettingsAction =
  | IGetAddToBlackList
  | IGetDeletFromBlackList
  | IGetUpdateFromLS
  | IGetUpdateFromState;

export const addToBlackListAction = (login: string): IGetAddToBlackList => {
  const settings = getResultFromLocalStorage("settings");
  const { blacklist } = settings;
  saveResultInLocalStorage("settings", {
    ...settings,
    blacklist: [...blacklist, login],
  });
  return {
    type: ADD_TO_BLACK_LIST,
    payload: login,
  };
};

export const deleteFromBlackList = (login: string): IGetDeletFromBlackList => {
  const settings = getResultFromLocalStorage("settings");
  const { blacklist } = settings;
  const newBlacklist = blacklist.filter((email) => email !== login);
  saveResultInLocalStorage("settings", {
    ...settings,
    blacklist: newBlacklist,
  });
  return {
    type: DELETE_FROM_BLACK_LIST,
    payload: login,
  };
};

export const getUpdateFromLS = (settings: SettingsType): IGetUpdateFromLS => ({
    type: UPDATE_FROM__LS,
    payload: settings,
  });
  
  export const getUpdateFromState = (form: Form): IGetUpdateFromState => ({
    type: UPDATE_FROM__STATE,
    payload: form,
  });
