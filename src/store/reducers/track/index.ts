import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NameSpace, Step } from "../../../const";
import { ITrackState } from "./types";

const initialState: ITrackState = {
  url: "",
};

const reducer = createSlice({
  name: NameSpace.Step,
  initialState,
  reducers: {
    setTrackUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export default reducer;
