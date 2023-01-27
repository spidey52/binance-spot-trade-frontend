import { Action } from './../../../node_modules/redux/index.d';
import { TICKER } from './../../types/trade';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Ticker from '../../Tickers/Ticker';

export interface tickerState {
	tickers: {
		[prop: string]: number
	}
}

const initialState: tickerState = {
	tickers: {}
};


export const counterSlice = createSlice({
	name: 'tickers',
	initialState,
	reducers: {
		setGlobalTickers(state, action: PayloadAction<any>) {
			state.tickers = action.payload;
		},
	}
})

// Action creators are generated for each case reducer function
export const { setGlobalTickers } = counterSlice.actions

export default counterSlice.reducer