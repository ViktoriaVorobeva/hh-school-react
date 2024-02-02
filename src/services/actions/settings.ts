import { getRandomReviewer, request } from "../../utils/api";
import {
  GET_REVIEWER__REQUEST,
  GET_REVIEWER__SUCCESS,
  GET_REVIEWER__FAILURE,
} from "../constants";
import { AppDispatch, AppThunkAction, TReviewerRequest } from "../types";
import {
  saveResultInLocalStorage,
} from "../../utils/localStorage";

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

export type TReviewerAction =
  | IGetReviewerRequest
  | IGetReviewerSuccess
  | IGetReviewerFailure;

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

export const getReviewer = (): AppThunkAction => {
  return async function (dispatch: AppDispatch, getState) {
    const { settings } = getState();
    const { owner, repo, blacklist } = settings;

    dispatch(getReviewerAction());
    try {
      const revieversList = await request({ owner, repo });
      const possibleReviewers = revieversList.filter(
        ({ login }) => !blacklist.includes(login)
      );
      const currentReviewer = getRandomReviewer(possibleReviewers);
      dispatch(
        getReviewerSuccessAction({ currentReviewer, possibleReviewers })
      );
    } catch {
      dispatch(getReviewerFailureAction());
    }
    saveResultInLocalStorage("settings", { owner, repo, blacklist });
  };
};
