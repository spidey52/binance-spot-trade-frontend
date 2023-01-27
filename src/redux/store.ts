import { configureStore } from '@reduxjs/toolkit'
import tickerSlice from './slices/ticker.slice'

export const store = configureStore({
	reducer: {
		tickers: tickerSlice
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch