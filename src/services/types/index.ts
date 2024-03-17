import { User } from "../../types";
import { TAllActions } from "../actions";
import { store } from "../store";
import type { ThunkAction, ThunkDispatch } from "redux-thunk";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TAllActions
>;

export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TAllActions
>;

export type TReviewerRequest = {
  currentReviewer: User | null,
  possibleReviewers: User[]
}