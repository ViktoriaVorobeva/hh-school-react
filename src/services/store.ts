import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";
import { reviewerReducer } from "./reducers";
import { settingsReducer } from "./reducers/settings";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const rootReduces = combineReducers({
  reviewer: reviewerReducer,
  settings: settingsReducer
});

export const store = createStore(rootReduces, {}, enhancer);
