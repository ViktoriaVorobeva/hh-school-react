import { User } from "../../types";
import { TReviewerAction } from "../actions";
import {
  GET_REVIEWER__REQUEST,
  GET_REVIEWER__SUCCESS,
  GET_REVIEWER__FAILURE,
} from "../constants";

export type TState = {
  possibleReviewers: User[];
  reviewer: User | null;
  isLoading: boolean;
  isError: boolean;
};

export const initialState: TState = {
  possibleReviewers: [],
  reviewer: null,
  isLoading: false,
  isError: false,
};

export const reviewerReducer = (
  state = initialState,
  action: TReviewerAction
): TState => {
  switch (action.type) {
    case GET_REVIEWER__REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_REVIEWER__SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        reviewer: action.payload.currentReviewer,
        possibleReviewers: action.payload.possibleReviewers,
      };
    case GET_REVIEWER__FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        reviewer: null,
        possibleReviewers: [],
      };
    default:
      return state;
  }
};
