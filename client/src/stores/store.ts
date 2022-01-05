import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import counterReducer from '../reducers/counter'
import connectionReducer from '../reducers/initialize'
import userStore from '../reducers/user'
import channelStore from '../reducers/channel'

export function makeStore() {
    return configureStore({
        reducer: { counter: counterReducer, connection: connectionReducer, userStore, channelStore },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store
