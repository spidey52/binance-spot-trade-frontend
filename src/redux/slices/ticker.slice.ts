import { Action } from "./../../../node_modules/redux/index.d";
import { TICKER } from "./../../types/trade";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Ticker from "../../Tickers/Ticker";

export interface tickerState {
 tickers: {
  [prop: string]: number;
 };
 model: "SPOT" | "FUTURE";
}

const localStateModel = localStorage.getItem("ticker-model") == "SPOT" ? "SPOT" : "FUTURE";

const initialState: tickerState = {
 tickers: {},
 model: localStateModel,
};

export const counterSlice = createSlice({
 name: "tickers",
 initialState,
 reducers: {
  setGlobalTickers(state, action: PayloadAction<any>) {
   state.tickers = action.payload;
  },
  setModel(state, action: PayloadAction<any>) {
   localStorage.setItem("ticker-model", action.payload);
   state.model = action.payload;
  },
 },
});

// Action creators are generated for each case reducer function
export const { setGlobalTickers, setModel } = counterSlice.actions;

export default counterSlice.reducer;
