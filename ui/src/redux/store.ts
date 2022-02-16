import { configureStore } from '@reduxjs/toolkit'
import authData from './authData'

export const store = configureStore({
    reducer: {
        auth: authData

    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch