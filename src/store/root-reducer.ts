import { combineReducers } from "@reduxjs/toolkit";
import { NameSpace } from "../const";
import Step from "./reducers/step";
import Track from "./reducers/track";

export const rootReducer = combineReducers({
  [NameSpace.Step]: Step.reducer,
  [NameSpace.Track]: Track.reducer,
});
