import { ResponceOk } from "../../types";
import { TAllActions } from "../actions";
import {
  ADD_TO_BLACK_LIST,
  DELETE_FROM_BLACK_LIST,
  GET_REVIEWER__REQUEST,
  GET_REVIEWER__SUCCESS,
  GET_REVIEWER__FAILURE,
  UPDATE__FROM_LS,
} from "../constants";

export type TState = {
  possibleReviewers: ResponceOk[];
  reviewer: boolean | string | ResponceOk;
  owner: string;
  blacklist: string[];
  repo: string;
  isLoading: boolean;
  errors: null | boolean;
};

export const initialState: TState = {
  possibleReviewers: [],
  reviewer: false,
  isLoading: false,
  errors: null,
  owner: "",
  blacklist: [],
  repo: "",
};

export const reviewerReducer = (
  state = initialState,
  action: TAllActions
): TState => {
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
    case GET_REVIEWER__REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_REVIEWER__SUCCESS:
      return {
        ...state,
        isLoading: false,
        errors: null,
        //@ts-ignore
        reviewer: action.payload.currentReviewer,
        //@ts-ignore
        possibleReviewers: action.payload.possibleReviewers,
      };
    case GET_REVIEWER__FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: true,
        reviewer: false,
        possibleReviewers: [],
      };
      case UPDATE__FROM_LS:
        return {
          ...state,
          owner: action.payload.owner,
          repo: action.payload.repo,
          blacklist: action.payload.blacklist,
        };
    default:
      return state;
  }
};
