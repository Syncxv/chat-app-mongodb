import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { socketClient } from '../pages/_app'

import type { AppState, AppThunk } from '../stores/store'

export interface ConnectionState {
    failed: boolean
    initialized: boolean
}

const initialState: ConnectionState = {
    failed: false,
    initialized: false
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const connectionOpen = createAsyncThunk('connection/open', async () => {
    try {
        await socketClient.connect()
        return true
    } catch {
        return false
    }
})

export const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {},
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: builder => {
        builder
            .addCase(connectionOpen.pending, state => {
                console.log('CONNECTION PENDING')
            })
            .addCase(connectionOpen.fulfilled, (state, action) => {
                state.initialized = true
            })
            .addCase(connectionOpen.rejected, state => {
                state.failed = true
            })
    }
})

// export const {} = connectionSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: AppState) => state.counter.value
export const Failed = (state: AppState) => state.connection.failed
export const Initialized = (state: AppState) => state.connection.initialized

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const isInitialized = (): AppThunk => {
    return (dispatch, getState) => {
        return Initialized(getState())
    }
}
export const incrementIfOdd =
    (amount: number): AppThunk =>
    (dispatch, getState) => {
        const currentValue = selectCount(getState())
        if (currentValue % 2 === 1) {
            // dispatch(incrementByAmount(amount))
        }
    }

export default connectionSlice.reducer
