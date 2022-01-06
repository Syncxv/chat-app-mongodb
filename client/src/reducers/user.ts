import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SOCKET_ACTIONS } from '../constants'
import { socketClient } from '../pages/_app'

import type { AppState, AppThunk } from '../stores/store'
import { UserType } from '../types'

export interface UserStoreState {
    failed: boolean
    initialized: boolean
    users: {
        [key: string]: UserType
    }
    currentUserId: string | null
}

const initialState: UserStoreState = {
    failed: false,
    initialized: false,
    users: {},
    currentUserId: null
}
interface initUserReturnType {
    users: UserType[]
    currentUser: UserType
}
export const initalizeUsers = createAsyncThunk(
    'userStore/initalizeUsers',
    async (): Promise<initUserReturnType> => {
        return (await socketClient.emit(SOCKET_ACTIONS.USER_INIT)) as initUserReturnType
    }
)
export const userSlice = createSlice({
    name: 'userStore',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {},
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: builder => {
        builder
            .addCase(initalizeUsers.pending, state => {
                console.log('INITING USERS')
            })
            .addCase(initalizeUsers.fulfilled, (state, action) => {
                action.payload.users.forEach(e => {
                    state.users[e._id] = e
                })
                state.currentUserId = action.payload.currentUser._id
                state.users[action.payload.currentUser._id] = action.payload.currentUser
                state.initialized = true
            })
            .addCase(initalizeUsers.rejected, state => {
                state.failed = true
            })
    }
})
export const getCurrentUser = (state: AppState): UserType | undefined => {
    return state.userStore.users[state.userStore.currentUserId!]
}
export default userSlice.reducer
