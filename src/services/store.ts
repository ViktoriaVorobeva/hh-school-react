import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";
import { reviewerReducer } from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const rootReduces = combineReducers({
  reviewerState: reviewerReducer,
});

export const store = createStore(rootReduces, {}, enhancer);
