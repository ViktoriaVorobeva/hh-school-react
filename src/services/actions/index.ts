import { Form, SettingsType } from "../../types";
import { getRandomReviewer, request } from "../../utils/api";
import {
  ADD_TO_BLACK_LIST,
  DELETE_FROM_BLACK_LIST,
  GET_REVIEWER__REQUEST,
  GET_REVIEWER__SUCCESS,
  GET_REVIEWER__FAILURE,
  UPDATE__FROM_LS,
} from "../constants";
import { AppDispatch, AppThunkAction, TReviewerRequest } from "../types";
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

export interface IGetReviewerRequest {
  readonly type: typeof GET_REVIEWER__REQUEST;
}

export interface IGetReviewerSuccess {
  readonly type: typeof GET_REVIEWER__SUCCESS;
  readonly payload: TReviewerRequest;
}

export interface IGetReviewerFailure {
  readonly type: typeof GET_REVIEWER__FAILURE;
}

export interface IGetUpdateFromLS {
  readonly type: typeof UPDATE__FROM_LS;
  readonly payload: SettingsType;
}

export type TAllActions =
  | IGetAddToBlackList
  | IGetDeletFromBlackList
  | IGetReviewerRequest
  | IGetReviewerSuccess
  | IGetReviewerFailure
  | IGetUpdateFromLS;

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

export const getReviewerAction = (): IGetReviewerRequest => ({
  type: GET_REVIEWER__REQUEST,
});

export const getReviewerSuccessAction = (
  reviewersObj: TReviewerRequest
): IGetReviewerSuccess => ({
  type: GET_REVIEWER__SUCCESS,
  payload: reviewersObj,
});

export const getReviewerFailureAction = (): IGetReviewerFailure => ({
  type: GET_REVIEWER__FAILURE,
});

export const getUpdateFromLS = (
  settings: SettingsType
): IGetUpdateFromLS => ({
  type: UPDATE__FROM_LS,
  payload: settings,
});

export const getReviewer = (
  form: Form,
  blacklist: Array<string>
): AppThunkAction => {
  return function (dispatch: AppDispatch) {
    dispatch(getReviewerAction());
    request(form).then(
      (val) => {
        saveResultInLocalStorage("settings", { ...form, blacklist });
        const possibleReviewers = val.filter(
          ({ login }) => !blacklist.includes(login)
        );
        const currentReviewer = getRandomReviewer(possibleReviewers);
        dispatch(
          getReviewerSuccessAction({ currentReviewer, possibleReviewers })
        );
      },
      () => {
        dispatch(getReviewerFailureAction());
      }
    );
  };
};
